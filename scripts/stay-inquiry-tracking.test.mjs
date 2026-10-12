import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const tracker = readFileSync('public/conversion-tracking.js', 'utf8');
const inquiry = readFileSync('public/stay-inquiry.js', 'utf8');
const FORM_CLICK = 'guide_stay_inquiry_whatsapp_click';

function harness(language = 'it', formFirst = true) {
  const calls = [], handlers = new Map(), submitted = [];
  const field = value => ({ value, validationMessage: '', addEventListener() {},
    setCustomValidity(message) { this.validationMessage = message; } });
  const form = {
    dataset: { language }, elements: { arrival: field('2026-10-20'), departure: field('2026-10-27'), guests: field('4') },
    addEventListener(type, fn) { if (type === 'submit') submitted.push(fn); },
    reportValidity() { return !!this.elements.arrival.value && !!this.elements.departure.value && !this.elements.departure.validationMessage; },
    appendChild(link) { link.form = this; },
  };
  const window = { location: { href: 'https://scaleastay.com/it/spiagge-scalea/',
    origin: 'https://scaleastay.com', pathname: '/it/spiagge-scalea/' }, gtag: (...args) => calls.push(args) };
  const document = {
    documentElement: { lang: language },
    querySelectorAll: () => [form],
    querySelector: () => form.dataset.stayInquiryTracking === '1' ? form : null,
    addEventListener(type, fn) { const list = handlers.get(type) || []; list.push(fn); handlers.set(type, list); },
    dispatchEvent(event) { (handlers.get(event.type) || []).forEach(fn => fn(event)); },
    createElement() {
      const attrs = {};
      const link = { setAttribute: (k, v) => { attrs[k] = v; }, getAttribute: k => attrs[k] || null,
        closest: selector => selector === 'a[href]' ? link : selector === 'form[data-stay-inquiry]' ? link.form || null : null,
        click: () => document.dispatchEvent({ type: 'click', target: link }), remove() {} };
      return link;
    },
  };
  const context = vm.createContext({ window, document, URL, Date, CustomEvent: class { constructor(type) { this.type = type; } } });
  for (const code of formFirst ? [inquiry, tracker] : [tracker, inquiry]) vm.runInContext(code, context);
  return { calls, context, form, submit() { submitted.forEach(fn => fn({ preventDefault() {} })); },
    direct(attrs = {}, inside = false) {
      const link = document.createElement('a'); link.href = 'https://wa.me/420774620060?text=private';
      for (const [key, value] of Object.entries(attrs)) link.setAttribute(key, value);
      if (inside) link.form = form;
      link.click();
    } };
}

test('valid Italian and Polish forms emit one total and one subset, without dates or message text', () => {
  for (const lang of ['it', 'pl']) {
    const h = harness(lang); h.submit();
    assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 1);
    assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1);
    assert.equal(h.calls.find(c => c[1] === FORM_CLICK)[2].source, 'guide_stay_inquiry');
    assert.doesNotMatch(JSON.stringify(h.calls), /2026-10-20|2026-10-27|Arrivo|Przyjazd|420774620060|text=/);
  }
});
test('empty, equal and reversed dates do not count a form transition', () => {
  for (const [arrival, departure] of [['', '2026-10-27'], ['2026-10-20', '2026-10-20'], ['2026-10-27', '2026-10-20']]) {
    const h = harness(); h.form.elements.arrival.value = arrival; h.form.elements.departure.value = departure; h.submit();
    assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click' || c[1] === FORM_CLICK).length, 0);
  }
});
test('direct-write and other buttons never count as form submissions, even with the shared source', () => {
  const h = harness();
  h.direct({ 'data-analytics-source': 'guide_stay_inquiry' });
  h.direct({ 'data-analytics-source': 'hero' });
  h.direct({ 'data-analytics-source': 'guide_stay_inquiry', 'data-stay-inquiry-submit': 'true' });
  assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 3);
  assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 0);
});
test('either deferred-script order reports readiness once and repeated initialization cannot double-count', () => {
  for (const formFirst of [true, false]) {
    const h = harness('it', formFirst);
    vm.runInContext(inquiry, h.context); vm.runInContext(tracker, h.context); h.submit();
    assert.equal(h.calls.filter(c => c[1] === 'guide_stay_inquiry_ready').length, 1);
    assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 1);
    assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1);
  }
});
