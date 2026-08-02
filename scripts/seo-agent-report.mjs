import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const REPORT_VERSION = '1.0.0';
const arg = (name, fallback = '') => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};
const required = (name) => {
  const value = arg(name);
  if (!value) throw new Error(`Missing required argument: ${name}`);
  return value;
};
const list = (value) => (Array.isArray(value) ? value : []);
const countPriority = (tasks, priority) => tasks.filter((task) => task.priority === priority).length;
const taskCountText = (count) => {
  const value = Number(count || 0);
  const mod100 = value % 100;
  const mod10 = value % 10;
  const noun = mod100 >= 11 && mod100 <= 14 ? 'задач' : mod10 === 1 ? 'задача' : mod10 >= 2 && mod10 <= 4 ? 'задачи' : 'задач';
  return `${value} ${noun}`;
};

const environmentSummary = (report, name) => {
  if (!report) return null;
  const tasks = list(report.tasks);
  const notices = list(report.notices);
  const pages = list(report.pages);
  return {
    name,
    baseUrl: report.baseUrl || '',
    auditVersion: report.auditVersion || '',
    generatedAt: report.generatedAt || '',
    checkedPages: Number(report.summary?.checkedPages ?? pages.length),
    taskCount: tasks.length,
    highTasks: countPriority(tasks, 'HIGH'),
    mediumTasks: countPriority(tasks, 'MEDIUM'),
    lowTasks: countPriority(tasks, 'LOW'),
    technicalNoticeCount: notices.length,
    rootCanonicalPolicy: report.summary?.rootCanonicalPolicy || '',
    tasks,
    notices,
    pages,
  };
};

const flattenTasks = (tasks) => list(tasks).flatMap((task) => {
  const pages = list(task.pages);
  return (pages.length ? pages : ['']).map((page) => ({
    type: task.type || 'UNKNOWN',
    priority: task.priority || 'INFO',
    message: task.message || '',
    page,
  }));
});
const entryKey = (entry) => `${entry.type}|${entry.page}`;
const groupEntries = (entries) => {
  const groups = new Map();
  for (const entry of entries) {
    const key = `${entry.type}|${entry.priority}|${entry.message}`;
    if (!groups.has(key)) groups.set(key, { type: entry.type, priority: entry.priority, message: entry.message, pages: [] });
    if (entry.page && !groups.get(key).pages.includes(entry.page)) groups.get(key).pages.push(entry.page);
  }
  return [...groups.values()].map((group) => ({ ...group, pages: group.pages.sort() }));
};

const compareReports = (production, preview) => {
  if (!preview) return { previewAvailable: false, resolvedInPreview: [], stillPresentInPreview: [], introducedInPreview: [] };
  const productionEntries = flattenTasks(production?.tasks);
  const previewEntries = flattenTasks(preview.tasks);
  const productionKeys = new Set(productionEntries.map(entryKey));
  const previewKeys = new Set(previewEntries.map(entryKey));
  return {
    previewAvailable: true,
    resolvedInPreview: groupEntries(productionEntries.filter((entry) => !previewKeys.has(entryKey(entry)))),
    stillPresentInPreview: groupEntries(productionEntries.filter((entry) => previewKeys.has(entryKey(entry)))),
    introducedInPreview: groupEntries(previewEntries.filter((entry) => !productionKeys.has(entryKey(entry)))),
  };
};

const h1Assessment = (environment) => {
  if (!environment) return null;
  const confirmedPages = [];
  const rawHtmlOnlyPages = [];
  const failurePages = [];
  for (const page of environment.pages) {
    const route = page.route || page.url || '';
    const rawCount = Number(page.raw?.h1Texts?.length ?? 0);
    const renderedCount = Number(page.rendered?.h1Texts?.length ?? 0);
    const visibleCount = Number(page.rendered?.visibleH1Texts?.length ?? 0);
    if (renderedCount === 1 && visibleCount === 1) {
      confirmedPages.push(route);
      if (rawCount === 0) rawHtmlOnlyPages.push(route);
    } else {
      failurePages.push({ route, rawCount, renderedCount, visibleCount });
    }
  }
  return {
    status: failurePages.length ? 'FAIL' : 'PASS',
    checkedPages: environment.pages.length,
    confirmedPages,
    rawHtmlOnlyPages,
    failurePages,
    explanation: failurePages.length
      ? 'На части страниц после выполнения JavaScript не подтверждён ровно один видимый H1.'
      : 'После выполнения JavaScript на каждой странице подтверждён ровно один видимый H1. Отсутствие H1 в исходном HTML React/Vite не считается ошибкой.',
  };
};

const statusText = (status, production, preview, delta) => {
  if (status === 'ACTION_REQUIRED') {
    const active = preview || production;
    return {
      headline: `Требуют исправления: ${taskCountText(active?.taskCount)}.`,
      recommendedAction: 'Не публиковать изменения. Исправить подтверждённые задачи в preview и повторить аудит.',
    };
  }
  if (status === 'READY_FOR_OWNER_REVIEW') {
    return {
      headline: `Preview технически чист. Устранено в preview: ${taskCountText(delta.resolvedInPreview.length)} из production.`,
      recommendedAction: 'Проверить preview визуально и отдельно решить вопрос публикации. Автоматический merge и production deploy запрещены.',
    };
  }
  if (status === 'HEALTHY') {
    return {
      headline: preview ? 'Production и preview не содержат подтверждённых технических SEO-задач.' : 'Production не содержит подтверждённых технических SEO-задач.',
      recommendedAction: 'Сохранять режим наблюдения. Изменения без отдельного подтверждения не требуются.',
    };
  }
  return { headline: 'Недостаточно данных для понятного SEO-отчёта.', recommendedAction: 'Повторить аудит и проверить наличие JSON-отчётов.' };
};

const compactEnvironment = (environment) => environment && ({
  name: environment.name,
  baseUrl: environment.baseUrl,
  generatedAt: environment.generatedAt,
  checkedPages: environment.checkedPages,
  taskCount: environment.taskCount,
  highTasks: environment.highTasks,
  mediumTasks: environment.mediumTasks,
  lowTasks: environment.lowTasks,
  technicalNoticeCount: environment.technicalNoticeCount,
  rootCanonicalPolicy: environment.rootCanonicalPolicy,
});

const buildReport = (productionReport, previewReport) => {
  const production = environmentSummary(productionReport, 'production');
  const preview = environmentSummary(previewReport, 'preview');
  const delta = compareReports(production, preview);
  const productionH1 = h1Assessment(production);
  const previewH1 = h1Assessment(preview);
  const active = preview || production;
  const activeH1 = previewH1 || productionH1;
  const status = !active ? 'NO_DATA' : activeH1?.status === 'FAIL' || active.taskCount > 0 ? 'ACTION_REQUIRED' : preview && production?.taskCount > 0 ? 'READY_FOR_OWNER_REVIEW' : 'HEALTHY';
  const wording = statusText(status, production, preview, delta);
  const rawRenderedPages = new Set();
  for (const environment of [production, preview].filter(Boolean)) {
    for (const notice of environment.notices) {
      if (notice.type === 'JS_RENDERED_ONLY') for (const page of list(notice.pages)) rawRenderedPages.add(page);
    }
  }
  const ignoredTechnicalSignals = rawRenderedPages.size ? [{
    type: 'JS_RENDERED_ONLY',
    pages: [...rawRenderedPages].sort(),
    explanation: 'H1 отсутствует в исходном HTML, но подтверждён после выполнения JavaScript. Для React/Vite это наблюдение, а не ошибка.',
  }] : [];
  return {
    reportVersion: REPORT_VERSION,
    generatedAt: new Date().toISOString(),
    sourceAuditVersion: preview?.auditVersion || production?.auditVersion || '',
    status,
    headline: wording.headline,
    recommendedAction: wording.recommendedAction,
    actionableTasks: active?.tasks || [],
    environments: { production: compactEnvironment(production), preview: compactEnvironment(preview) },
    h1: { status: activeH1?.status || 'NO_DATA', production: productionH1, preview: previewH1 },
    deploymentDelta: delta,
    ignoredTechnicalSignals,
    safety: { readOnly: true, autoPublish: false, protectedSystems: ['website', 'prices', 'Booking', 'Airbnb', 'calendar'] },
  };
};

const markdown = (report) => {
  const lines = [
    '# ScaleaStay — понятный отчёт SEO Agent', '',
    `**Статус:** ${report.status}`, '',
    `**Главное:** ${report.headline}`, '',
    '## Решение для владельца', '', report.recommendedAction, '',
    '## Подтверждённые задачи', '',
  ];
  if (!report.actionableTasks.length) lines.push('В активной preview-версии подтверждённых SEO-задач нет.');
  else report.actionableTasks.forEach((task, index) => {
    lines.push(`${index + 1}. **${task.priority} ${task.type}** — ${task.message}`);
    lines.push(`   Страницы: ${list(task.pages).join(', ') || '—'}`);
  });
  lines.push('', '## Проверка H1', '');
  for (const [name, result] of [['Production', report.h1.production], ['Preview', report.h1.preview]]) {
    if (!result) continue;
    lines.push(`- **${name}: ${result.status}** — ${result.explanation}`);
    if (result.rawHtmlOnlyPages.length) lines.push(`  Raw HTML без H1, но rendered DOM корректен: ${result.rawHtmlOnlyPages.join(', ')}. Это не задача.`);
  }
  lines.push('', '## Production и preview', '', '| Среда | Проверено | Задачи | Тех. уведомления | H1 |', '|---|---:|---:|---:|---|');
  for (const environment of [report.environments.production, report.environments.preview].filter(Boolean)) {
    const h1 = environment.name === 'production' ? report.h1.production : report.h1.preview;
    lines.push(`| ${environment.name} | ${environment.checkedPages} | ${environment.taskCount} | ${environment.technicalNoticeCount} | ${h1?.status || '—'} |`);
  }
  lines.push('', '## Разница между версиями', '');
  if (!report.deploymentDelta.previewAvailable) lines.push('Preview в этом запуске не проверялся.');
  else {
    lines.push(`- Устранено в preview: ${report.deploymentDelta.resolvedInPreview.length}.`);
    lines.push(`- Осталось в preview: ${report.deploymentDelta.stillPresentInPreview.length}.`);
    lines.push(`- Новых задач в preview: ${report.deploymentDelta.introducedInPreview.length}.`);
  }
  lines.push('', '## Технические сигналы', '');
  if (!report.ignoredTechnicalSignals.length) lines.push('Исключённых технических сигналов нет.');
  else for (const signal of report.ignoredTechnicalSignals) lines.push(`- **${signal.type}** — ${signal.explanation}`);
  lines.push('', '## Безопасность', '', 'Отчёт работает в режиме READ-ONLY. Он не меняет сайт, цены, Booking, Airbnb, календарь и не публикует preview в production.', '');
  return lines.join('\n');
};

const main = async () => {
  const productionPath = required('--production-report');
  const previewPath = arg('--preview-report');
  const outputDirectory = arg('--output-dir', 'artifacts/agent');
  const production = JSON.parse(await readFile(productionPath, 'utf8'));
  const preview = previewPath ? JSON.parse(await readFile(previewPath, 'utf8')) : null;
  const report = buildReport(production, preview);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'seo-agent-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  await writeFile(path.join(outputDirectory, 'seo-agent-report.md'), markdown(report), 'utf8');
  console.log(JSON.stringify({ agentReportStatus: report.status, productionTasks: report.environments.production?.taskCount ?? 0, previewTasks: report.environments.preview?.taskCount ?? 0, h1Status: report.h1.status }));
};

main().catch((error) => {
  console.error(`ScaleaStay SEO agent report failed: ${error.message}`);
  process.exitCode = 1;
});
