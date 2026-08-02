import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const AUDIT_VERSION = '2.0.0';
const DEFAULT_BASE_URL = 'https://scaleastay.com';
const DEFAULT_OUTPUT_DIRECTORY = 'artifacts';
const REQUEST_TIMEOUT_MS = 30_000;
const RENDER_TIMEOUT_MS = 30_000;

const PAGE_SPECS = [
  { route: '/', expectedLanguage: 'ru', indexable: false },
  { route: '/ru/', expectedLanguage: 'ru', indexable: true },
  { route: '/en/', expectedLanguage: 'en', indexable: true },
  { route: '/it/', expectedLanguage: 'it', indexable: true },
  { route: '/de/', expectedLanguage: 'de', indexable: true },
  { route: '/cs/', expectedLanguage: 'cs', indexable: true },
];

const getArgument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  if (index === -1 || !process.argv[index + 1]) return fallback;
  return process.argv[index + 1];
};

const normalizeBaseUrl = (value) => value.replace(/\/+$/, '');
const normalizeComparableUrl = (value) => {
  if (!value) return '';
  try {
    const url = new URL(value);
    url.hash = '';
    url.search = '';
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    return url.toString();
  } catch {
    return value.trim();
  }
};

const decodeHtmlEntities = (value) => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));

const stripTags = (value) => decodeHtmlEntities(
  value.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim(),
);

const extractTitle = (html) => stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');

const extractMeta = (html, key) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = tag.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== key.toLowerCase()) continue;
    return decodeHtmlEntities(tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1]?.trim() ?? '');
  }
  return '';
};

const extractCanonical = (html) => {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? '';
    if (!rel.split(/\s+/).includes('canonical')) continue;
    return decodeHtmlEntities(tag.match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1]?.trim() ?? '');
  }
  return '';
};

const extractLanguage = (html) => html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i)?.[1]?.trim().toLowerCase() ?? '';

const extractH1Texts = (html) => [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  .map((match) => stripTags(match[1]))
  .filter(Boolean);

const parseRawHtml = (html) => ({
  title: extractTitle(html),
  description: extractMeta(html, 'description'),
  robots: extractMeta(html, 'robots'),
  canonical: extractCanonical(html),
  language: extractLanguage(html),
  h1Texts: extractH1Texts(html),
});

const addFinding = (target, finding) => {
  const signature = `${finding.type}|${finding.priority}|${finding.message}`;
  const existing = target.get(signature);
  if (existing) {
    if (!existing.pages.includes(finding.page)) existing.pages.push(finding.page);
    return;
  }
  target.set(signature, {
    type: finding.type,
    priority: finding.priority,
    message: finding.message,
    pages: [finding.page],
  });
};

const pagePath = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

const auditPage = async ({ browser, baseUrl, spec }) => {
  const url = `${baseUrl}${spec.route}`;
  const expectedCanonical = spec.route === '/' ? `${baseUrl}/` : `${baseUrl}${spec.route}`;
  const result = {
    route: spec.route,
    url,
    expectedLanguage: spec.expectedLanguage,
    indexable: spec.indexable,
    expectedCanonical,
    raw: null,
    rendered: null,
    errors: [],
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'ScaleaStay-SEO-Audit/2.0 (+read-only)',
        accept: 'text/html,application/xhtml+xml',
      },
    });
    clearTimeout(timer);
    const html = await response.text();
    result.raw = {
      statusCode: response.status,
      finalUrl: response.url,
      ...parseRawHtml(html),
    };
  } catch (error) {
    result.errors.push(`RAW_FETCH_FAILED: ${error instanceof Error ? error.message : String(error)}`);
  }

  const page = await browser.newPage({
    locale: spec.expectedLanguage,
    viewport: { width: 1280, height: 900 },
  });

  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: RENDER_TIMEOUT_MS,
    });

    await page.waitForLoadState('networkidle', { timeout: 7_500 }).catch(() => {});
    await page.locator('h1').first().waitFor({ state: 'attached', timeout: 10_000 }).catch(() => {});

    result.rendered = await page.evaluate(() => {
      const readMeta = (key) => document.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.getAttribute('content')?.trim() ?? '';
      const h1Elements = [...document.querySelectorAll('h1')];
      const visibleH1Texts = h1Elements
        .filter((element) => {
          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
        })
        .map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '')
        .filter(Boolean);

      return {
        statusCode: null,
        finalUrl: window.location.href,
        title: document.title.trim(),
        description: readMeta('description'),
        robots: readMeta('robots'),
        canonical: document.querySelector('link[rel~="canonical"]')?.getAttribute('href')?.trim() ?? '',
        language: document.documentElement.lang.trim().toLowerCase(),
        h1Texts: h1Elements.map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '').filter(Boolean),
        visibleH1Texts,
      };
    });
    result.rendered.statusCode = response?.status() ?? null;
  } catch (error) {
    result.errors.push(`RENDER_FAILED: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await page.close();
  }

  return result;
};

const classifyResults = (pages) => {
  const taskMap = new Map();
  const noticeMap = new Map();

  for (const page of pages) {
    const label = pagePath(page.url);
    const rendered = page.rendered;
    const raw = page.raw;

    for (const error of page.errors) {
      addFinding(noticeMap, {
        type: 'AUDIT_EXECUTION_NOTICE',
        priority: 'INFO',
        message: error,
        page: label,
      });
    }

    if (!rendered) {
      addFinding(taskMap, {
        type: 'RENDER_UNAVAILABLE',
        priority: 'HIGH',
        message: 'Не удалось получить DOM после выполнения JavaScript. Результаты SEO для страницы нельзя считать подтверждёнными.',
        page: label,
      });
      continue;
    }

    if (!rendered.statusCode || rendered.statusCode < 200 || rendered.statusCode >= 400) {
      addFinding(taskMap, {
        type: 'HTTP_STATUS_ERROR',
        priority: 'HIGH',
        message: 'Страница вернула ошибочный HTTP-статус при браузерной проверке.',
        page: label,
      });
    }

    const renderedH1Count = rendered.h1Texts.length;
    const visibleH1Count = rendered.visibleH1Texts.length;
    const rawH1Count = raw?.h1Texts.length ?? null;

    if (renderedH1Count === 0) {
      addFinding(taskMap, {
        type: 'H1_MISSING',
        priority: 'MEDIUM',
        message: 'В DOM после выполнения JavaScript отсутствует главный заголовок H1.',
        page: label,
      });
    } else if (renderedH1Count > 1) {
      addFinding(taskMap, {
        type: 'H1_DUPLICATE',
        priority: 'MEDIUM',
        message: 'В DOM после выполнения JavaScript найдено больше одного H1.',
        page: label,
      });
    } else if (visibleH1Count !== 1) {
      addFinding(taskMap, {
        type: 'H1_NOT_VISIBLE',
        priority: 'MEDIUM',
        message: 'H1 присутствует в DOM, но не отображается как один видимый заголовок.',
        page: label,
      });
    }

    if (rawH1Count === 0 && renderedH1Count === 1) {
      addFinding(noticeMap, {
        type: 'JS_RENDERED_ONLY',
        priority: 'INFO',
        message: 'H1 появляется после выполнения JavaScript. Это техническое уведомление, а не подтверждённая ошибка сайта.',
        page: label,
      });
    }

    if (!rendered.title) {
      addFinding(taskMap, {
        type: 'TITLE_MISSING',
        priority: 'MEDIUM',
        message: 'После рендеринга отсутствует title страницы.',
        page: label,
      });
    }

    if (!rendered.description) {
      addFinding(taskMap, {
        type: 'DESCRIPTION_MISSING',
        priority: 'MEDIUM',
        message: 'После рендеринга отсутствует meta description.',
        page: label,
      });
    }

    if (rendered.language !== page.expectedLanguage) {
      addFinding(taskMap, {
        type: 'LANGUAGE_MISMATCH',
        priority: 'MEDIUM',
        message: 'Атрибут html lang не соответствует языку URL.',
        page: label,
      });
    }

    if (normalizeComparableUrl(rendered.canonical) !== normalizeComparableUrl(page.expectedCanonical)) {
      addFinding(taskMap, {
        type: 'CANONICAL_MISMATCH',
        priority: 'MEDIUM',
        message: 'Canonical после рендеринга не соответствует проверяемой языковой странице.',
        page: label,
      });
    }

    const robots = rendered.robots.toLowerCase();
    if (page.indexable && robots.includes('noindex')) {
      addFinding(taskMap, {
        type: 'UNEXPECTED_NOINDEX',
        priority: 'HIGH',
        message: 'Индексируемая языковая страница содержит noindex.',
        page: label,
      });
    }
    if (!page.indexable && !robots.includes('noindex')) {
      addFinding(taskMap, {
        type: 'ROOT_INDEXING_POLICY',
        priority: 'MEDIUM',
        message: 'Корневая техническая страница должна содержать noindex,follow, чтобы не конкурировать с языковыми URL.',
        page: label,
      });
    }
  }

  return {
    tasks: [...taskMap.values()].map((item) => ({ ...item, pages: item.pages.sort() })),
    notices: [...noticeMap.values()].map((item) => ({ ...item, pages: item.pages.sort() })),
  };
};

const buildMarkdown = (report) => {
  const lines = [
    `# ScaleaStay SEO Audit V${report.auditVersion}`,
    '',
    `- Generated: ${report.generatedAt}`,
    `- Base URL: ${report.baseUrl}`,
    '- Mode: READ-ONLY',
    `- Checked URLs: ${report.summary.checkedPages}`,
    `- Unique real tasks: ${report.summary.uniqueTasks}`,
    `- Technical notices: ${report.summary.technicalNotices}`,
    '',
    '## Page results',
    '',
    '| URL | HTTP | raw H1 | rendered H1 | visible H1 | lang | canonical |',
    '|---|---:|---:|---:|---:|---|---|',
  ];

  for (const page of report.pages) {
    lines.push(`| ${page.route} | ${page.rendered?.statusCode ?? page.raw?.statusCode ?? '—'} | ${page.raw?.h1Texts.length ?? '—'} | ${page.rendered?.h1Texts.length ?? '—'} | ${page.rendered?.visibleH1Texts.length ?? '—'} | ${page.rendered?.language || page.raw?.language || '—'} | ${page.rendered?.canonical || page.raw?.canonical || '—'} |`);
  }

  lines.push('', '## Real tasks', '');
  if (report.tasks.length === 0) {
    lines.push('No confirmed site tasks were found.');
  } else {
    report.tasks.forEach((task, index) => {
      lines.push(`${index + 1}. **${task.priority} ${task.type}** — ${task.message}`);
      lines.push(`   Pages: ${task.pages.join(', ')}`);
    });
  }

  lines.push('', '## Technical notices', '');
  if (report.notices.length === 0) {
    lines.push('No technical notices.');
  } else {
    report.notices.forEach((notice, index) => {
      lines.push(`${index + 1}. **${notice.type}** — ${notice.message}`);
      lines.push(`   Pages: ${notice.pages.join(', ')}`);
    });
  }

  lines.push(
    '',
    '## Safety',
    '',
    'This audit only reads public pages. It does not modify the website, Booking, Airbnb, calendars, Google Sheets, or any external service.',
    '',
  );
  return lines.join('\n');
};

const main = async () => {
  const baseUrl = normalizeBaseUrl(getArgument('--base-url', process.env.BASE_URL || DEFAULT_BASE_URL));
  const outputDirectory = getArgument('--output-dir', process.env.AUDIT_OUTPUT_DIR || DEFAULT_OUTPUT_DIRECTORY);
  const browser = await chromium.launch({ headless: true });

  try {
    const pages = [];
    for (const spec of PAGE_SPECS) {
      pages.push(await auditPage({ browser, baseUrl, spec }));
    }

    const { tasks, notices } = classifyResults(pages);
    const report = {
      auditVersion: AUDIT_VERSION,
      generatedAt: new Date().toISOString(),
      baseUrl,
      mode: 'READ_ONLY',
      pages,
      tasks,
      notices,
      summary: {
        checkedPages: pages.length,
        uniqueTasks: tasks.length,
        technicalNotices: notices.length,
        includesGermanPage: pages.some((page) => page.route === '/de/'),
      },
    };

    await mkdir(outputDirectory, { recursive: true });
    const jsonPath = path.join(outputDirectory, 'seo-audit.json');
    const markdownPath = path.join(outputDirectory, 'seo-audit.md');
    await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    await writeFile(markdownPath, buildMarkdown(report), 'utf8');

    console.log(JSON.stringify(report.summary));
    console.log(`JSON report: ${jsonPath}`);
    console.log(`Markdown report: ${markdownPath}`);
  } finally {
    await browser.close();
  }
};

main().catch((error) => {
  console.error('SEO audit execution failed:', error);
  process.exitCode = 1;
});
