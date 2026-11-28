import { directionsUrl } from './arrival';

export const BEACH_ACCESS = [39.807305, 15.788892] as const;

// The owner marked these points in walking order and confirmed the first as entrance 11.
// Looking up the street number in Maps places the start roughly 100 m farther east.
export const BEACH_WALK_POINTS = [
  [39.807213, 15.794250],
  [39.807149, 15.793878],
  [39.807719, 15.793662],
  [39.807480, 15.790834],
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
    directions: 'От подъезда №11 дойдите до Via Fiume Lao и поверните направо. Примерно через 70 м поверните налево на Viale Fazio degli Uberti. Дальше прямо мимо мэрии, через Corso Mediterraneo, до пляжа.',
  },
  it: {
    metric: 'Circa 500 m, 5–8 minuti a piedi',
    townHall: 'Municipio',
    directions: 'Dal civico 11 raggiungete Via Fiume Lao e girate a destra. Dopo circa 70 m girate a sinistra in Viale Fazio degli Uberti. Proseguite dritto, passate davanti al municipio e attraversate Corso Mediterraneo per raggiungere la spiaggia.',
  },
  en: {
    metric: 'About 500 m, a 5–8 minute walk',
    townHall: 'Town hall',
    directions: 'From entrance 11, turn right onto Via Fiume Lao. After about 70 m, turn left onto Viale Fazio degli Uberti. Walk straight past the town hall and across Corso Mediterraneo to the beach.',
  },
  de: {
    metric: 'Ca. 500 m, 5–8 Minuten zu Fuß',
    townHall: 'Rathaus',
    directions: 'Gehen Sie vom Eingang Nr. 11 bis zur Via Fiume Lao und biegen Sie rechts ab. Nach etwa 70 m biegen Sie links in den Viale Fazio degli Uberti ein. Gehen Sie geradeaus am Rathaus vorbei und über den Corso Mediterraneo zum Strand.',
  },
  cs: {
    metric: 'Přibližně 500 m, 5–8 minut pěšky',
    townHall: 'Radnice',
    directions: 'Od vchodu č. 11 dojděte k ulici Via Fiume Lao a odbočte doprava. Asi po 70 m odbočte doleva na Viale Fazio degli Uberti. Pokračujte rovně kolem radnice, přejděte Corso Mediterraneo a dojdete na pláž.',
  },
  pl: {
    metric: 'Około 500 m, 5–8 minut pieszo',
    townHall: 'Ratusz',
    directions: 'Od wejścia nr 11 dojdźcie do Via Fiume Lao i skręćcie w prawo. Po około 70 m skręćcie w lewo w Viale Fazio degli Uberti. Idźcie prosto obok ratusza, przejdźcie przez Corso Mediterraneo i dojdziecie na plażę.',
  },
};
