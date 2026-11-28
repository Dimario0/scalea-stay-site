import { directionsUrl } from './arrival';

export const BEACH_ACCESS = [39.807165, 15.788758] as const;

// The owner marked these points in walking order and confirmed the first as entrance 11.
// Looking up the street number in Maps places the start roughly 100 m farther east.
export const BEACH_WALK_POINTS = [
  [39.807283, 15.794254],
  [39.806944, 15.792861],
  [39.806700, 15.791189],
  [39.807497, 15.790949],
  BEACH_ACCESS,
] as const;

export const BEACH_WALKING_URL = directionsUrl(
  BEACH_WALK_POINTS[0].join(','),
  BEACH_ACCESS.join(','),
  'walking',
  BEACH_WALK_POINTS.slice(1, -1).map(point => point.join(',')),
);

type BeachWalkCopy = { metric: string; townHall: string; directions: string };

export const BEACH_WALK_COPY: Record<string, BeachWalkCopy> = {
  ru: {
    metric: 'Около 500 м, 5–8 минут пешком',
    townHall: 'Мэрия',
    directions: 'От подъезда №11 идите к мэрии. У Via Plinio il Vecchio поверните направо, на следующем перекрёстке — налево к морю. Пересеките Corso Mediterraneo и продолжайте прямо до пляжа.',
  },
  it: {
    metric: 'Circa 500 m, 5–8 minuti a piedi',
    townHall: 'Municipio',
    directions: 'Dal civico 11 camminate verso il municipio. All’incrocio con Via Plinio il Vecchio girate a destra, poi al primo incrocio a sinistra verso il mare. Attraversate Corso Mediterraneo e proseguite dritto fino alla spiaggia.',
  },
  en: {
    metric: 'About 500 m, a 5–8 minute walk',
    townHall: 'Town hall',
    directions: 'From entrance 11, walk towards the town hall. Turn right at Via Plinio il Vecchio, then left at the next junction towards the sea. Cross Corso Mediterraneo and walk straight on to the beach.',
  },
  de: {
    metric: 'Ca. 500 m, 5–8 Minuten zu Fuß',
    townHall: 'Rathaus',
    directions: 'Gehen Sie vom Eingang Nr. 11 in Richtung Rathaus. Biegen Sie an der Via Plinio il Vecchio rechts und an der nächsten Kreuzung links zum Meer ab. Überqueren Sie den Corso Mediterraneo und gehen Sie geradeaus zum Strand.',
  },
  cs: {
    metric: 'Přibližně 500 m, 5–8 minut pěšky',
    townHall: 'Radnice',
    directions: 'Od vchodu č. 11 jděte směrem k radnici. U Via Plinio il Vecchio odbočte doprava a na další křižovatce doleva směrem k moři. Přejděte Corso Mediterraneo a pokračujte rovně na pláž.',
  },
  pl: {
    metric: 'Około 500 m, 5–8 minut pieszo',
    townHall: 'Ratusz',
    directions: 'Od wejścia nr 11 idźcie w stronę ratusza. Przy Via Plinio il Vecchio skręćcie w prawo, a na następnym skrzyżowaniu w lewo w stronę morza. Przejdźcie przez Corso Mediterraneo i idźcie prosto na plażę.',
  },
};
