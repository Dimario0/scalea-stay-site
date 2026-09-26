import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, readdirSync } from 'node:fs';
const code = readFileSync('public/conversion-tracking.js', 'utf8');
const legacy = readFileSync('index.html', 'utf8').match(/<!-- ScaleaStay GA4 event tracking[\s\S]*?<script>([\s\S]*?)<\/script>/)[1];
function harness(existingTag = true) {
  const calls = [], listeners = [], scripts = [];
  const window = {
    location: { href: 'https://scaleastay.com/it/', origin: 'https://scaleastay.com', pathname: '/it/' },
    addEventListener() {},
  };
  if (existingTag) window.gtag = (...args) => calls.push(args);
  const document = {
    documentElement: { lang: 'it' },
    head: { appendChild: s => scripts.push(s) },
    createElement: () => ({}),
    querySelectorAll: () => [],
    addEventListener: (type, fn) => { if (type === 'click') listeners.push(fn); },
  };
  const context = vm.createContext({ window, document, URL, setTimeout() {} });
  vm.runInContext(legacy, context);
  vm.runInContext(code, context);
  function click(href, attrs = {}) {
    const link = {
      href, innerText: 'Ask for dates', parentNode: document,
      getAttribute: name => name === 'href' ? href : attrs[name] || null,
      hasAttribute: name => name in attrs,
      matches: s => s === 'a',
      closest: s => s === 'a[href]' ? link : null,
    };
    const target = { closest: () => link, parentNode: link };
    listeners.forEach(fn => fn({ target }));
  }
  return { window, context, calls, scripts, click, listeners };
}
test('existing tag: one WhatsApp event per click, even after repeated initialization', () => {
  const h = harness();
  vm.runInContext(code, h.context);
  h.click('https://wa.me/420774620060?text=private-message', { 'data-analytics-source': 'hero' });
  assert.equal(h.scripts.length, 0);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0][1], 'whatsapp_click');
  assert.equal(h.calls[0][2].source, 'hero');
  assert.equal(h.calls[0][2].tracking_version, '2');
  assert.ok(!JSON.stringify(h.calls).includes('private-message'));
  h.click('https://wa.me/420774620060');
  assert.equal(h.calls.length, 2, 'separate intentional clicks must remain measurable');
});
test('standalone guide initializes Google tag once and queues clicks', () => {
  const h = harness(false);
  vm.runInContext(code, h.context);
  h.click('https://api.whatsapp.com/send?phone=420774620060');
  assert.equal(h.scripts.length, 1);
  const queued = h.window.dataLayer.map(x => Array.from(x));
  assert.equal(queued.filter(x => x[0] === 'config').length, 1);
  assert.equal(queued.filter(x => x[1] === 'whatsapp_click').length, 1);
});
test('all supported WhatsApp hosts are measured once', () => {
  for (const host of ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com']) {
    const h = harness(); h.click(`https://${host}/send`);
    assert.equal(h.calls.filter(x => x[1] === 'whatsapp_click').length, 1);
  }
});
test('lookalike domains and unrelated links are not WhatsApp conversions', () => {
  const h = harness();
  for (const url of ['https://wa.me.evil.example/', 'https://example.com/?whatsapp=yes', '#faq']) h.click(url);
  assert.equal(h.calls.filter(x => x[1] === 'whatsapp_click').length, 0);
});
test('apartment links are measured separately from outbound contact', () => {
  const h = harness();
  h.click('https://scaleastay.com/it/appartamento-scalea-vicino-mare/');
  h.click('https://scaleastay.com/it/#apartments');
  assert.equal(h.calls.filter(x => x[1] === 'apartment_link_click').length, 2);
  assert.equal(h.calls.filter(x => x[1] === 'whatsapp_click').length, 0);
});
test('manual telephone handling is not repeated by the legacy listener', () => {
  const h = harness(); h.click('tel:+420774620060', { 'data-analytics-manual': 'true' });
  assert.equal(h.calls.length, 0);
});
test('trailing slash is normalized and static landing source survives', () => {
  const h = harness(); h.window.location.pathname = '/pl';
  h.click('https://wa.me/420774620060', { 'data-source': 'long_stay_landing' });
  assert.equal(h.calls[0][2].page_path, '/pl/');
  assert.equal(h.calls[0][2].source, 'long_stay_landing');
});
test('React components cannot reintroduce manual WhatsApp or overlapping booking counts', () => {
  const files = readdirSync('src/components').filter(f => f.endsWith('.tsx')).map(f => `src/components/${f}`);
  for (const file of [...files, 'src/App.tsx']) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /trackEvent\(['"](?:whatsapp_click|booking_button_click)['"]/, file);
  }
});
