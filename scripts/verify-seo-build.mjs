import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://scaleastay.com';

const pages = [
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
