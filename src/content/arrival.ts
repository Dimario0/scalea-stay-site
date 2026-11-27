export const ENTRANCE_ADDRESS = 'Via Giuseppe Saragat 11, 87029 Scalea CS, Italia';

export function directionsUrl(origin: string, destination: string, mode: 'walking' | 'transit' | 'driving') {
  const params = new URLSearchParams({ api: '1', origin, destination, travelmode: mode });
  return `https://www.google.com/maps/dir/?${params}`;
}

export const STATION_TO_HOME_WALKING_URL = directionsUrl(
  'Scalea-Santa Domenica Talao railway station, Scalea CS, Italy',
  ENTRANCE_ADDRESS,
  'walking',
);

export const STATION_WALK = {
  ru: {
    metric: '550 м · около 7 мин пешком',
    entrance: 'Если смотреть на дом с улицы, подъезд №11 — по левой лестнице.',
  },
  it: {
    metric: '550 m · circa 7 min a piedi',
    entrance: 'Guardando il palazzo dalla strada, prendete la scala a sinistra per entrare al civico 11.',
  },
  en: {
    metric: '550 m · about a 7-minute walk',
    entrance: 'Facing the building from the street, take the stairs on the left to entrance No. 11.',
  },
  de: {
    metric: '550 m · ca. 7 Min. zu Fuß',
    entrance: 'Von der Straße aus gesehen führt die linke Treppe zum Eingang Nr. 11.',
  },
  cs: {
    metric: '550 m · přibližně 7 min pěšky',
    entrance: 'Při pohledu z ulice vede ke vchodu č. 11 levé schodiště.',
  },
  pl: {
    metric: '550 m · około 7 min pieszo',
    entrance: 'Patrząc od strony ulicy, wybierzcie schody po lewej. Prowadzą do wejścia nr 11.',
  },
};
