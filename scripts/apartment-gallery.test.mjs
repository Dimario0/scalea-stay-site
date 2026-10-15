import assert from 'node:assert/strict';
import test from 'node:test';
import { APARTMENT_IMAGES, migrateApartmentImages } from '../src/content/apartmentImages.mjs';

const legacyImages = [
  'https://i.postimg.cc/rmgf10N5/IMG_0338.jpg',
  'https://i.postimg.cc/vBX0rgth/IMG_0349.jpg',
  'https://i.postimg.cc/fL58ctvn/IMG_0329.jpg',
  'https://i.postimg.cc/tTDB3ZNM/IMG_0355.jpg',
  'https://i.postimg.cc/DZ5xrJPr/IMG_0348.jpg',
  'https://i.postimg.cc/j5vMHw4P/IMG_0357.jpg',
  'https://i.postimg.cc/ZRjw8Bx7/IMG_0358.jpg',
];

test('saved gallery defaults migrate to the seven local originals', () => {
  assert.deepEqual(migrateApartmentImages(legacyImages), APARTMENT_IMAGES);
});

test('already migrated galleries stay unchanged on subsequent loads', () => {
  const once = migrateApartmentImages(legacyImages);
  assert.deepEqual(migrateApartmentImages(once), once);
});

test('custom photos, order and an extra photo survive without mutating saved data', () => {
  const saved = Object.freeze([
    legacyImages[6], '/images/custom-owner-photo.jpg', legacyImages[0],
    ...legacyImages.slice(1, 6), 'https://example.com/eighth-owner-photo.jpg',
  ]);
  const original = [...saved];
  assert.deepEqual(migrateApartmentImages(saved), [
    APARTMENT_IMAGES[6], '/images/custom-owner-photo.jpg', APARTMENT_IMAGES[0],
    ...APARTMENT_IMAGES.slice(1, 6), 'https://example.com/eighth-owner-photo.jpg',
  ]);
  assert.deepEqual(saved, original);
});

test('only known original URLs migrate', () => {
  const unknown = ['toString', '__proto__', 'https://i.postimg.cc/other/custom.jpg'];
  assert.deepEqual(migrateApartmentImages(unknown), unknown);
});
