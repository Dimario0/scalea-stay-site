import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const tracker = readFileSync('public/conversion-tracking.js', 'utf8');
const inquiry = readFileSync('public/stay-inquiry.js', 'utf8');
const FORM_CLICK = 'guide_stay_inquiry_whatsapp_click';

function harness(language = 'it', formFirst = true, { source = 'guide_stay_inquiry', path = '/it/spiagge-scalea/', mounted = true, monthly = false, includeTracker = true, openResult = null } = {}) {
  const calls = [], handlers = new Map(), submitted = [];
  const field = value => ({ value, validationMessage: '', addEventListener() {},
    setCustomValidity(message) { this.validationMessage = message; } });
  let active = mounted;
  const links = [], navigations = [], createdAnchors = [], formEvents = [];
  const form = {
    dataset: { language, ...(monthly ? { minimumStay: 'month', invalidMinimum: 'minimum-month', invalidSeason: 'winter-season', inquiryMessage: 'Winter {arrival} to {departure}, {guests} guests' } : {}) }, elements: { arrival: field('2026-10-20'), departure: field('2026-10-27'), guests: field('4') },
    getAttribute(name) { return name === 'data-analytics-source' ? source : null; },
    addEventListener(type, fn) { if (type === 'submit') submitted.push(fn); },
    reportValidity() { return !!this.elements.arrival.value && !!this.elements.departure.value && !this.elements.departure.validationMessage; },
    matches(selector) {
      return active && (selector === 'form[data-stay-inquiry]' ||
        (selector === 'form[data-stay-inquiry][data-stay-inquiry-tracking="1"]' && this.dataset.stayInquiryTracking === '1'));
    },
    dispatchEvent(event) {
      event.target = this;
      formEvents.push(event);
      if (event.bubbles) document.dispatchEvent(event);
      return true;
    },
    appendChild(link) { link.form = this; },
  };
  const window = { location: { href: 'https://scaleastay.com' + path,
    origin: 'https://scaleastay.com', pathname: path }, gtag: (...args) => calls.push(args),
    open(url, target, features) { navigations.push({ url, target, features }); return openResult; } };
  const document = {
    documentElement: { lang: language },
    querySelectorAll: () => active ? [form] : [],
    querySelector: () => active && form.dataset.stayInquiryTracking === '1' ? form : null,
    addEventListener(type, fn) { const list = handlers.get(type) || []; list.push(fn); handlers.set(type, list); },
    dispatchEvent(event) { event.target ||= document; (handlers.get(event.type) || []).forEach(fn => fn(event)); },
    createElement(tag) {
      const attrs = {};
      const link = { setAttribute: (k, v) => { attrs[k] = v; }, getAttribute: k => attrs[k] || null,
        closest: selector => selector === 'a[href]' ? link : selector === 'form[data-stay-inquiry]' ? link.form || null : null,
        click: () => { links.push(link); document.dispatchEvent({ type: 'click', target: link }); }, remove() {} };
      if (tag === 'a') createdAnchors.push(link);
      return link;
    },
  };
  const context = vm.createContext({ window, document, URL, Date, CustomEvent: class {
    constructor(type, options = {}) { this.type = type; this.bubbles = options.bubbles || false; this.detail = options.detail ?? null; }
  } });
  for (const code of includeTracker ? (formFirst ? [inquiry, tracker] : [tracker, inquiry]) : [inquiry]) vm.runInContext(code, context);
  return { calls, context, form, links, navigations, createdAnchors, formEvents,
    emitFormEvent(target = form) { document.dispatchEvent({ type: 'scaleastay:stay-inquiry-whatsapp', target }); },
    mount() { active = true; document.dispatchEvent({ type: 'scaleastay:stay-inquiry-mount' }); }, submit() { submitted.forEach(fn => fn({ preventDefault() {} })); },
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
    assert.equal(h.calls.find(c => c[1] === FORM_CLICK)[2].destination, 'whatsapp');
    assert.equal(h.navigations.length, 1);
    assert.equal(h.navigations[0].target, '_blank');
    assert.equal(h.navigations[0].features, 'noopener,noreferrer');
    assert.equal(h.createdAnchors.length, 0, 'the form must not expose its message through a synthetic link click');
    assert.equal(h.links.length, 0);
    assert.equal(h.formEvents.length, 1);
    assert.equal(h.formEvents[0].bubbles, true);
    assert.equal(h.formEvents[0].detail, null, 'the tracking notification must not carry the message');
    assert.doesNotMatch(JSON.stringify(h.calls), /2026-10-20|2026-10-27|Arrivo|Przyjazd|420774620060|text=/);
  }
});

test('winter forms accept a calendar month across year, month-end and leap-year boundaries', () => {
  for (const language of ['it', 'pl', 'ru', 'en', 'de', 'cs']) {
    for (const [arrival, departure] of [['2027-11-01','2027-12-01'], ['2027-12-15','2028-01-15'], ['2027-01-31','2027-02-28'], ['2028-01-31','2028-02-29'], ['2028-02-29','2028-03-29'], ['2028-03-01','2028-04-01']]) {
      const h = harness(language, true, { source: 'winter_stay_inquiry', monthly: true });
      h.form.elements.arrival.value = arrival; h.form.elements.departure.value = departure; h.submit();
      assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1, `${language}: ${arrival} – ${departure}`);
      assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 1);
      assert.equal(h.calls.find(c => c[1] === FORM_CLICK)[2].source, 'winter_stay_inquiry');
      assert.equal(new URL(h.navigations[0].url).searchParams.get('text'), `Winter ${arrival} to ${departure}, 4 guests`);
      assert.equal(h.createdAnchors.length, 0);
      assert.doesNotMatch(JSON.stringify(h.calls), new RegExp(arrival + '|' + departure));
      h.direct({ 'data-analytics-source': 'winter_stay_inquiry' }, true);
      assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1);
    }
  }
});

test('winter forms reject short stays and dates outside one November–March season', () => {
  for (const [arrival, departure, error] of [
    ['2027-11-01','2027-11-30','minimum-month'], ['2028-01-31','2028-02-28','minimum-month'],
    ['2027-12-10','2027-12-10','minimum-month'], ['2027-12-10','2027-12-01','minimum-month'],
    ['2027-10-01','2027-11-01','winter-season'], ['2028-04-01','2028-05-01','winter-season'],
    ['2028-03-02','2028-04-02','winter-season'], ['2027-11-01','2028-11-01','winter-season'],
  ]) {
    const h = harness('it', true, { source: 'winter_stay_inquiry', monthly: true });
    h.form.elements.arrival.value = arrival; h.form.elements.departure.value = departure; h.submit();
    assert.equal(h.form.elements.departure.validationMessage, error, `${arrival} – ${departure}`);
    assert.equal(h.navigations.length, 0);
    assert.equal(h.formEvents.length, 0);
    assert.equal(h.calls.filter(c => c[1] === FORM_CLICK || c[1] === 'whatsapp_click').length, 0);
    h.form.elements.arrival.value = '2028-02-01'; h.form.elements.departure.value = '2028-03-01'; h.submit();
    assert.equal(h.form.elements.departure.validationMessage, '');
    assert.equal(h.navigations.length, 1, 'correcting dates clears the error');
  }
});
test('empty, equal and reversed dates do not count a form transition', () => {
  for (const [arrival, departure] of [['', '2026-10-27'], ['2026-10-20', '2026-10-20'], ['2026-10-27', '2026-10-20']]) {
    const h = harness(); h.form.elements.arrival.value = arrival; h.form.elements.departure.value = departure; h.submit();
    assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click' || c[1] === FORM_CLICK).length, 0);
    assert.equal(h.navigations.length, 0);
    assert.equal(h.formEvents.length, 0);
  }
});
test('direct-write and other buttons never count as form submissions, even with the shared source', () => {
  const h = harness();
  h.direct({ 'data-analytics-source': 'guide_stay_inquiry' });
  h.direct({ 'data-analytics-source': 'hero' });
  h.direct({ 'data-analytics-source': 'guide_stay_inquiry', 'data-stay-inquiry-submit': 'true' });
  h.direct({ 'data-analytics-source': 'guide_stay_inquiry', 'data-stay-inquiry-submit': 'true' }, true);
  assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 4);
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


test('commercial forms mounted by React are initialized once and counted with their own source', () => {
  for (const [language, path] of [['it', '/it/appartamento-scalea-vicino-mare'], ['pl', '/pl/apartament-scalea-blisko-morza/']]) {
    for (const formFirst of [true, false]) {
      const h = harness(language, formFirst, { source: 'apartment_stay_inquiry', path, mounted: false });
      assert.equal(h.calls.length, 0);
      h.mount(); h.mount();
      vm.runInContext(inquiry, h.context);
      h.submit();
      assert.equal(h.calls.filter(c => c[1] === 'guide_stay_inquiry_ready').length, 1);
      assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 1);
      const clicks = h.calls.filter(c => c[1] === FORM_CLICK);
      assert.equal(clicks.length, 1);
      assert.equal(clicks[0][2].source, 'apartment_stay_inquiry');
      assert.equal(clicks[0][2].page_path, path.replace(/\/+$/, '') + '/');
      assert.equal(clicks[0][2].destination, 'whatsapp');
      assert.equal(h.navigations.length, 1);
      assert.equal(h.createdAnchors.length, 0);
      const message = new URL(h.navigations[0].url).searchParams.get('text');
      assert.match(message, /2026-10-20/);
      assert.match(message, /2026-10-27/);
      assert.match(message, language === 'pl' ? /Liczba gości: 4/ : /Ospiti: 4/);
      assert.doesNotMatch(JSON.stringify(h.calls), /2026-10-20|2026-10-27|420774620060|text=/);
      h.direct({ 'data-analytics-source': 'apartment_stay_inquiry' });
      assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1);
    }
  }
});

test('WhatsApp navigation works without the conversion tracker and never creates a message-bearing anchor', () => {
  for (const [source, monthly] of [['apartment_stay_inquiry', false], ['winter_stay_inquiry', true]]) {
    const h = harness('it', true, { source, monthly, includeTracker: false });
    if (monthly) {
      h.form.elements.arrival.value = '2027-01-10';
      h.form.elements.departure.value = '2027-02-10';
    }
    h.submit();
    assert.equal(h.navigations.length, 1);
    const url = new URL(h.navigations[0].url);
    assert.equal(url.origin, 'https://wa.me');
    assert.match(url.searchParams.get('text'), /4/);
    assert.equal(h.createdAnchors.length, 0);
    assert.equal(h.calls.length, 0);
  }
});

test('null from noopener window.open does not trigger a second navigation or duplicate counters', () => {
  const h = harness('it', true, { source: 'apartment_stay_inquiry', openResult: null });
  h.submit();
  assert.equal(h.navigations.length, 1);
  assert.equal(h.context.window.location.href, 'https://scaleastay.com/it/spiagge-scalea/');
  assert.equal(h.calls.filter(c => c[1] === 'whatsapp_click').length, 1);
  assert.equal(h.calls.filter(c => c[1] === FORM_CLICK).length, 1);
  assert.equal(h.createdAnchors.length, 0);
});

test('form tracking notification ignores unrelated targets, uninitialized forms and unknown sources', () => {
  const h = harness();
  const initial = h.calls.length;
  h.emitFormEvent({});
  h.emitFormEvent({ matches: () => false });
  h.form.dataset.stayInquiryTracking = '0';
  h.emitFormEvent();
  assert.equal(h.calls.length, initial);

  const unknown = harness('it', true, { source: 'unknown_form' });
  const beforeSubmit = unknown.calls.length;
  unknown.submit();
  assert.equal(unknown.navigations.length, 1, 'an unknown tracking source must not prevent WhatsApp navigation');
  assert.equal(unknown.calls.length, beforeSubmit);
});
