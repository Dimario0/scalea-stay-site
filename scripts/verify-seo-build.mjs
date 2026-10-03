import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://scaleastay.com';

const stayRoutes = {
  ru: '/ru/zimnee-prozhivanie-scalea/', en: '/en/winter-long-stays-scalea/',
  it: '/it/soggiorni-lunghi-scalea/', de: '/de/ueberwintern-scalea/',
  cs: '/cs/zimni-dlouhodobe-pobyty-scalea/', pl: '/pl/zimowe-dluzsze-pobyty-scalea/',
};
const pages = [
  ...Object.entries(stayRoutes).filter(([lang]) => lang !== 'it').map(([lang, url]) => [url.slice(1)+'index.html', lang, url]),
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

// Check both the published discovery guide and its source, including stale builds.
const llmsFiles = ['public/llms.txt', 'dist/llms.txt'];
const llmsStalePatterns = [
  ...stalePatterns,
  /do not state a fixed walking (?:distance|time)/i,
  /do not (?:invent|claim|state)[^.\n]*wi[-\u2010-\u2015 ]?fi (?:availability|is available)/i,
  /(?:no|without) wi[-\u2010-\u2015 ]?fi/i,
  /wi[-\u2010-\u2015 ]?fi[^.\n]*(?:not (?:available|installed)|unavailable|unconfirmed|coming soon|planned)/i,
];
const llmsRequiredFacts = [
  ['current brand', /^# ScaleaStay$/m],
  ['confirmed beach distance and approximate walking time', /nearest beach is 600 m away, about a 5[–-]8 minute walk/i],
  ['installed Wi-Fi', /Wi[-\u2010-\u2015 ]?Fi is installed and available\./i],
];
const llmsContents = [];
for (const file of llmsFiles) {
  const filePath = path.join(ROOT, file);
  if (!existsSync(filePath)) { fail(`missing ${file}`); continue; }
  const content = readFileSync(filePath, 'utf8');
  llmsContents.push(content);
  for (const pattern of llmsStalePatterns) {
    if (pattern.test(content)) fail(`${file}: stale public copy matched ${pattern}`);
  }
  for (const [fact, pattern] of llmsRequiredFacts) {
    if (!pattern.test(content)) fail(`${file}: missing ${fact}`);
  }
}
if (llmsContents.length === 2 && llmsContents[0] !== llmsContents[1]) {
  fail('dist/llms.txt differs from public/llms.txt; rebuild before publishing');
}

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
  const commercial = /\/(?:appartamento-scalea-vicino-mare|apartament-scalea-blisko-morza)\//.test(p.canonical);
  if (/^[a-z]{2}\/index\.html$/.test(p.file) || commercial) {
    const body = html.split('<body')[1] || '';
    if (!body.includes('id="apartments"')) fail(`${p.file}: apartment content missing from initial HTML`);
    if (!body.includes('id="faq"')) fail(`${p.file}: FAQ content missing from initial HTML`);
    const schemaSource = html.match(/<script id="prerender-faq-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    try {
      const faq = JSON.parse(schemaSource || 'null');
      if (!faq || faq.inLanguage !== p.lang || faq.mainEntity?.length !== (commercial ? 13 : 12) || faq.url !== `${p.canonical}#faq`) {
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
    try {
      const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const j = JSON.parse(m[1]); return j['@graph'] || [j]; });
      const apartment = graphs.find(j => j['@id'] === `${SITE_ORIGIN}/#scaleastay-apartment`);
      if (apartment?.numberOfBedrooms !== 1 || apartment?.occupancy?.value !== 4 || apartment?.identifier !== 'IT078138C2VN4E3MCD' || apartment?.address?.streetAddress !== 'Via Giuseppe Saragat 11') {
        fail(`${p.file}: incomplete confirmed accommodation schema`);
      }
      if (!body.includes('CIN: IT078138C2VN4E3MCD') || !body.includes('Via Giuseppe Saragat 11') || !/600\s*[mм]/.test(body) || !body.includes('5–8')) {
        fail(`${p.file}: confirmed location/identifier missing from initial visible HTML`);
      }
      if (commercial && !graphs.some(j => j['@type'] === 'WebPage' && j.about?.['@id'] === apartment?.['@id'])) {
        fail(`${p.file}: commercial WebPage must refer to the declared accommodation`);
      }
    } catch { fail(`${p.file}: invalid accommodation JSON`); }
  }
  if (p.canonical === SITE_ORIGIN + stayRoutes[p.lang]) {
    if (/<script[^>]*type="module"/i.test(html)) fail('long-stay page must not be replaced by the home SPA');
    if ((html.match(/<details>/g) || []).length !== 5) fail('long-stay page must expose all five FAQ answers');
    for (const [lang, url] of Object.entries(stayRoutes)) {
      if (!html.includes(`<link rel="alternate" hreflang="${lang}" href="${SITE_ORIGIN}${url}"`)) fail(`${p.file}: missing reciprocal alternate ${lang}`);
      if (!html.includes(`<a href="${url}" lang="${lang}" hreflang="${lang}"`)) fail(`${p.file}: missing language switch ${lang}`);
    }
    const graphs = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => { const j = JSON.parse(m[1]); return j['@graph'] || [j]; });
    const faq = graphs.find(j => j['@type'] === 'FAQPage');
    if (faq?.inLanguage !== p.lang || faq.mainEntity.length !== 5) fail(`${p.file}: wrong localized FAQ schema`);
    if (!readFileSync(path.join(DIST, p.lang, 'index.html'), 'utf8').includes(`href="${stayRoutes[p.lang]}"`)) fail(`${p.lang}: missing home link`);
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
const agenda = path.join(DIST, 'it/eventi-scalea/index.html');
if (existsSync(agenda)) {
  const html = readFileSync(agenda, 'utf8');
  if (!html.includes('content="noindex,follow"')) fail('events prototype must remain noindex');
  if (readFileSync(sitemapPath, 'utf8').includes('/it/eventi-scalea/')) fail('events prototype must not be in sitemap');
  if (!readFileSync(path.join(DIST, 'it/index.html'), 'utf8').includes('id="events-preview"')) fail('missing home events teaser');
  if ((html.match(/<h1(?:\s|>)/gi) || []).length !== 1) fail('events page needs one H1');
}
if (!process.exitCode) console.log(`SEO BUILD VERIFY PASS: ${pages.length} indexable pages; public/dist llms.txt verified`);
