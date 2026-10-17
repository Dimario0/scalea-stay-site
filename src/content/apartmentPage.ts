import { APARTMENT_IMAGES } from './apartmentImages.mjs';

export type ApartmentPageLanguage = 'it' | 'pl';

export const APARTMENT_PAGE_COPY = {
  it: {
    sleepingTitle: 'Come sono organizzati i posti letto',
    bedroom: 'Camera da letto separata con un grande letto matrimoniale.',
    livingRoom: 'Soggiorno con un divano letto per due persone.',
    galleryTitle: 'Foto dell’appartamento',
    allPhotos: 'Guarda tutte le foto',
    openPhoto: 'Apri foto',
    close: 'Chiudi le foto',
    previous: 'Foto precedente',
    next: 'Foto successiva',
    genericPhoto: 'Appartamento ScaleaStay',
    photoLabels: ['Soggiorno con cucina', 'Soggiorno', 'Camera da letto', 'Bagno', 'Terrazza privata', 'Dettagli del bagno', 'Cucina e stoviglie'],
    datesCta: 'Chiedi disponibilità e prezzo',
  },
  pl: {
    sleepingTitle: 'Jak rozmieszczone są miejsca do spania',
    bedroom: 'Oddzielna sypialnia z dużym łóżkiem dwuosobowym.',
    livingRoom: 'Salon z rozkładaną sofą dla dwóch osób.',
    galleryTitle: 'Zdjęcia apartamentu',
    allPhotos: 'Zobacz wszystkie zdjęcia',
    openPhoto: 'Otwórz zdjęcie',
    close: 'Zamknij zdjęcia',
    previous: 'Poprzednie zdjęcie',
    next: 'Następne zdjęcie',
    genericPhoto: 'Apartament ScaleaStay',
    photoLabels: ['Salon z kuchnią', 'Salon', 'Sypialnia', 'Łazienka', 'Prywatny taras', 'Wyposażenie łazienki', 'Kuchnia i naczynia'],
    datesCta: 'Zapytaj o dostępność i cenę',
  },
};

export function getApartmentPhotos(images: string[], language: ApartmentPageLanguage) {
  const valid = images.filter(src => typeof src === 'string' && src.trim());
  const copy = APARTMENT_PAGE_COPY[language];
  return (valid.length ? valid : APARTMENT_IMAGES).map(src => ({
    src,
    caption: copy.photoLabels[APARTMENT_IMAGES.indexOf(src)] || copy.genericPhoto,
  }));
}
