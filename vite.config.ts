import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://scaleastay.com';
const SEO_LASTMOD = '2026-08-01';
const LANGUAGES = ['ru', 'en', 'it', 'de', 'cs'] as const;
type LanguageCode = (typeof LANGUAGES)[number];

type LocalizedSeo = {
  title: string;
  description: string;
  locale: string;
};

type PrerenderContent = {
  heroTitle: string;
  heroSubtitle: string;
  apartmentsLabel: string;
  routesLabel: string;
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

const PRERENDER_CONTENT: Record<LanguageCode, PrerenderContent> = {
  ru: {
    heroTitle: 'Уютные апартаменты у моря в Скалее «Калабрия»',
    heroSubtitle: 'Аренда апартаментов в Скалее, Италия. Уютное жилье у моря с современным ремонтом в центре города. Идеально для отдыха в Калабрии всей семьей.',
    apartmentsLabel: 'Наши апартаменты',
    routesLabel: 'Подробный маршрут',
  },
  en: {
    heroTitle: 'Welcome to Your Perfect Vacation Apartment in Scalea',
    heroSubtitle: 'Scalea apartments for rent in Italy. Elegant vacation rental near the beach and city center. Perfect for your Calabria holiday with family.',
    apartmentsLabel: 'Our Apartments',
    routesLabel: 'Detailed Route',
  },
  it: {
    heroTitle: 'Il Tuo Appartamento Ideale per le Vacanze a Scalea',
    heroSubtitle: 'Affitto appartamenti a Scalea, Italia. Elegante casa vacanze vicino al mare e in centro città. Ideale per il tuo soggiorno in Calabria con la famiglia.',
    apartmentsLabel: 'I nostri appartamenti',
    routesLabel: 'Percorso dettagliato',
  },
  de: {
    heroTitle: 'Ihr perfektes Ferienapartment in Scalea',
    heroSubtitle: 'Elegante, modern renovierte Wohnungen in Meeresnähe und im Stadtzentrum. Ideal für Familienurlaub im Sommer und Winter.',
    apartmentsLabel: 'Unsere Apartments',
    routesLabel: 'Detaillierte Route',
  },
  cs: {
    heroTitle: 'Váš ideální prázdninový apartmán ve Scalee',
    heroSubtitle: 'Elegantní, moderně zrekonstruované apartmány v blízkosti moře a v centru města. Ideální pro rodinnou dovolenou v létě i v zimě.',
    apartmentsLabel: 'Naše apartmány',
    routesLabel: 'Podrobná trasa',
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

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const buildWebsiteSchema = (language: LanguageCode) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  url: `${SITE_ORIGIN}/`,
  name: 'ScaleaStay',
  alternateName: 'Casa Marittima',
  inLanguage: language,
});

const buildPrerenderShell = (language: LanguageCode) => {
  const content = PRERENDER_CONTENT[language];

  return `    <div id="root" data-prerender-language="${language}">
      <main aria-label="ScaleaStay" style="min-height:100vh;background:#020617;color:#fff;">
        <section id="home" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:96px 24px 48px;text-align:center;background:linear-gradient(180deg,rgba(2,6,23,.78),rgba(2,6,23,.38) 48%,rgba(2,6,23,.94)),url('https://i.postimg.cc/Dz0dHGzW/Scalea.webp') center/cover no-repeat;">
          <div style="width:100%;max-width:1040px;margin:0 auto;">
            <p style="display:inline-block;margin:0 0 28px;padding:10px 18px;border:1px solid rgba(255,255,255,.22);border-radius:16px;background:rgba(255,255,255,.1);font:800 11px/1.4 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;">Casa Marittima · Scalea, Calabria</p>
            <h1 style="margin:0 auto 32px;max-width:1000px;color:#fff;font:900 clamp(2.5rem,8vw,7.5rem)/.92 system-ui,sans-serif;letter-spacing:-.055em;text-transform:uppercase;text-wrap:balance;">${escapeHtml(content.heroTitle)}</h1>
            <p style="max-width:760px;margin:0 auto 40px;color:rgba(255,255,255,.9);font:500 clamp(1rem,2.2vw,1.4rem)/1.55 system-ui,sans-serif;">${escapeHtml(content.heroSubtitle)}</p>
            <nav aria-label="Primary" style="display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
              <a href="#apartments" style="display:inline-block;padding:16px 28px;border-radius:22px;background:#fff;color:#0f172a;font:800 1rem/1.2 system-ui,sans-serif;text-decoration:none;">${escapeHtml(content.apartmentsLabel)}</a>
              <a href="#routes" style="display:inline-block;padding:16px 28px;border:2px solid rgba(255,255,255,.45);border-radius:22px;color:#fff;font:800 1rem/1.2 system-ui,sans-serif;text-decoration:none;background:rgba(15,23,42,.28);">${escapeHtml(content.routesLabel)}</a>
            </nav>
          </div>
        </section>
      </main>
    </div>`;
};

const injectPrerenderShell = (html: string, language: LanguageCode) => {
  const rootStart = html.indexOf('<div id="root">');
  const firstScriptAfterRoot = html.indexOf('<script', rootStart);

  if (rootStart === -1 || firstScriptAfterRoot === -1) {
    throw new Error(`Could not locate the React root boundary for ${language}`);
  }

  const precedingComment = html.lastIndexOf('<!--', firstScriptAfterRoot);
  const suffixStart = precedingComment > rootStart ? precedingComment : firstScriptAfterRoot;

  return `${html.slice(0, rootStart)}${buildPrerenderShell(language)}\n    ${html.slice(suffixStart)}`;
};

const validateLocalizedHtml = (html: string, language: LanguageCode) => {
  const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;

  if (h1Count !== 1) {
    throw new Error(`Expected exactly one H1 in ${language} HTML, found ${h1Count}`);
  }

  if (!html.includes(`data-prerender-language="${language}"`)) {
    throw new Error(`Missing prerender marker for ${language}`);
  }

  if (!html.includes(escapeHtml(PRERENDER_CONTENT[language].heroTitle))) {
    throw new Error(`Missing localized prerender H1 text for ${language}`);
  }
};

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

  html = html.replace('</head>', `${socialMetadata}\n</head>`);
  html = injectPrerenderShell(html, language);
  validateLocalizedHtml(html, language);

  return html;
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
    const rootHtml = localizeHtml(builtHtml, 'ru', false);
    writeFileSync(rootIndexPath, rootHtml, 'utf8');

    LANGUAGES.forEach((language) => {
      const languageDirectory = path.join(outputDirectory, language);
      const localizedHtml = localizeHtml(builtHtml, language, true);
      mkdirSync(languageDirectory, { recursive: true });
      writeFileSync(
        path.join(languageDirectory, 'index.html'),
        localizedHtml,
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
