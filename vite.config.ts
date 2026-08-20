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
type PriorityLanguage = 'it' | 'pl';
type GuideTopic = 'airport' | 'no-car';

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
  language: PriorityLanguage;
  path: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
};

type GuidePage = {
  language: PriorityLanguage;
  topic: GuideTopic;
  path: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  summary: string;
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

const GUIDE_PAGES: GuidePage[] = [
  {
    language: 'it',
    topic: 'airport',
    path: '/it/come-arrivare-da-lamezia-terme-a-scalea/',
    title: 'Come arrivare da Lamezia Terme a Scalea | ScaleaStay',
    description: 'Come raggiungere Scalea dall’aeroporto di Lamezia Terme: Airlink fino a Lamezia Terme Centrale, treno per Scalea e ultimo tratto verso ScaleaStay.',
    heroTitle: 'Come arrivare dall’aeroporto di Lamezia Terme a Scalea',
    heroSubtitle: 'Un percorso pratico con i mezzi pubblici: Lamezia Airlink fino alla stazione centrale, treno per Scalea–Santa Domenica Talao e ultimo tratto fino a ScaleaStay.',
    summary: 'Lamezia Airlink → Lamezia Terme Centrale → treno per Scalea–Santa Domenica Talao → circa 500 m / 8 min a piedi fino a ScaleaStay.',
  },
  {
    language: 'pl',
    topic: 'airport',
    path: '/pl/jak-dojechac-z-lamezia-terme-do-scalei/',
    title: 'Jak dojechać z lotniska Lamezia Terme do Scalei | ScaleaStay',
    description: 'Jak dojechać z lotniska Lamezia Terme do Scalei: Airlink do Lamezia Terme Centrale, pociąg do Scalea i ostatni odcinek do ScaleaStay.',
    heroTitle: 'Jak dojechać z lotniska Lamezia Terme do Scalei',
    heroSubtitle: 'Praktyczna trasa transportem publicznym: Lamezia Airlink do stacji Lamezia Terme Centrale, dalej pociąg do Scalea–Santa Domenica Talao i ostatni odcinek do ScaleaStay.',
    summary: 'Lamezia Airlink → Lamezia Terme Centrale → pociąg do Scalea–Santa Domenica Talao → około 500 m / 8 min pieszo do ScaleaStay.',
  },
  {
    language: 'it',
    topic: 'no-car',
    path: '/it/scalea-senza-auto/',
    title: 'Scalea senza auto: cosa raggiungere a piedi | ScaleaStay',
    description: 'Vacanza a Scalea senza usare sempre l’auto: da ScaleaStay spiaggia 600 m, Interspar 230 m, stazione 500 m e centro storico 950 m.',
    heroTitle: 'Vacanza a Scalea senza auto: cosa puoi raggiungere a piedi',
    heroSubtitle: 'Da ScaleaStay molte cose utili per la vacanza sono raggiungibili a piedi: mare, supermercato, stazione, centro storico e luoghi per una passeggiata serale.',
    summary: 'Spiaggia 600 m / 5–8 min · Interspar 230 m / ~3 min · stazione 500 m / ~8 min · centro storico 950 m / ~13 min.',
  },
  {
    language: 'pl',
    topic: 'no-car',
    path: '/pl/scalea-bez-samochodu/',
    title: 'Scalea bez samochodu: co jest blisko pieszo | ScaleaStay',
    description: 'Wakacje w Scalei bez ciągłego korzystania z auta: od ScaleaStay plaża 600 m, Interspar 230 m, dworzec 500 m i stare miasto 950 m.',
    heroTitle: 'Scalea bez samochodu: co jest w zasięgu spaceru',
    heroSubtitle: 'Od ScaleaStay wiele rzeczy potrzebnych podczas urlopu jest dostępnych pieszo: morze, supermarket, dworzec, stare miasto i miejsca na wieczorny spacer.',
    summary: 'Plaża 600 m / 5–8 min · Interspar 230 m / ~3 min · dworzec 500 m / ~8 min · stare miasto 950 m / ~13 min.',
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

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const replaceOrInsertHeadTag = (html: string, pattern: RegExp, replacement: string) => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n</head>`);
};

const removeExistingHeadAlternates = (html: string) =>
  html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*\/?>\s*/gi, '\n');

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

const buildPairedSitemapEntries = <T extends { language: PriorityLanguage; path: string }>(pages: T[], priority: string) => {
  const alternates = pages
    .map((page) => `    <xhtml:link rel="alternate" hreflang="${page.language}" href="${SITE_ORIGIN}${page.path}"/>`)
    .join('\n');

  return pages
    .map((page) => `  <url>
    <loc>${SITE_ORIGIN}${page.path}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${pages[0].path}"/>
    <lastmod>${SEO_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`)
    .join('\n');
};

const commercialSitemapEntries = buildPairedSitemapEntries(COMMERCIAL_PAGES, '0.9');
const guideSitemapEntries = (['airport', 'no-car'] as GuideTopic[])
  .map((topic) => buildPairedSitemapEntries(GUIDE_PAGES.filter((page) => page.topic === topic), '0.8'))
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rootSitemapEntries}
${commercialSitemapEntries}
${guideSitemapEntries}
</urlset>
`;

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
        { '@type': 'ListItem', position: 1, name: 'ScaleaStay', item: `${SITE_ORIGIN}/${page.language}/` },
        { '@type': 'ListItem', position: 2, name: page.heroTitle, item: `${SITE_ORIGIN}${page.path}` },
      ],
    },
  ],
});

const buildGuideSchema = (page: GuidePage) => {
  const canonical = `${SITE_ORIGIN}${page.path}`;
  const graph: object[] = [
    {
      '@type': ['WebPage', 'Article'],
      '@id': `${canonical}#webpage`,
      url: canonical,
      headline: page.heroTitle,
      name: page.title,
      description: page.description,
      inLanguage: page.language,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: [
        { '@type': 'City', name: 'Scalea' },
        { '@type': 'AdministrativeArea', name: 'Calabria' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ScaleaStay', item: `${SITE_ORIGIN}/${page.language}/` },
        { '@type': 'ListItem', position: 2, name: page.heroTitle, item: canonical },
      ],
    },
  ];

  if (page.topic === 'airport') {
    graph.push({
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: page.heroTitle,
      description: page.heroSubtitle,
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Lamezia Terme Airport → Lamezia Terme Centrale',
          text: page.language === 'it'
            ? 'Usa il collegamento Lamezia Airlink tra l’aeroporto e la stazione Lamezia Terme Centrale.'
            : 'Skorzystaj z Lamezia Airlink między lotniskiem a stacją Lamezia Terme Centrale.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Lamezia Terme Centrale → Scalea',
          text: page.language === 'it'
            ? 'Prosegui in treno fino a Scalea–Santa Domenica Talao e verifica l’orario per la data del viaggio.'
            : 'Jedź pociągiem do Scalea–Santa Domenica Talao i sprawdź rozkład dla dnia podróży.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Scalea station → ScaleaStay',
          text: page.language === 'it'
            ? 'Dalla stazione il percorso verificato fino a ScaleaStay è di circa 500 m, normalmente circa 8 minuti a piedi.'
            : 'Ze stacji sprawdzona trasa do ScaleaStay ma około 500 m, zwykle około 8 minut pieszo.',
        },
      ],
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
};

const buildRootHeadAlternates = () => [
  ...LANGUAGES.map((language) => `    <link rel="alternate" hreflang="${language}" href="${SITE_ORIGIN}/${language}/" />`),
  `    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}/ru/" />`,
].join('\n');

const buildPairHeadAlternates = <T extends { language: PriorityLanguage; path: string }>(pages: T[]) => [
  ...pages.map((page) => `    <link rel="alternate" hreflang="${page.language}" href="${SITE_ORIGIN}${page.path}" />`),
  `    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${pages[0].path}" />`,
].join('\n');

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

const buildGuidePrerenderShell = (page: GuidePage) => `    <div id="root" data-prerender-guide="${page.topic}-${page.language}">
      <main aria-label="ScaleaStay guide" style="min-height:100vh;background:#020617;color:#fff;">
        <article style="min-height:78vh;display:flex;align-items:center;justify-content:center;padding:96px 24px 64px;background:#020617;">
          <div style="width:100%;max-width:960px;margin:0 auto;">
            <p style="margin:0 0 24px;color:#a5b4fc;font:800 11px/1.4 system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;">ScaleaStay · Guide · Scalea, Calabria</p>
            <h1 style="margin:0 0 28px;max-width:920px;color:#fff;font:900 clamp(2.5rem,7vw,5.5rem)/.96 system-ui,sans-serif;letter-spacing:-.045em;text-wrap:balance;">${escapeHtml(page.heroTitle)}</h1>
            <p style="max-width:800px;margin:0 0 28px;color:#cbd5e1;font:500 clamp(1rem,2vw,1.3rem)/1.6 system-ui,sans-serif;">${escapeHtml(page.heroSubtitle)}</p>
            <p style="max-width:820px;margin:0;color:#fff;font:800 1rem/1.7 system-ui,sans-serif;">${escapeHtml(page.summary)}</p>
          </div>
        </article>
      </main>
    </div>`;

const injectShell = (html: string, shell: string) => {
  const rootStart = html.indexOf('<div id="root">');
  const firstScriptAfterRoot = html.indexOf('<script', rootStart);
  if (rootStart === -1 || firstScriptAfterRoot === -1) throw new Error('Could not locate the React root boundary');
  const precedingComment = html.lastIndexOf('<!--', firstScriptAfterRoot);
  const suffixStart = precedingComment > rootStart ? precedingComment : firstScriptAfterRoot;
  return `${html.slice(0, rootStart)}${shell}\n    ${html.slice(suffixStart)}`;
};

const validateOneH1 = (html: string, label: string) => {
  const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
  if (h1Count !== 1) throw new Error(`Expected exactly one H1 in ${label}, found ${h1Count}`);
};

const cleanBaseHtml = (sourceHtml: string, language: LanguageCode) => removeExistingHeadAlternates(sourceHtml)
  .replace(/<html lang="[^"]*">/i, `<html lang="${language}">`)
  .replace(/\s*<meta name="keywords"[^>]*>\s*/i, '\n')
  .replace(/\s*<meta property="og:locale(?:[:][^"]+)?"[^>]*>\s*/gi, '\n')
  .replace(/\s*<meta property="og:site_name"[^>]*>\s*/gi, '\n')
  .replace(/\s*<meta name="robots"[^>]*>\s*/gi, '\n')
  .replace(/\s*<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebSite"[\s\S]*?<\/script>\s*/gi, '\n');

const applyBasicSeo = (html: string, title: string, description: string, pageUrl: string) => {
  let next = replaceOrInsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  next = replaceOrInsertHeadTag(next, /<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${pageUrl}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${title}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="twitter:url" content="[^"]*">/i, `<meta property="twitter:url" content="${pageUrl}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="twitter:title" content="[^"]*">/i, `<meta property="twitter:title" content="${title}">`);
  next = replaceOrInsertHeadTag(next, /<meta property="twitter:description" content="[^"]*">/i, `<meta property="twitter:description" content="${description}">`);
  next = replaceOrInsertHeadTag(next, /<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${pageUrl}" />`);
  return next;
};

const localizeHtml = (sourceHtml: string, language: LanguageCode, indexable: boolean) => {
  const seo = LOCALIZED_SEO[language];
  const pageUrl = `${SITE_ORIGIN}/${language}/`;
  const alternateLocales = LANGUAGES
    .filter((code) => code !== language)
    .map((code) => `    <meta property="og:locale:alternate" content="${LOCALIZED_SEO[code].locale}">`)
    .join('\n');

  let html = applyBasicSeo(cleanBaseHtml(sourceHtml, language), seo.title, seo.description, pageUrl);
  const metadata = [
    `    <meta name="robots" content="${indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}">`,
    '    <meta property="og:site_name" content="ScaleaStay">',
    `    <meta property="og:locale" content="${seo.locale}">`,
    alternateLocales,
    buildRootHeadAlternates(),
    `    <script type="application/ld+json">${buildWebsiteSchema(language)}</script>`,
  ].filter(Boolean).join('\n');

  html = html.replace('</head>', `${metadata}\n</head>`);
  html = injectShell(html, buildPrerenderShell(language));
  validateOneH1(html, language);
  if (!html.includes(`data-prerender-language="${language}"`)) throw new Error(`Missing prerender marker for ${language}`);
  return html;
};

const localizeCommercialHtml = (sourceHtml: string, page: CommercialPage) => {
  const pageUrl = `${SITE_ORIGIN}${page.path}`;
  const pair = COMMERCIAL_PAGES;
  let html = applyBasicSeo(cleanBaseHtml(sourceHtml, page.language), page.title, page.description, pageUrl);
  const metadata = [
    '    <meta name="robots" content="index,follow,max-image-preview:large">',
    '    <meta property="og:site_name" content="ScaleaStay">',
    `    <meta property="og:locale" content="${LOCALIZED_SEO[page.language].locale}">`,
    buildPairHeadAlternates(pair),
    `    <script type="application/ld+json">${buildWebsiteSchema(page.language)}</script>`,
    `    <script type="application/ld+json">${buildCommercialSchema(page)}</script>`,
  ].join('\n');

  html = html.replace('</head>', `${metadata}\n</head>`);
  html = injectShell(html, buildCommercialPrerenderShell(page));
  validateOneH1(html, page.path);
  if (!html.includes(`data-prerender-commercial="${page.language}"`)) throw new Error(`Invalid commercial prerender for ${page.path}`);
  return html;
};

const localizeGuideHtml = (sourceHtml: string, page: GuidePage) => {
  const pageUrl = `${SITE_ORIGIN}${page.path}`;
  const pair = GUIDE_PAGES.filter((item) => item.topic === page.topic);
  let html = applyBasicSeo(cleanBaseHtml(sourceHtml, page.language), page.title, page.description, pageUrl);
  const metadata = [
    '    <meta name="robots" content="index,follow,max-image-preview:large">',
    '    <meta property="og:site_name" content="ScaleaStay">',
    `    <meta property="og:locale" content="${LOCALIZED_SEO[page.language].locale}">`,
    buildPairHeadAlternates(pair),
    `    <script type="application/ld+json">${buildWebsiteSchema(page.language)}</script>`,
    `    <script type="application/ld+json">${buildGuideSchema(page)}</script>`,
  ].join('\n');

  html = html.replace('</head>', `${metadata}\n</head>`);
  html = injectShell(html, buildGuidePrerenderShell(page));
  validateOneH1(html, page.path);
  if (!html.includes(`data-prerender-guide="${page.topic}-${page.language}"`)) throw new Error(`Invalid guide prerender for ${page.path}`);
  return html;
};

const outputDirectoryFor = (dist: string, pagePath: string) => path.join(dist, pagePath.replace(/^\//, '').replace(/\/$/, ''));

const seoBuildCleanup = (): Plugin => ({
  name: 'scaleastay-seo-build-cleanup',
  enforce: 'pre',
  transformIndexHtml(html) {
    return legacyStructuredDataPatterns.reduce((cleanHtml, pattern) => cleanHtml.replace(pattern, '\n'), html);
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
      writeFileSync(path.join(languageDirectory, 'index.html'), localizeHtml(builtHtml, language, true), 'utf8');
    });

    COMMERCIAL_PAGES.forEach((page) => {
      const pageDirectory = outputDirectoryFor(outputDirectory, page.path);
      mkdirSync(pageDirectory, { recursive: true });
      writeFileSync(path.join(pageDirectory, 'index.html'), localizeCommercialHtml(builtHtml, page), 'utf8');
    });

    GUIDE_PAGES.forEach((page) => {
      const pageDirectory = outputDirectoryFor(outputDirectory, page.path);
      mkdirSync(pageDirectory, { recursive: true });
      writeFileSync(path.join(pageDirectory, 'index.html'), localizeGuideHtml(builtHtml, page), 'utf8');
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
    plugins: [seoBuildCleanup(), tailwindcss(), react()],
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