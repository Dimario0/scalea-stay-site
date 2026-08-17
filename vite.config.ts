import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://scaleastay.com';
const SEO_LASTMOD = '2026-08-17';
const LANGUAGES = ['ru', 'en', 'it', 'de', 'cs', 'pl'] as const;
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

type CommercialPage = {
  language: 'it' | 'pl';
  path: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
};

const LOCALIZED_SEO: Record<LanguageCode, LocalizedSeo> = {
  ru: {
    title: 'Апартаменты в Скалее у моря | ScaleaStay',
    description: 'ScaleaStay в Скалее, Калабрия: апартаменты с современным ремонтом, кондиционером, парковкой и кухней. Пляж — 600 м, около 5–8 минут пешком. Проверяйте даты напрямую.',
    locale: 'ru_RU',
  },
  en: {
    title: 'Holiday Apartment in Scalea, Calabria | ScaleaStay',
    description: 'ScaleaStay in Scalea, Calabria: a modern holiday apartment with air conditioning, parking and an equipped kitchen. The beach is 600 m away, about a 5–8 minute walk. Check dates directly.',
    locale: 'en_GB',
  },
  it: {
    title: 'Appartamento Vacanze a Scalea, Calabria | ScaleaStay',
    description: 'ScaleaStay a Scalea, Calabria: appartamento moderno con aria condizionata, parcheggio e cucina attrezzata. La spiaggia dista 600 m, circa 5–8 minuti a piedi. Verifica le date direttamente.',
    locale: 'it_IT',
  },
  de: {
    title: 'Ferienwohnung in Scalea, Kalabrien | ScaleaStay',
    description: 'ScaleaStay in Scalea, Kalabrien: moderne Ferienwohnung mit Klimaanlage, Parkplatz und ausgestatteter Küche. Der Strand ist 600 m entfernt, etwa 5–8 Gehminuten. Verfügbarkeit direkt prüfen.',
    locale: 'de_DE',
  },
  cs: {
    title: 'Apartmán ve Scalee, Kalábrie | ScaleaStay',
    description: 'ScaleaStay ve Scalee v Kalábrii: moderní apartmán s klimatizací, parkováním a vybavenou kuchyní. Pláž je 600 m daleko, přibližně 5–8 minut pěšky. Ověřte termíny přímo.',
    locale: 'cs_CZ',
  },
  pl: {
    title: 'Apartament w Scalei blisko morza | ScaleaStay',
    description: 'ScaleaStay w Scalei w Kalabrii: nowoczesny apartament z klimatyzacją, parkingiem i wyposażoną kuchnią. Plaża jest około 600 m dalej, zwykle 5–8 minut pieszo. Sprawdź wolne terminy bezpośrednio.',
    locale: 'pl_PL',
  },
};

const PRERENDER_CONTENT: Record<LanguageCode, PrerenderContent> = {
  ru: {
    heroTitle: 'Современные апартаменты у моря в Скалее',
    heroSubtitle: 'ScaleaStay — апартаменты с современным ремонтом для отдыха у моря. Пляж, супермаркет, вокзал и центр Скалеи доступны пешком.',
    apartmentsLabel: 'Посмотреть апартаменты',
    routesLabel: 'Посмотреть маршруты',
  },
  en: {
    heroTitle: 'Modern holiday apartment by the sea in Scalea',
    heroSubtitle: 'ScaleaStay is a modern apartment ideal for a seaside holiday, with the beach, supermarket, train station and central Scalea all within walking distance.',
    apartmentsLabel: 'View the apartment',
    routesLabel: 'View routes',
  },
  it: {
    heroTitle: 'Appartamento moderno vicino al mare a Scalea',
    heroSubtitle: 'ScaleaStay è un appartamento con interni moderni, ideale per una vacanza al mare. Spiaggia, Interspar, stazione e centro di Scalea sono comodamente raggiungibili a piedi.',
    apartmentsLabel: 'Scopri l’appartamento',
    routesLabel: 'Scopri i percorsi',
  },
  de: {
    heroTitle: 'Moderne Ferienwohnung am Meer in Scalea',
    heroSubtitle: 'ScaleaStay ist eine moderne Ferienwohnung, ideal für einen Urlaub am Meer. Strand, Supermarkt, Bahnhof und das Zentrum von Scalea sind bequem zu Fuß erreichbar.',
    apartmentsLabel: 'Wohnung ansehen',
    routesLabel: 'Routen ansehen',
  },
  cs: {
    heroTitle: 'Moderní apartmán u moře ve Scalee',
    heroSubtitle: 'ScaleaStay je moderní apartmán ideální pro dovolenou u moře. Pláž, supermarket, nádraží i centrum města Scalea jsou pohodlně dostupné pěšky.',
    apartmentsLabel: 'Prohlédnout apartmán',
    routesLabel: 'Zobrazit trasy',
  },
  pl: {
    heroTitle: 'Nowoczesny apartament blisko morza w Scalei',
    heroSubtitle: 'ScaleaStay to komfortowy apartament z nowoczesnym wnętrzem na wakacje nad morzem. Plaża, Interspar, dworzec i centrum Scalei są w zasięgu spaceru.',
    apartmentsLabel: 'Zobacz apartament',
    routesLabel: 'Zobacz trasy',
  },
};

const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    language: 'it',
    path: '/it/appartamento-scalea-vicino-mare/',
    title: 'Appartamento a Scalea vicino al mare | ScaleaStay',
    description: 'Appartamento a Scalea in Calabria con spiaggia a circa 600 m, Interspar a 230 m, stazione a 500 m, aria condizionata, cucina, terrazza e parcheggio. Verifica le date su WhatsApp.',
    heroTitle: 'Appartamento a Scalea vicino al mare',
    heroSubtitle: 'ScaleaStay è un appartamento moderno in una zona comoda di Scalea: spiaggia, Interspar, stazione e centro sono raggiungibili a piedi.',
    cta: 'Verifica le date su WhatsApp',
  },
  {
    language: 'pl',
    path: '/pl/apartament-scalea-blisko-morza/',
    title: 'Apartament w Scalei blisko morza | ScaleaStay',
    description: 'Apartament w Scalei w Kalabrii: plaża około 600 m, Interspar 230 m, dworzec 500 m, klimatyzacja, kuchnia, taras i parking. Sprawdź wolne terminy przez WhatsApp.',
    heroTitle: 'Apartament w Scalei blisko morza',
    heroSubtitle: 'ScaleaStay to nowoczesny apartament w wygodnej części Scalei. Plaża, Interspar, dworzec i centrum są dostępne pieszo.',
    cta: 'Sprawdź terminy na WhatsApp',
  },
];

const legacyStructuredDataPatterns = [
  /\s*<!-- Structured Data: VacationRental -->[\s\S]*?<\/script>\s*/i,
  /\s*<!-- Structured Data: FAQ -->[\s\S]*?<\/script>\s*/i,
];

const robotsText = `User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

const rootAlternateLinks = LANGUAGES
  .map((language) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${SITE_ORIGIN}/${language}/"/>`)
  .join('\n');

const rootSitemapEntries = LANGUAGES
  .map((language) => `  <url>
    <loc>${SITE_ORIGIN}/${language}/</loc>
${rootAlternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/ru/"/>
    <lastmod>${SEO_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`)
  .join('\n');

const commercialAlternateLinks = COMMERCIAL_PAGES
  .map((page) => `    <xhtml:link rel="alternate" hreflang="${page.language}" href="${SITE_ORIGIN}${page.path}"/>`)
  .join('\n');

const commercialSitemapEntries = COMMERCIAL_PAGES
  .map((page) => `  <url>
    <loc>${SITE_ORIGIN}${page.path}</loc>
${commercialAlternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${COMMERCIAL_PAGES[0].path}"/>
    <lastmod>${SEO_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`)
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rootSitemapEntries}
${commercialSitemapEntries}
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
  inLanguage: language,
});

const buildCommercialSchema = (page: CommercialPage) => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}${page.path}#webpage`,
      url: `${SITE_ORIGIN}${page.path}`,
      name: page.title,
      description: page.description,
      inLanguage: page.language,
      about: { '@id': `${SITE_ORIGIN}/#property` },
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_ORIGIN}${page.path}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ScaleaStay',
          item: `${SITE_ORIGIN}/${page.language}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.heroTitle,
          item: `${SITE_ORIGIN}${page.path}`,
        },
      ],
    },
  ],
});

const buildRootHeadAlternates = () => [
  ...LANGUAGES.map((language) => `    <link rel="alternate" hreflang="${language}" href="${SITE_ORIGIN}/${language}/" />`),
  `    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/ru/" />`,
].join('\n');

const buildCommercialHeadAlternates = () => [
  ...COMMERCIAL_PAGES.map((page) => `    <link rel="alternate" hreflang="${page.language}" href="${SITE_ORIGIN}${page.path}" />`),
  `    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${COMMERCIAL_PAGES[0].path}" />`,
].join('\n');

const removeExistingHeadAlternates = (html: string) =>
  html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*\/?>\s*/gi, '\n');

const buildPrerenderShell = (language: LanguageCode) => {
  const content = PRERENDER_CONTENT[language];

  return `    <div id="root" data-prerender-language="${language}">
      <main aria-label="ScaleaStay" style="min-height:100vh;background:#020617;color:#fff;">
        <section id="home" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:96px 24px 48px;text-align:center;background:linear-gradient(180deg,rgba(2,6,23,.78),rgba(2,6,23,.38) 48%,rgba(2,6,23,.94)),url('https://i.postimg.cc/Dz0dHGzW/Scalea.webp') center/cover no-repeat;">
          <div style="width:100%;max-width:1040px;margin:0 auto;">
            <p style="display:inline-block;margin:0 0 28px;padding:10px 18px;border:1px solid rgba(255,255,255,.22);border-radius:16px;background:rgba(255,255,255,.1);font:800 11px/1.4 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;">ScaleaStay · Scalea, Calabria</p>
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

const buildCommercialPrerenderShell = (page: CommercialPage) => `    <div id="root" data-prerender-commercial="${page.language}">
      <main aria-label="ScaleaStay" style="min-height:100vh;background:#020617;color:#fff;">
        <section style="min-height:78vh;display:flex;align-items:center;justify-content:center;padding:96px 24px 64px;text-align:center;background:#020617;">
          <div style="width:100%;max-width:960px;margin:0 auto;">
            <p style="margin:0 0 24px;color:#a5b4fc;font:800 11px/1.4 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;">ScaleaStay · Scalea · Calabria</p>
            <h1 style="margin:0 auto 28px;max-width:920px;color:#fff;font:900 clamp(2.5rem,7vw,5.5rem)/.96 system-ui,sans-serif;letter-spacing:-.045em;text-wrap:balance;">${escapeHtml(page.heroTitle)}</h1>
            <p style="max-width:760px;margin:0 auto 34px;color:#cbd5e1;font:500 clamp(1rem,2vw,1.3rem)/1.6 system-ui,sans-serif;">${escapeHtml(page.heroSubtitle)}</p>
            <p style="margin:0 auto 32px;color:#fff;font:800 1rem/1.6 system-ui,sans-serif;">600 m · 5–8 min · Interspar 230 m · station 500 m · parking</p>
            <a href="https://wa.me/420774620060" style="display:inline-block;padding:16px 26px;border-radius:18px;background:#4f46e5;color:#fff;font:800 1rem/1.2 system-ui,sans-serif;text-decoration:none;">${escapeHtml(page.cta)}</a>
          </div>
        </section>
      </main>
    </div>`;

const injectShell = (html: string, shell: string) => {
  const rootStart = html.indexOf('<div id="root">');
  const firstScriptAfterRoot = html.indexOf('<script', rootStart);

  if (rootStart === -1 || firstScriptAfterRoot === -1) {
    throw new Error('Could not locate the React root boundary');
  }

  const precedingComment = html.lastIndexOf('<!--', firstScriptAfterRoot);
  const suffixStart = precedingComment > rootStart ? precedingComment : firstScriptAfterRoot;

  return `${html.slice(0, rootStart)}${shell}\n    ${html.slice(suffixStart)}`;
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

  let html = removeExistingHeadAlternates(sourceHtml)
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
    buildRootHeadAlternates(),
    websiteSchema,
  ].filter(Boolean).join('\n');

  html = html.replace('</head>', `${socialMetadata}\n</head>`);
  html = injectShell(html, buildPrerenderShell(language));
  validateLocalizedHtml(html, language);

  return html;
};

const localizeCommercialHtml = (sourceHtml: string, page: CommercialPage) => {
  const pageUrl = `${SITE_ORIGIN}${page.path}`;
  const seo = LOCALIZED_SEO[page.language];
  let html = removeExistingHeadAlternates(sourceHtml)
    .replace(/<html lang="[^"]*">/i, `<html lang="${page.language}">`)
    .replace(/\s*<meta name="keywords"[^>]*>\s*/i, '\n')
    .replace(/\s*<meta property="og:locale(?:[:][^"]+)?"[^>]*>\s*/gi, '\n')
    .replace(/\s*<meta property="og:site_name"[^>]*>\s*/gi, '\n')
    .replace(/\s*<meta name="robots"[^>]*>\s*/gi, '\n');

  html = replaceOrInsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = replaceOrInsertHeadTag(html, /<meta name="description" content="[^"]*">/i, `<meta name="description" content="${page.description}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${pageUrl}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${page.title}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${page.description}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:url" content="[^"]*">/i, `<meta property="twitter:url" content="${pageUrl}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:title" content="[^"]*">/i, `<meta property="twitter:title" content="${page.title}">`);
  html = replaceOrInsertHeadTag(html, /<meta property="twitter:description" content="[^"]*">/i, `<meta property="twitter:description" content="${page.description}">`);
  html = replaceOrInsertHeadTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);

  const metadata = [
    '    <meta name="robots" content="index,follow,max-image-preview:large">',
    '    <meta property="og:site_name" content="ScaleaStay">',
    `    <meta property="og:locale" content="${seo.locale}">`,
    buildCommercialHeadAlternates(),
    `    <script type="application/ld+json">${buildWebsiteSchema(page.language)}</script>`,
    `    <script type="application/ld+json">${buildCommercialSchema(page)}</script>`,
  ].join('\n');

  html = html.replace('</head>', `${metadata}\n</head>`);
  html = injectShell(html, buildCommercialPrerenderShell(page));

  const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
  if (h1Count !== 1 || !html.includes(`data-prerender-commercial="${page.language}"`)) {
    throw new Error(`Invalid commercial prerender for ${page.path}`);
  }

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

    COMMERCIAL_PAGES.forEach((page) => {
      const pageDirectory = path.join(outputDirectory, page.path.replace(/^\//, ''));
      mkdirSync(pageDirectory, { recursive: true });
      writeFileSync(
        path.join(pageDirectory, 'index.html'),
        localizeCommercialHtml(builtHtml, page),
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