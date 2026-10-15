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
