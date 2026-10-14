import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
let pages = 0;
function verify(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) verify(file);
    else if (file.endsWith('.html')) {
      const html = readFileSync(file, 'utf8');
      const count = (html.match(/src="\/conversion-tracking\.js"/g) || []).length;
      if (count !== 1) throw new Error(`${file}: expected one conversion tracker, got ${count}`);
      if (html.includes('data-stay-inquiry')) {
        const handlers = (html.match(/src="\/stay-inquiry\.js"/g) || []).length;
        if (handlers !== 1) throw new Error(`${file}: expected one date inquiry handler, got ${handlers}`);
      }
      pages++;
    }
  }
}
verify('dist');
for (const route of ['it/appartamento-scalea-vicino-mare', 'pl/apartament-scalea-blisko-morza']) {
  const html = readFileSync(`dist/${route}/index.html`, 'utf8');
  if (!html.includes('data-analytics-source="apartment_stay_inquiry"') || !html.includes('src="/images/scaleastay-terrace-seating.jpg"')) {
    throw new Error(`${route}: missing apartment date form or terrace photo`);
  }
}
if (readFileSync('public/conversion-tracking.js', 'utf8') !== readFileSync('dist/conversion-tracking.js', 'utf8')) {
  throw new Error('Built conversion tracker differs from source');
}
if (readFileSync('public/stay-inquiry.js', 'utf8') !== readFileSync('dist/stay-inquiry.js', 'utf8')) {
  throw new Error('Built stay inquiry handler differs from source');
}
console.log(`CONVERSION TRACKING VERIFY PASS: ${pages} HTML pages`);
