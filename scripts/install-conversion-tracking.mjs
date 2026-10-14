import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const script = '<script defer src="/conversion-tracking.js"></script>';
function install(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) install(file);
    else if (file.endsWith('.html')) {
      let html = readFileSync(file, 'utf8');
      if (!html.includes('</head>')) throw new Error(`Missing head: ${file}`);
      if (!html.includes('src="/conversion-tracking.js"')) {
        html = html.replace('</head>', `${script}</head>`);
      }
      if (html.includes('data-stay-inquiry') && !html.includes('src="/stay-inquiry.js"')) {
        html = html.replace('</head>', '<script defer src="/stay-inquiry.js"></script></head>');
      }
      writeFileSync(file, html);
    }
  }
}
install('dist');
