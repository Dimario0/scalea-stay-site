import { APARTMENT_IMAGES } from './apartmentImages.mjs';

export type ApartmentPageLanguage = 'it' | 'pl';

export const APARTMENT_PAGE_COPY = {
  it: {
    seoTitle: 'Appartamento vacanze a Scalea vicino al mare | ScaleaStay',
    seoDescription: 'Appartamento a Scalea fino a 4 ospiti: spiaggia a 600 m, circa 5–8 minuti a piedi, Wi-Fi, cucina, terrazza privata e parcheggio. Chiedi date e prezzo su WhatsApp.',
    heroTitle: 'Appartamento vacanze a Scalea vicino al mare',
    heroSubtitle: 'Una casa per le tue vacanze in Calabria, con camera matrimoniale, divano letto per due e terrazza privata. Da ScaleaStay puoi raggiungere a piedi la spiaggia, Interspar, la stazione e il centro.',
    apartmentTitle: 'Fino a 4 ospiti e una terrazza privata',
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
    seoTitle: 'Apartament w Scalei blisko morza dla 4 osób | ScaleaStay',
    seoDescription: 'Apartament w Scalei do 4 gości: plaża 600 m, około 5–8 minut pieszo, Wi-Fi, kuchnia, prywatny taras i parking. Zapytaj o wolny termin i cenę przez WhatsApp.',
    heroTitle: 'Apartament w Scalei blisko morza',
    heroSubtitle: 'Miejsce na wakacje w Kalabrii z oddzielną sypialnią, rozkładaną sofą dla dwóch osób i prywatnym tarasem. Ze ScaleaStay dojdziesz pieszo na plażę, do Intersparu, dworca i centrum.',
    apartmentTitle: 'Do 4 osób i prywatny taras',
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
