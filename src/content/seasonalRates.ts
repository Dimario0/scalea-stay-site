export const RATE_YEAR = 2027;

export const MONTHLY_RATES = [60, 60, 60, 60, 70, 85, 140, 160, 100, 65, 60, 60] as const;

export type RatesCopy = {
  nav: string;
  title: string;
  intro: string;
  month: string;
  night: string;
  includes: string;
  closedTitle: string;
  closedText: string;
  contact: string;
  winterNote: string;
};

const COPY: Record<string, RatesCopy> = {
  ru: {
    nav: 'Цены 2027',
    title: 'Цены за ночь в 2027 году',
    intro: 'За весь апартамент, до 4 гостей. Цены за одну ночь при краткосрочном проживании.',
    month: 'Месяц',
    night: 'За ночь',
    includes: 'Уборка и электричество включены в стоимость.',
    closedTitle: 'Онлайн-бронирование ещё не открыто',
    closedText: 'Цены опубликованы для планирования поездки и не подтверждают наличие свободных дат. Обращение в WhatsApp не является бронированием.',
    contact: 'Задать вопрос в WhatsApp',
    winterNote: 'Для зимнего проживания на месяц действуют отдельные условия.',
  },
  en: {
    nav: '2027 rates',
    title: '2027 nightly rates',
    intro: 'For the whole apartment, up to 4 guests. Prices are per night for short stays.',
    month: 'Month',
    night: 'Per night',
    includes: 'Cleaning and electricity are included.',
    closedTitle: 'Online booking is not open yet',
    closedText: 'Published prices are for planning your trip and do not confirm availability. A WhatsApp enquiry is not a reservation.',
    contact: 'Ask a question on WhatsApp',
    winterNote: 'Monthly winter stays have separate terms.',
  },
  it: {
    nav: 'Tariffe 2027',
    title: 'Tariffe a notte per il 2027',
    intro: 'Per l’intero appartamento, fino a 4 ospiti. I prezzi sono a notte per soggiorni brevi.',
    month: 'Mese',
    night: 'A notte',
    includes: 'Pulizia ed elettricità sono incluse.',
    closedTitle: 'Le prenotazioni online non sono ancora aperte',
    closedText: 'I prezzi pubblicati servono a pianificare il viaggio e non confermano la disponibilità delle date. Una richiesta su WhatsApp non è una prenotazione.',
    contact: 'Fai una domanda su WhatsApp',
    winterNote: 'I soggiorni invernali mensili prevedono condizioni separate.',
  },
  de: {
    nav: 'Preise 2027',
    title: 'Übernachtungspreise 2027',
    intro: 'Für die gesamte Ferienwohnung, bis zu 4 Gäste. Die Preise gelten pro Nacht für kurze Aufenthalte.',
    month: 'Monat',
    night: 'Pro Nacht',
    includes: 'Reinigung und Strom sind im Preis enthalten.',
    closedTitle: 'Onlinebuchungen sind noch nicht möglich',
    closedText: 'Die veröffentlichten Preise dienen der Reiseplanung und bestätigen keine Verfügbarkeit. Eine Anfrage per WhatsApp ist keine Reservierung.',
    contact: 'Eine Frage per WhatsApp stellen',
    winterNote: 'Für monatliche Winteraufenthalte gelten separate Bedingungen.',
  },
  cs: {
    nav: 'Ceny 2027',
    title: 'Ceny za noc v roce 2027',
    intro: 'Za celý apartmán, až pro 4 hosty. Ceny jsou za jednu noc při krátkodobém pobytu.',
    month: 'Měsíc',
    night: 'Za noc',
    includes: 'Úklid a elektřina jsou zahrnuty v ceně.',
    closedTitle: 'Online rezervace zatím nejsou otevřené',
    closedText: 'Zveřejněné ceny slouží k plánování cesty a nepotvrzují dostupnost termínů. Dotaz přes WhatsApp není rezervací.',
    contact: 'Položit dotaz přes WhatsApp',
    winterNote: 'Pro měsíční zimní pobyty platí samostatné podmínky.',
  },
  pl: {
    nav: 'Ceny 2027',
    title: 'Ceny za noc w 2027 roku',
    intro: 'Za cały apartament, do 4 gości. Ceny za jedną noc przy krótkich pobytach.',
    month: 'Miesiąc',
    night: 'Za noc',
    includes: 'Sprzątanie i prąd są wliczone w cenę.',
    closedTitle: 'Rezerwacja online nie jest jeszcze dostępna',
    closedText: 'Opublikowane ceny służą do planowania podróży i nie potwierdzają dostępności terminów. Zapytanie przez WhatsApp nie jest rezerwacją.',
    contact: 'Zadaj pytanie przez WhatsApp',
    winterNote: 'Miesięczne pobyty zimowe mają odrębne warunki.',
  },
};

export const getRatesCopy = (language: string): RatesCopy => COPY[language] || COPY.en;
