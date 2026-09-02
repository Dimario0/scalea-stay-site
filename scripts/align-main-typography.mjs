import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const pagePath = path.join(ROOT, 'dist', 'it', 'dove-mangiare-scalea', 'index.html');
let html = readFileSync(pagePath, 'utf8');

const fontLinks = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"></noscript>`;

const typographyCss = `
    /* Match the production ScaleaStay typography tokens exactly. */
    body,p,a,span,div,summary{font-family:"Roboto",ui-sans-serif,system-ui,sans-serif}
    h1,h2,h3{font-family:"Playfair Display",ui-serif,Georgia,serif!important;font-weight:700!important}`;

if (!html.includes('fonts.googleapis.com/css2?family=Playfair+Display')) {
  html = html.replace('  <style>', `${fontLinks}\n  <style>`);
}

if (!html.includes('Match the production ScaleaStay typography tokens exactly.')) {
  html = html.replace('  </style>', `${typographyCss}\n  </style>`);
}

if (!html.includes('font-family:"Playfair Display"')) throw new Error('Playfair heading typography was not applied');
if (!html.includes('font-family:"Roboto"')) throw new Error('Roboto body typography was not applied');

writeFileSync(pagePath, html, 'utf8');
console.log('MAIN SITE TYPOGRAPHY ALIGNMENT: PASS');
