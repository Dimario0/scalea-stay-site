type ApartmentCopy = {
  eyebrow: string;
  facts: [string, string, string, string, string];
};

export const APARTMENT_COPY: Record<string, ApartmentCopy> = {
  ru: {
    eyebrow: 'Апартаменты в Скалее',
    facts: ['До 4 гостей', 'Кондиционер', 'Кухня', 'Терраса', 'Парковка'],
  },
  en: {
    eyebrow: 'Apartment in Scalea',
    facts: ['Up to 4 guests', 'Air conditioning', 'Kitchen', 'Terrace', 'Parking'],
  },
  it: {
    eyebrow: 'Il tuo appartamento a Scalea',
    facts: ['Fino a 4 ospiti', 'Aria condizionata', 'Cucina', 'Terrazza', 'Parcheggio'],
  },
  de: {
    eyebrow: 'Ferienwohnung in Scalea',
    facts: ['Bis zu 4 Gäste', 'Klimaanlage', 'Küche', 'Terrasse', 'Parkplatz'],
  },
  cs: {
    eyebrow: 'Apartmán ve Scalee',
    facts: ['Až 4 hosté', 'Klimatizace', 'Kuchyň', 'Terasa', 'Parkování'],
  },
  pl: {
    eyebrow: 'Twój apartament w Scalei',
    facts: ['Do 4 gości', 'Klimatyzacja', 'Kuchnia', 'Taras', 'Parking'],
  },
};
