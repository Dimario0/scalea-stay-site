import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_ORIGIN = 'https://scaleastay.com';

const pages = [
  { path: 'ru/index.html', lang: 'ru', canonical: `${SITE_ORIGIN}/ru/` },
  { path: 'en/index.html', lang: 'en', canonical: `${SITE_ORIGIN}/en/` },
  { path: 'it/index.html', lang: 'it', canonical: `${SITE_ORIGIN}/it/` },
  { path: 'de/index.html', lang: 'de', canonical: `${SITE_ORIGIN}/de/` },
  { path: 'cs/index.html', lang: 'cs', canonical: `${SITE_ORIGIN}/cs/` },
  { path: 'pl/index.html', lang: 'pl', canonical: `${SITE_ORIGIN}/pl/` },
  {
    path: 'it/appartamento-scalea-vicino-mare/index.html',
    lang: 'it',
    canonical: `${SITE_ORIGIN}/it/appartamento-scalea-vicino-mare/`,
  },
  {
    path: 'pl/apartament-scalea-blisko-morza/index.html',
    lang: 'pl',
    canonical: `${SITE_ORIGIN}/pl/apartament-scalea-blisko-morza/`,
  },
];

const stalePatterns = [
  /Casa Marittima/i,
  /400\s*(?:m|metri|meters?|meter|metrů|метр)/i,
  /(?:Beach|Strand|Spiaggia|Pláž|Пляж)\s*6\s*(?:min|мин)/i,
  /6[- ]minute walk/i,
  /6\s*minut(?:e|y|en|ová| пешком)/i,
];

const fail = (message) => {
  console.error(`SEO BUILD VERIFY FAILED: ${message}`);
  process.exitCode = 1;
};

if (!existsSync(DIST)) {
  fail('dist directory is missing');
} else {
  for (const page of pages) {
    const filePath = path.join(DIST, page.path);
    if (!existsSync(filePath)) {
      fail(`missing ${page.path}`);
      continue;
    }

    const html = readFileSync(filePath, 'utf8');
    if (!new RegExp(`<html lang=["']${page.lang}["']`, 'i').test(html)) {
      fail(`${page.path}: wrong or missing html lang=${page.lang}`);
    }
    if (!html.includes(`rel="canonical" href="${page.canonical}"`)) {
      fail(`${page.path}: missing self canonical ${page.canonical}`);
    }
    if (!/meta name="robots" content="index,follow,max-image-preview:large"/i.test(html)) {
      fail(`${page.path}: page is not explicitly indexable`);
    }
    const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
    if (h1Count !== 1) {
      fail(`${page.path}: expected one H1, found ${h1Count}`);
    }
    for (const pattern of stalePatterns) {
      if (pattern.test(html)) {
        fail(`${page.path}: stale public copy matched ${pattern}`);
      }
    }
  }

  const rootIndexPath = path.join(DIST, 'index.html');
  if (!existsSync(rootIndexPath)) {
    fail('missing root index.html');
  } else {
    const rootHtml = readFileSync(rootIndexPath, 'utf8');
    if (!/meta name="robots" content="noindex,follow"/i.test(rootHtml)) {
      fail('root index must remain noindex,follow');
    }
  }

  const sitemapPath = path.join(DIST, 'sitemap.xml');
  const robotsPath = path.join(DIST, 'robots.txt');
  if (!existsSync(sitemapPath)) {
    fail('missing sitemap.xml');
  } else {
    const sitemap = readFileSync(sitemapPath, 'utf8');
    for (const page of pages) {
      if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) {
        fail(`sitemap missing ${page.canonical}`);
      }
    }
    if (!sitemap.includes('hreflang="cs"') || sitemap.includes('hreflang="cz"')) {
      fail('sitemap must use standard Czech hreflang="cs", not "cz"');
    }
  }

  if (!existsSync(robotsPath)) {
    fail('missing robots.txt');
  } else {
    const robots = readFileSync(robotsPath, 'utf8');
    if (!robots.includes('User-agent: OAI-SearchBot') || !robots.includes('Allow: /')) {
      fail('robots.txt must explicitly allow OAI-SearchBot');
    }
    if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
      fail('robots.txt sitemap URL is missing or incorrect');
    }
  }
}

if (!process.exitCode) {
  console.log('SEO BUILD VERIFY PASS');
}
