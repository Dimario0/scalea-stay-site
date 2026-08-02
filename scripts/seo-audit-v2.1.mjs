import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const AUDIT_VERSION = '2.1.1';

const getArgument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
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

const expectedCanonicalForRoute = (canonicalOrigin, route) => (
  route === '/' ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`
);

const buildMarkdown = (report) => {
  const lines = [
    `# ScaleaStay SEO Audit V${report.auditVersion}`,
    '',
    `- Generated: ${report.generatedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Canonical origin: ${report.canonicalOrigin}`,
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
  const baseUrl = normalizeBaseUrl(getArgument('--base-url', process.env.BASE_URL || 'https://scaleastay.com'));
  const canonicalOrigin = normalizeBaseUrl(getArgument('--canonical-origin', process.env.CANONICAL_ORIGIN || baseUrl));
  const outputDirectory = getArgument('--output-dir', process.env.AUDIT_OUTPUT_DIR || 'artifacts');

  const { stdout, stderr } = await execFileAsync(
    process.execPath,
    ['scripts/seo-audit.mjs', '--base-url', baseUrl, '--output-dir', outputDirectory],
    { maxBuffer: 10 * 1024 * 1024 },
  );
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  const jsonPath = path.join(outputDirectory, 'seo-audit.json');
  const markdownPath = path.join(outputDirectory, 'seo-audit.md');
  const report = JSON.parse(await readFile(jsonPath, 'utf8'));
  const pagesByRoute = new Map(report.pages.map((page) => [page.route, page]));

  report.tasks = report.tasks
    .map((task) => {
      if (task.type !== 'CANONICAL_MISMATCH') return task;

      const unresolvedPages = task.pages.filter((route) => {
        const page = pagesByRoute.get(route);
        if (!page?.rendered?.canonical) return true;

        const actual = normalizeComparableUrl(page.rendered.canonical);
        if (route === '/') {
          const allowed = [`${canonicalOrigin}/`, `${canonicalOrigin}/ru/`]
            .map(normalizeComparableUrl);
          page.allowedCanonicals = [`${canonicalOrigin}/`, `${canonicalOrigin}/ru/`];
          return !allowed.includes(actual);
        }

        page.expectedCanonical = expectedCanonicalForRoute(canonicalOrigin, route);
        return actual !== normalizeComparableUrl(page.expectedCanonical);
      });

      return { ...task, pages: unresolvedPages };
    })
    .filter((task) => task.pages.length > 0);

  const rootPage = pagesByRoute.get('/');
  const allowedRootCanonicals = [`${canonicalOrigin}/`, `${canonicalOrigin}/ru/`]
    .map(normalizeComparableUrl);
  const rootCanonicalIsAllowed = rootPage
    ? allowedRootCanonicals.includes(normalizeComparableUrl(rootPage.rendered?.canonical))
    : false;

  if (rootPage) {
    rootPage.allowedCanonicals = [`${canonicalOrigin}/`, `${canonicalOrigin}/ru/`];
  }

  report.auditVersion = AUDIT_VERSION;
  report.canonicalOrigin = canonicalOrigin;
  report.summary.uniqueTasks = report.tasks.length;
  report.summary.rootCanonicalPolicy = rootCanonicalIsAllowed ? 'PASS' : 'FAIL';
  report.summary.canonicalOrigin = canonicalOrigin;

  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(markdownPath, buildMarkdown(report), 'utf8');

  console.log(JSON.stringify(report.summary));
  console.log(`Normalized JSON report: ${jsonPath}`);
  console.log(`Normalized Markdown report: ${markdownPath}`);
};

main().catch((error) => {
  console.error('SEO audit V2.1 normalization failed:', error);
  process.exitCode = 1;
});
