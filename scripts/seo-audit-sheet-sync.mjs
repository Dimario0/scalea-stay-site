import { createSign } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import process from 'node:process';

const RUNS_SHEET = 'seo_audit_runs';
const PAGES_SHEET = 'seo_audit_pages';
const AGENT_REPORTS_SHEET = 'seo_agent_reports';
const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const DEFAULT_TOKEN_URI = 'https://oauth2.googleapis.com/token';

const RUN_HEADERS = [
  'recorded_at_utc',
  'audit_generated_at',
  'environment',
  'base_url',
  'canonical_origin',
  'checked_pages',
  'unique_tasks',
  'technical_notices',
  'root_canonical_policy',
  'audit_version',
  'github_run_id',
  'commit_sha',
  'workflow_event',
  'repository',
  'tasks_json',
  'notices_json',
];

const PAGE_HEADERS = [
  'recorded_at_utc',
  'audit_generated_at',
  'environment',
  'route',
  'page_url',
  'status_code',
  'raw_h1_count',
  'rendered_h1_count',
  'visible_h1_count',
  'language',
  'canonical',
  'expected_canonical',
  'robots',
  'task_types',
  'notice_types',
  'audit_version',
  'github_run_id',
  'commit_sha',
  'repository',
];

const AGENT_REPORT_HEADERS = [
  'recorded_at_utc',
  'report_generated_at',
  'status',
  'headline',
  'recommended_action',
  'production_tasks',
  'preview_tasks',
  'resolved_in_preview',
  'h1_status',
  'production_checked_pages',
  'preview_checked_pages',
  'audit_version',
  'github_run_id',
  'commit_sha',
  'workflow_event',
  'repository',
  'report_json',
];

const getArgument = (name, fallback = '') => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};

const hasFlag = (name) => process.argv.includes(name);

const requiredArgument = (name, fallback = '') => {
  const value = getArgument(name, fallback);
  if (!value) throw new Error(`Missing required argument: ${name}`);
  return value;
};

const base64Url = (value) => Buffer.from(value)
  .toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

const parseServiceAccount = (rawValue) => {
  if (!rawValue?.trim()) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is empty or missing.');
  }

  const candidates = [rawValue.trim()];
  try {
    candidates.push(Buffer.from(rawValue.trim(), 'base64').toString('utf8'));
  } catch {
    // The direct JSON candidate below will still be attempted.
  }

  for (const candidate of candidates) {
    try {
      const credentials = JSON.parse(candidate);
      if (credentials.client_email && credentials.private_key) {
        return {
          ...credentials,
          private_key: credentials.private_key.replace(/\\n/g, '\n'),
        };
      }
    } catch {
      // Try the next representation.
    }
  }

  throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid service-account JSON or base64-encoded JSON.');
};

const getAccessToken = async (credentials) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64Url(JSON.stringify({
    iss: credentials.client_email,
    scope: SHEETS_SCOPE,
    aud: credentials.token_uri || DEFAULT_TOKEN_URI,
    iat: now,
    exp: now + 3600,
  }));
  const unsignedJwt = `${header}.${claim}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(credentials.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch(credentials.token_uri || DEFAULT_TOKEN_URI, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    throw new Error(`Google OAuth token request failed (${response.status}): ${JSON.stringify(payload)}`);
  }
  return payload.access_token;
};

const sheetsRequest = async (accessToken, url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Google Sheets API request failed (${response.status}): ${JSON.stringify(payload)}`);
  }
  return payload;
};

const valuesUrl = (spreadsheetId, range, suffix = '') => (
  `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}`
  + `/values/${encodeURIComponent(range)}${suffix}`
);

const columnName = (columnCount) => {
  let value = columnCount;
  let result = '';
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
};

const getValues = async (accessToken, spreadsheetId, range) => {
  const payload = await sheetsRequest(accessToken, valuesUrl(spreadsheetId, range));
  return payload.values || [];
};

const updateValues = async (accessToken, spreadsheetId, range, values) => {
  await sheetsRequest(
    accessToken,
    `${valuesUrl(spreadsheetId, range)}?valueInputOption=RAW`,
    { method: 'PUT', body: JSON.stringify({ range, majorDimension: 'ROWS', values }) },
  );
};

const appendValues = async (accessToken, spreadsheetId, range, values) => {
  if (values.length === 0) return;
  await sheetsRequest(
    accessToken,
    `${valuesUrl(spreadsheetId, range, ':append')}?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: 'POST', body: JSON.stringify({ range, majorDimension: 'ROWS', values }) },
  );
};

const sheetDefinitions = [
  { title: RUNS_SHEET, headers: RUN_HEADERS, rowCount: 2000 },
  { title: PAGES_SHEET, headers: PAGE_HEADERS, rowCount: 5000 },
  { title: AGENT_REPORTS_SHEET, headers: AGENT_REPORT_HEADERS, rowCount: 2000 },
];

const ensureSheets = async (accessToken, spreadsheetId) => {
  const metadata = await sheetsRequest(
    accessToken,
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}?fields=sheets.properties`,
  );
  const titles = new Set((metadata.sheets || []).map((sheet) => sheet.properties?.title));
  const missing = sheetDefinitions.filter(({ title }) => !titles.has(title));

  if (missing.length > 0) {
    await sheetsRequest(
      accessToken,
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}:batchUpdate`,
      {
        method: 'POST',
        body: JSON.stringify({
          requests: missing.map(({ title, headers, rowCount }) => ({
            addSheet: {
              properties: {
                title,
                gridProperties: {
                  rowCount,
                  columnCount: headers.length,
                  frozenRowCount: 1,
                },
              },
            },
          })),
        }),
      },
    );
  }

  for (const { title, headers } of sheetDefinitions) {
    const headerRange = `${title}!A1:${columnName(headers.length)}1`;
    const current = await getValues(accessToken, spreadsheetId, headerRange);
    const currentHeaders = current[0] || [];
    if (currentHeaders.length === 0) {
      await updateValues(accessToken, spreadsheetId, headerRange, [headers]);
      continue;
    }
    if (JSON.stringify(currentHeaders) !== JSON.stringify(headers)) {
      throw new Error(
        `Unexpected header schema in ${title}. Expected ${JSON.stringify(headers)}, got ${JSON.stringify(currentHeaders)}.`,
      );
    }
  }
};

const typesForRoute = (items, route) => items
  .filter((item) => Array.isArray(item.pages) && item.pages.includes(route))
  .map((item) => item.type)
  .filter(Boolean)
  .sort()
  .join(',');

const buildRows = (report, context) => {
  if (!Array.isArray(report.pages) || report.pages.length === 0) {
    throw new Error('Audit report contains no page results.');
  }

  const recordedAt = new Date().toISOString();
  const runRow = [
    recordedAt,
    report.generatedAt || '',
    context.environment,
    report.baseUrl || '',
    report.canonicalOrigin || '',
    Number(report.summary?.checkedPages ?? report.pages.length),
    Number(report.summary?.uniqueTasks ?? report.tasks?.length ?? 0),
    Number(report.summary?.technicalNotices ?? report.notices?.length ?? 0),
    report.summary?.rootCanonicalPolicy || '',
    report.auditVersion || '',
    context.runId,
    context.commitSha,
    context.workflowEvent,
    context.repository,
    JSON.stringify(report.tasks || []),
    JSON.stringify(report.notices || []),
  ];

  const pageRows = report.pages.map((page) => [
    recordedAt,
    report.generatedAt || '',
    context.environment,
    page.route || '',
    page.rendered?.finalUrl || page.raw?.finalUrl || page.url || '',
    Number(page.rendered?.statusCode ?? page.raw?.statusCode ?? 0),
    Number(page.raw?.h1Texts?.length ?? 0),
    Number(page.rendered?.h1Texts?.length ?? 0),
    Number(page.rendered?.visibleH1Texts?.length ?? 0),
    page.rendered?.language || page.raw?.language || '',
    page.rendered?.canonical || page.raw?.canonical || '',
    page.expectedCanonical || (page.allowedCanonicals || []).join('|'),
    page.rendered?.robots || page.raw?.robots || '',
    typesForRoute(report.tasks || [], page.route),
    typesForRoute(report.notices || [], page.route),
    report.auditVersion || '',
    context.runId,
    context.commitSha,
    context.repository,
  ]);

  return { runRow, pageRows };
};

const buildAgentReportRow = (report, context) => [
  new Date().toISOString(),
  report.generatedAt || '',
  report.status || '',
  report.headline || '',
  report.recommendedAction || '',
  Number(report.environments?.production?.taskCount ?? 0),
  Number(report.environments?.preview?.taskCount ?? 0),
  Number(report.deploymentDelta?.resolvedInPreview?.length ?? 0),
  report.h1?.status || '',
  Number(report.environments?.production?.checkedPages ?? 0),
  Number(report.environments?.preview?.checkedPages ?? 0),
  report.sourceAuditVersion || '',
  context.runId,
  context.commitSha,
  context.workflowEvent,
  context.repository,
  JSON.stringify(report),
];

const syncReport = async ({ accessToken, spreadsheetId, report, context, dryRun }) => {
  const { runRow, pageRows } = buildRows(report, context);

  if (dryRun) {
    console.log(JSON.stringify({ runRow, pageRows }, null, 2));
    return { status: 'DRY_RUN', appendedPages: 0 };
  }

  await ensureSheets(accessToken, spreadsheetId);

  const runValues = await getValues(accessToken, spreadsheetId, `${RUNS_SHEET}!A2:P`);
  const runExists = runValues.some((row) => (
    String(row[2] || '') === context.environment && String(row[10] || '') === context.runId
  ));

  const pageValues = await getValues(accessToken, spreadsheetId, `${PAGES_SHEET}!C2:Q`);
  const existingPageKeys = new Set(pageValues.map((row) => (
    `${String(row[0] || '')}|${String(row[14] || '')}|${String(row[1] || '')}`
  )));
  const missingPageRows = pageRows.filter((row) => (
    !existingPageKeys.has(`${context.environment}|${context.runId}|${String(row[3] || '')}`)
  ));

  await appendValues(accessToken, spreadsheetId, `${PAGES_SHEET}!A:S`, missingPageRows);
  if (!runExists) {
    await appendValues(accessToken, spreadsheetId, `${RUNS_SHEET}!A:P`, [runRow]);
  }

  return {
    status: runExists && missingPageRows.length === 0 ? 'ALREADY_RECORDED' : 'RECORDED',
    appendedPages: missingPageRows.length,
    appendedRun: !runExists,
  };
};

const syncAgentReport = async ({ accessToken, spreadsheetId, report, context, dryRun }) => {
  const reportRow = buildAgentReportRow(report, context);

  if (dryRun) {
    console.log(JSON.stringify({ agentReportRow: reportRow }, null, 2));
    return { status: 'DRY_RUN', appendedReport: false };
  }

  await ensureSheets(accessToken, spreadsheetId);
  const reportValues = await getValues(accessToken, spreadsheetId, `${AGENT_REPORTS_SHEET}!A2:Q`);
  const reportExists = reportValues.some((row) => String(row[12] || '') === context.runId);

  if (!reportExists) {
    await appendValues(accessToken, spreadsheetId, `${AGENT_REPORTS_SHEET}!A:Q`, [reportRow]);
  }

  return {
    status: reportExists ? 'ALREADY_RECORDED' : 'RECORDED',
    appendedReport: !reportExists,
  };
};

const main = async () => {
  const spreadsheetId = requiredArgument('--spreadsheet-id', process.env.SCALEASTAY_SEO_SHEET_ID || '');
  const dryRun = hasFlag('--dry-run');
  const agentReportPath = getArgument('--agent-report');
  const context = {
    runId: getArgument('--run-id', process.env.GITHUB_RUN_ID || 'local'),
    commitSha: getArgument('--commit-sha', process.env.GITHUB_SHA || 'local'),
    workflowEvent: getArgument('--workflow-event', process.env.GITHUB_EVENT_NAME || 'local'),
    repository: getArgument('--repository', process.env.GITHUB_REPOSITORY || 'Dimario0/scalea-stay-site'),
  };

  let accessToken = '';
  if (!dryRun) {
    const credentials = parseServiceAccount(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '');
    accessToken = await getAccessToken(credentials);
  }

  if (agentReportPath) {
    const agentReport = JSON.parse(await readFile(agentReportPath, 'utf8'));
    const result = await syncAgentReport({ accessToken, spreadsheetId, report: agentReport, context, dryRun });
    console.log(JSON.stringify({
      agentReportSheetSync: result.status,
      runId: context.runId,
      appendedReport: result.appendedReport,
    }));
    return;
  }

  const reportPath = requiredArgument('--report');
  const environment = requiredArgument('--environment');
  const report = JSON.parse(await readFile(reportPath, 'utf8'));
  const result = await syncReport({
    accessToken,
    spreadsheetId,
    report,
    context: { ...context, environment },
    dryRun,
  });
  console.log(JSON.stringify({
    sheetSync: result.status,
    environment,
    runId: context.runId,
    appendedPages: result.appendedPages,
    appendedRun: result.appendedRun ?? false,
  }));
};

main().catch((error) => {
  console.error(`ScaleaStay SEO sheet sync failed: ${error.message}`);
  process.exitCode = 1;
});
