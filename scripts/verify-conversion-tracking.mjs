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
      pages++;
    }
  }
}
verify('dist');
if (readFileSync('public/conversion-tracking.js', 'utf8') !== readFileSync('dist/conversion-tracking.js', 'utf8')) {
  throw new Error('Built conversion tracker differs from source');
}
console.log(`CONVERSION TRACKING VERIFY PASS: ${pages} HTML pages`);
