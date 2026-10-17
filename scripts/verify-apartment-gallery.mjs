import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APARTMENT_IMAGES } from '../src/content/apartmentImages.mjs';

assert.equal(APARTMENT_IMAGES.length, 7, 'Keep all seven original apartment photos');
assert.equal(new Set(APARTMENT_IMAGES).size, APARTMENT_IMAGES.length, 'No duplicate gallery photos');

for (const path of APARTMENT_IMAGES) {
  assert.match(path, /^\/images\/[a-z0-9-]+\.jpg$/, 'Apartment originals must be hosted with the site');
  const source = readFileSync(new URL(`../public${path}`, import.meta.url));
  const built = readFileSync(new URL(`../dist${path}`, import.meta.url));
  assert(source.length > 10_000, `${path}: missing or truncated source photo`);
  assert.equal(source.readUInt16BE(0), 0xffd8, `${path}: expected a JPEG photo`);
  assert.equal(source.readUInt16BE(source.length - 2), 0xffd9, `${path}: incomplete JPEG photo`);
  assert(source.equals(built), `${path}: built photo differs from its original`);
}

console.log('PASS: all seven apartment originals are local, unique and copied intact into dist');

for (const route of ['it/appartamento-scalea-vicino-mare', 'pl/apartament-scalea-blisko-morza']) {
  const html = readFileSync(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8');
  const gallery = html.match(/<details\b[^>]*id="apartment-photo-gallery"[^>]*>[\s\S]*?<\/details>/)?.[0];
  assert(gallery, `${route}: full gallery must be available before JavaScript starts`);
  for (const photo of APARTMENT_IMAGES) {
    assert(gallery.includes(`href="${photo}"`) && gallery.includes(`src="${photo}"`), `${route}: missing original photo link ${photo}`);
  }
  const sleeping = html.match(/data-sleeping-arrangement[^>]*>[\s\S]*?<p>([^<]+)<\/p>\s*<p>([^<]+)<\/p>/);
  assert(sleeping, `${route}: missing bedroom and living-room sleeping descriptions`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
  for (const sentence of sleeping.slice(1, 3)) {
    assert(faq?.mainEntity.some(item => item.acceptedAnswer.text.includes(sentence)), `${route}: sleeping facts must match visible FAQ and schema`);
  }
  const mobileCta = html.match(/<div[^>]*data-mobile-date-cta[\s\S]*?<\/div>/)?.[0];
  assert(mobileCta?.includes('href="#apartment-stay-inquiry"'), `${route}: mobile CTA must lead to the existing form`);
  assert(!mobileCta.includes('wa.me'), `${route}: mobile CTA cannot bypass the date form`);
  assert.equal((html.match(/<form\b[^>]*data-stay-inquiry/g) || []).length, 1, `${route}: keep one date request form`);
  assert.equal((html.match(/<dialog\b/g) || []).length, 1, `${route}: keep one gallery dialog`);
}
console.log('PASS: IT/PL pages contain all seven photo links, consistent sleeping facts and one form with a mobile anchor');
