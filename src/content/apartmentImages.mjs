// Original apartment photographs, served with the site instead of a third-party image host.
export const APARTMENT_IMAGES = [
  '/images/scaleastay-living-kitchen.jpg',
  '/images/scaleastay-living-room.jpg',
  '/images/scaleastay-bedroom-ready.jpg',
  '/images/scaleastay-bathroom.jpg',
  '/images/scaleastay-terrace-seating.jpg',
  '/images/scaleastay-bathroom-details.jpg',
  '/images/scaleastay-kitchen-details.jpg',
];

const LEGACY_IMAGES = {
  'https://i.postimg.cc/rmgf10N5/IMG_0338.jpg': APARTMENT_IMAGES[0],
  'https://i.postimg.cc/vBX0rgth/IMG_0349.jpg': APARTMENT_IMAGES[1],
  'https://i.postimg.cc/fL58ctvn/IMG_0329.jpg': APARTMENT_IMAGES[2],
  'https://i.postimg.cc/tTDB3ZNM/IMG_0355.jpg': APARTMENT_IMAGES[3],
  'https://i.postimg.cc/DZ5xrJPr/IMG_0348.jpg': APARTMENT_IMAGES[4],
  'https://i.postimg.cc/j5vMHw4P/IMG_0357.jpg': APARTMENT_IMAGES[5],
  'https://i.postimg.cc/ZRjw8Bx7/IMG_0358.jpg': APARTMENT_IMAGES[6],
};

// Migrate known old defaults even in saved browser settings, preserving custom photos and order.
export function migrateApartmentImages(images) {
  return images.map(image => Object.hasOwn(LEGACY_IMAGES, image) ? LEGACY_IMAGES[image] : image);
}
