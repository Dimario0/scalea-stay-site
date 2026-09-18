import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://scaleastay.com';

const pages = [
  ['it/soggiorni-lunghi-scalea/index.html','it','/it/soggiorni-lunghi-scalea/'],
  ['ru/index.html','ru','/ru/'],['en/index.html','en','/en/'],['it/index.html','it','/it/'],['de/index.html','de','/de/'],['cs/index.html','cs','/cs/'],['pl/index.html','pl','/pl/'],
  ['it/appartamento-scalea-vicino-mare/index.html','it','/it/appartamento-scalea-vicino-mare/'],
  ['pl/apartament-scalea-blisko-morza/index.html','pl','/pl/apartament-scalea-blisko-morza/'],
  ['it/come-arrivare-da-lamezia-terme-a-scalea/index.html','it','/it/come-arrivare-da-lamezia-terme-a-scalea/'],
  ['pl/jak-dojechac-z-lamezia-terme-do-scalei/index.html','pl','/pl/jak-dojechac-z-lamezia-terme-do-scalei/'],
  ['it/scalea-senza-auto/index.html','it','/it/scalea-senza-auto/'],
  ['pl/scalea-bez-samochodu/index.html','pl','/pl/scalea-bez-samochodu/'],
  ['it/spiagge-scalea/index.html','it','/it/spiagge-scalea/'],
  ['pl/plaze-scalea/index.html','pl','/pl/plaze-scalea/'],
  ['it/centro-storico-scalea-sera/index.html','it','/it/centro-storico-scalea-sera/'],
  ['pl/stare-miasto-scalea-wieczorem/index.html','pl','/pl/stare-miasto-scalea-wieczorem/'],
  ['it/dove-mangiare-scalea/index.html','it','/it/dove-mangiare-scalea/'],
  ['pl/gdzie-zjesc-scalea/index.html','pl','/pl/gdzie-zjesc-scalea/'],
].map(([file,lang,url]) => ({file,lang,canonical:`${SITE_ORIGIN}${url}`}));

const stalePatterns = [/Casa Marittima/i,/400\s*(?:m|metri|meters?|meter|metrů|метр)/i,/(?:Beach|Strand|Spiaggia|Pláž|Пляж)\s*6\s*(?:min|мин)/i,/>faqQ(?:6|8)</i,/>faqA(?:6|8)</i];
const fail = (m) => { console.error(`SEO BUILD VERIFY FAILED: ${m}`); process.exitCode = 1; };

if (!existsSync(DIST)) fail('dist directory is missing');
for (const p of pages) {
  const filePath = path.join(DIST,p.file);
  if (!existsSync(filePath)) { fail(`missing ${p.file}`); continue; }
  const html = readFileSync(filePath,'utf8');
  if (!new RegExp(`<html lang=["']${p.lang}["']`,'i').test(html)) fail(`${p.file}: wrong html lang`);
  if (!html.includes(`rel="canonical" href="${p.canonical}"`)) fail(`${p.file}: missing self canonical`);
  if (!/meta name="robots" content="index,follow,max-image-preview:large"/i.test(html)) fail(`${p.file}: not explicitly indexable`);
  const h1 = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
  if (h1 !== 1) fail(`${p.file}: expected one H1, found ${h1}`);
  if (/^[a-z]{2}\/index\.html$/.test(p.file)) {
    const body = html.split('<body')[1] || '';
    if (!body.includes('id="apartments"')) fail(`${p.file}: apartment content missing from initial HTML`);
    if (!body.includes('id="faq"')) fail(`${p.file}: FAQ content missing from initial HTML`);
    const schemaSource = html.match(/<script id="prerender-faq-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    try {
      const faq = JSON.parse(schemaSource || 'null');
      if (!faq || faq.inLanguage !== p.lang || faq.mainEntity?.length !== 12) {
        fail(`${p.file}: missing or incomplete localized FAQ schema`);
      } else {
        const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
        for (const item of faq.mainEntity) {
          if (!body.includes(`<summary style="cursor:pointer;font-weight:700">${escape(item.name)}</summary>`) || !body.includes(`<p>${escape(item.acceptedAnswer.text)}</p>`)) {
            fail(`${p.file}: FAQ schema and initial visible content disagree: ${item.name}`);
          }
        }
      }
    } catch { fail(`${p.file}: invalid FAQ JSON`); }
  }
  if (p.file === 'it/soggiorni-lunghi-scalea/index.html') {
    if (/<script[^>]*type="module"/i.test(html)) fail('long-stay page must not be replaced by the home SPA');
    if ((html.match(/<details>/g) || []).length !== 6) fail('long-stay page must expose all six FAQ answers');
    if (/hreflang=/.test(html)) fail('long-stay page must not advertise translations that do not exist');
    if (!html.includes('CIN: IT078138C2VN4E3MCD')) fail('long-stay page missing property identifier');
    for (const source of ['it/index.html', 'it/appartamento-scalea-vicino-mare/index.html']) {
      if (!readFileSync(path.join(DIST, source), 'utf8').includes('href="/it/soggiorni-lunghi-scalea/"')) fail(`${source}: missing link to long-stay page`);
    }
  }
  for (const pattern of stalePatterns) if (pattern.test(html)) fail(`${p.file}: stale public copy matched ${pattern}`);
}

const root = path.join(DIST,'index.html');
if (!existsSync(root) || !/meta name="robots" content="noindex,follow"/i.test(readFileSync(root,'utf8'))) fail('root index must remain noindex,follow');
const sitemapPath = path.join(DIST,'sitemap.xml');
if (!existsSync(sitemapPath)) fail('missing sitemap.xml');
else {
  const sitemap = readFileSync(sitemapPath,'utf8');
  for (const p of pages) if (!sitemap.includes(`<loc>${p.canonical}</loc>`)) fail(`sitemap missing ${p.canonical}`);
  if (!sitemap.includes('hreflang="cs"') || sitemap.includes('hreflang="cz"')) fail('sitemap must use cs, not cz');
}
const robotsPath = path.join(DIST,'robots.txt');
if (!existsSync(robotsPath)) fail('missing robots.txt');
else {
  const robots = readFileSync(robotsPath,'utf8');
  if (!robots.includes('User-agent: OAI-SearchBot') || !robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) fail('robots.txt missing OAI-SearchBot or sitemap');
}
if (!process.exitCode) console.log(`SEO BUILD VERIFY PASS: ${pages.length} indexable pages`);
