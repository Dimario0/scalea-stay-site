export const EVENTS_PATH = '/it/eventi-scalea/';
export const EVENTS_CHECKED = '2026-09-18';
export type LocalEvent = {
  id: string; title: string; category: string; city: string; venue: string;
  start: string; end: string; time?: string; description: string;
  admission: string; source: string; sourceName: string; checked: string;
  cancelled?: boolean;
};

// Dates and conditions checked against the linked publisher; no automatic source refresh.
export const LOCAL_EVENTS: LocalEvent[] = [
  {
    id: 'cocktail-tango-2026-09-20', title: 'Cocktail Tango', category: 'Musica e ballo',
    city: 'Scalea', venue: 'Grand Hotel De Rose · Lungomare Ruggero di Lauria, 22',
    start: '2026-09-20', end: '2026-09-20', time: '19:30',
    description: 'Una serata di tango argentino nell’area piscina del Grand Hotel De Rose. Un appuntamento per chi ama ballare, organizzato da Divina Greco.',
    admission: 'Ingresso indicato: 15 € con rinfresco. Prenotazione consigliata presso l’organizzatrice.',
    source: 'https://www.faitango.it/scheda-evento-172629/cocktail-tango',
    sourceName: 'Annuncio su FAItango', checked: EVENTS_CHECKED,
  },
  {
    id: 'peperoncino-festival-2026', title: 'Peperoncino Festival 2026', category: 'Gastronomia e spettacoli',
    city: 'Diamante', venue: 'Piazze, lungomare e lungofiume di Diamante',
    start: '2026-09-09', end: '2026-09-13',
    description: 'La 34ª edizione ha riunito gastronomia calabrese, musica, mostre e incontri dedicati al peperoncino. Il programma dell’edizione resta consultabile sul sito del festival.',
    admission: 'Edizione conclusa. Le date di una prossima edizione non sono ancora indicate in questa selezione.',
    source: 'https://www.peperoncinofestival.org/il-festival/il-festival-2026/',
    sourceName: 'Programma ufficiale 2026', checked: EVENTS_CHECKED,
  },
];

export function romeToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  return ['year', 'month', 'day'].map(key => parts.find(p => p.type === key)!.value).join('-');
}

export function eventStatus(event: Pick<LocalEvent, 'start' | 'end' | 'cancelled'>, today: string): 'past' | 'upcoming' | 'cancelled' {
  if (event.cancelled) return 'cancelled';
  return event.end < today ? 'past' : 'upcoming';
}

export function upcomingEvents(today = romeToday(), events = LOCAL_EVENTS): LocalEvent[] {
  return events.filter(event => eventStatus(event, today) === 'upcoming').sort((a, b) => a.start.localeCompare(b.start));
}

export function eventDate(date: string): string {
  return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(new Date(`${date}T12:00:00Z`));
}

export const eventDates = (event: LocalEvent) => event.start === event.end ? eventDate(event.start) : `${eventDate(event.start)} – ${eventDate(event.end)}`;
