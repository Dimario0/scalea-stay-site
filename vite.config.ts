import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://scaleastay.com';
const SEO_LASTMOD = '2026-07-31';
const LANGUAGES = ['ru', 'en', 'it', 'de', 'cs'] as const;
type LanguageCode = (typeof LANGUAGES)[number];

type LocalizedSeo = {
  title: string;
  description: string;
  locale: string;
};

const LOCALIZED_SEO: Record<LanguageCode, LocalizedSeo> = {
  ru: {
    title: 'Апартаменты в Скалее у моря | ScaleaStay',
    description: 'Casa Marittima в Скалее, Калабрия: кондиционер, частная парковка, оборудованная кухня и понятные маршруты от пляжа, станции и аэропорта Ламеция-Терме. Проверяйте даты напрямую.',
    locale: 'ru_RU',
  },
  en: {
    title: 'Holiday Apartment in Scalea, Calabria | ScaleaStay',
    description: 'Casa Marittima in Scalea, Calabria, with air conditioning, private parking, an equipped kitchen and clear routes from the beach, station and Lamezia Terme Airport. Check dates directly.',
    locale: 'en_GB',
  },
  it: {
    title: 'Appartamento Vacanze a Scalea, Calabria | ScaleaStay',
    description: 'Casa Marittima a Scalea, Calabria: aria condizionata, parcheggio privato, cucina attrezzata e indicazioni chiare dalla spiaggia, dalla stazione e dall’aeroporto di Lamezia Terme. Verifica le date direttamente.',
    locale: 'it_IT',
  },
  de: {
    title: 'Ferienwohnung in Scalea, Kalabrien | ScaleaStay',
    description: 'Casa Marittima in Scalea, Kalabrien, mit Klimaanlage, Privatparkplatz, ausgestatteter Küche und klaren Wegen vom Strand, Bahnhof und Flughafen Lamezia Terme. Verfügbarkeit direkt prüfen.',
    locale: 'de_DE',
  },
  cs: {
    title: 'Apartmán ve Scalee, Kalábrie | ScaleaStay',
    description: 'Casa Marittima ve Scalee v Kalábrii nabízí klimatizaci, soukromé parkování, vybavenou kuchyň a jasné trasy od pláže, nádraží i letiště Lamezia Terme. Ověřte termíny přímo.',
    locale: 'cs_CZ',
  },
};

const legacyStructuredDataPatterns = [
  /\s*<!-- Structured Data: VacationRental -->[\s\S]*?<\/script>\s*/i,
  /\s*<!-- Structured Data: FAQ -->[\s\S]*?<\/script>\s*/i,
];

const robotsText = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

const alternateLinks = LANGUAGES
  .map((language) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${SITE_ORIGIN}/${language}/"/>`)
  .join('\n');

const sitemapEntries = LANGUAGES
  .map((language) => `  <url>
    <loc>${SITE_ORIGIN}/${language}/</loc>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/ru/"/>
    <lastmod>${SEO_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`)
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

const replaceOrInsertHeadTag = (html: string, pattern: RegExp, replacement: string) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace('</head>', `    ${replacement}\n</head>`);
};

const buildWebsiteSchema = (language: LanguageCode) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  url: `${SITE_ORIGIN}/`,
  name: 'ScaleaStay',
  alternateName: 'Casa Marittima',
  inLanguage: language,
});

const localizeHtml = (sourceHtml: string, language: LanguageCode, indexable: boolean) => {
  const seo = LOCALIZED_SEO[language];
  const pageUrl = `${SITE_ORIGIN}/${language}/`;
  const alternateLocales = LANGUAGES
    .filter((code) => code !== language)
    .map((code) => `    <meta property="og:locale:alternate" content="${LOCALIZED_SEO[code].locale}">`)
    .join('\n');
  const websiteSchema = `    <script type="application/ld+json">${buildWebsiteSchema(language)}</script>`;

  let html = sourceHtml
    .replace(/<html lang="[^"]*">/i, `<html lang="${language}">`)
    .replace(/\s*<meta name="keywords"[^>]*>\s*/i, '\n')
    .replace(/\s*<meta property="og:locale(?:[:][^"]+)?"[^>]*>\s*/gi, '\n')
    .replace(/\s*<meta property="og:site_name"[^>]*>\s*/gi, '\n')
    .replace(/\s*<meta name="robots"[^>]*>\s*/gi, '\n')
    .replace(/\s*<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebSite"[\s\S]*?<\/script>\s*/gi, '\n');

  html = replaceOrInsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  html = replaceOrInsertHeadTag(html, /<meta name="description" content="[^"]*">/i, `<meta name="description" content="${seo.description}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${pageUrl}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${seo.title}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${seo.description}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:url" content="[^"]*">/i, `<meta property="twitter:url" content="${pageUrl}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:title" content="[^"]*">/i, `<meta property="twitter:title" content="${seo.title}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:description" content="[^"]*">/i, `<meta property="twitter:description" content="${seo.description}">`);
  html = replaceOrInsertHeadTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);

  const socialMetadata = [
    `    <meta name="robots" content="${indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">`,
    `    <meta property="og:site_name" content="ScaleaStay">`,
    `    <meta property="og:locale" content="${seo.locale}">`,
    alternateLocales,
    websiteSchema,
  ].filter(Boolean).join('\n');

  return html.replace('</head>', `${socialMetadata}\n</head>`);
};

const seoBuildCleanup = (): Plugin => ({
  name: 'scaleastay-seo-build-cleanup',
  enforce: 'pre',
  transformIndexHtml(html) {
    return legacyStructuredDataPatterns.reduce(
      (cleanHtml, pattern) => cleanHtml.replace(pattern, '\n'),
      html,
    );
  },
  writeBundle() {
    const outputDirectory = path.resolve(__dirname, 'dist');
    const rootIndexPath = path.join(outputDirectory, 'index.html');
    mkdirSync(outputDirectory, { recursive: true });

    const builtHtml = readFileSync(rootIndexPath, 'utf8');
    writeFileSync(rootIndexPath, localizeHtml(builtHtml, 'ru', false), 'utf8');

    LANGUAGES.forEach((language) => {
      const languageDirectory = path.join(outputDirectory, language);
      mkdirSync(languageDirectory, { recursive: true });
      writeFileSync(
        path.join(languageDirectory, 'index.html'),
        localizeHtml(builtHtml, language, true),
        'utf8',
      );
    });

    writeFileSync(path.join(outputDirectory, 'robots.txt'), robotsText, 'utf8');
    writeFileSync(path.join(outputDirectory, 'sitemap.xml'), sitemapXml, 'utf8');
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      seoBuildCleanup(),
      tailwindcss(),
      react(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
