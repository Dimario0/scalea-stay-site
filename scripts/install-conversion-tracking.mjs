import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const script = '<script defer src="/conversion-tracking.js"></script>';
function install(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) install(file);
    else if (file.endsWith('.html')) {
      const html = readFileSync(file, 'utf8');
      if (!html.includes('src="/conversion-tracking.js"')) {
        if (!html.includes('</head>')) throw new Error(`Missing head: ${file}`);
        writeFileSync(file, html.replace('</head>', `${script}</head>`));
      }
    }
  }
}
install('dist');
