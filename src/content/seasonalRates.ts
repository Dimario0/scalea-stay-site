export const RATE_YEAR = 2027;

export const MONTHLY_RATES = [60, 60, 60, 60, 70, 85, 110, 140, 95, 65, 60, 60] as const;

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
    title: 'Прямые тарифы на 2027 год',
    intro: 'При бронировании напрямую у владельца, без посредников. За весь апартамент, до 4 гостей, за одну ночь при краткосрочном проживании.',
    month: 'Месяц',
    night: 'За ночь',
    includes: 'Уборка и электричество включены в стоимость.',
    closedTitle: 'Свободные даты нужно подтвердить',
    closedText: 'Онлайн-бронирование пока недоступно. Уточните свободные даты и стоимость вашего проживания у владельца в WhatsApp. Запрос не является подтверждённой бронью.',
    contact: 'Уточнить даты в WhatsApp',
    winterNote: 'Для зимнего проживания на месяц действуют отдельные условия.',
  },
  en: {
    nav: '2027 rates',
    title: '2027 direct-booking rates',
    intro: 'For bookings made directly with the owner, without intermediaries. Per night for the whole apartment, up to 4 guests, for short stays.',
    month: 'Month',
    night: 'Per night',
    includes: 'Cleaning and electricity are included.',
    closedTitle: 'Please confirm available dates',
    closedText: 'Online booking is not available yet. Contact the owner on WhatsApp to confirm availability and the price for your stay. An enquiry is not a confirmed reservation.',
    contact: 'Ask about dates on WhatsApp',
    winterNote: 'Monthly winter stays have separate terms.',
  },
  it: {
    nav: 'Tariffe 2027',
    title: 'Tariffe dirette per il 2027',
    intro: 'Prenotando direttamente con il proprietario, senza intermediari. Prezzi a notte per l’intero appartamento, fino a 4 ospiti, per soggiorni brevi.',
    month: 'Mese',
    night: 'A notte',
    includes: 'Pulizia ed elettricità sono incluse.',
    closedTitle: 'La disponibilità va confermata',
    closedText: 'La prenotazione online non è ancora disponibile. Chiedi al proprietario su WhatsApp la disponibilità e il prezzo del tuo soggiorno. Una richiesta non è una prenotazione confermata.',
    contact: 'Chiedi disponibilità su WhatsApp',
    winterNote: 'I soggiorni invernali mensili prevedono condizioni separate.',
  },
  de: {
    nav: 'Preise 2027',
    title: 'Preise bei Direktbuchung 2027',
    intro: 'Bei Direktbuchung beim Eigentümer, ohne Vermittler. Die Preise gelten pro Nacht für die gesamte Ferienwohnung, bis zu 4 Gäste, bei kurzen Aufenthalten.',
    month: 'Monat',
    night: 'Pro Nacht',
    includes: 'Reinigung und Strom sind im Preis enthalten.',
    closedTitle: 'Bitte verfügbare Termine bestätigen lassen',
    closedText: 'Onlinebuchungen sind noch nicht möglich. Fragen Sie den Eigentümer per WhatsApp nach Verfügbarkeit und Preis für Ihren Aufenthalt. Eine Anfrage ist keine bestätigte Reservierung.',
    contact: 'Termine per WhatsApp anfragen',
    winterNote: 'Für monatliche Winteraufenthalte gelten separate Bedingungen.',
  },
  cs: {
    nav: 'Ceny 2027',
    title: 'Ceny při přímé rezervaci v roce 2027',
    intro: 'Při rezervaci přímo u majitele, bez zprostředkovatelů. Ceny za jednu noc za celý apartmán, až pro 4 hosty, při krátkodobém pobytu.',
    month: 'Měsíc',
    night: 'Za noc',
    includes: 'Úklid a elektřina jsou zahrnuty v ceně.',
    closedTitle: 'Dostupnost termínu je třeba potvrdit',
    closedText: 'Online rezervace zatím nejsou dostupné. Dostupnost a cenu pobytu si ověřte u majitele přes WhatsApp. Poptávka není potvrzenou rezervací.',
    contact: 'Ověřit termín přes WhatsApp',
    winterNote: 'Pro měsíční zimní pobyty platí samostatné podmínky.',
  },
  pl: {
    nav: 'Ceny 2027',
    title: 'Ceny przy rezerwacji bezpośredniej na 2027 rok',
    intro: 'Przy rezerwacji bezpośrednio u właściciela, bez pośredników. Ceny za jedną noc za cały apartament, do 4 gości, przy krótkich pobytach.',
    month: 'Miesiąc',
    night: 'Za noc',
    includes: 'Sprzątanie i prąd są wliczone w cenę.',
    closedTitle: 'Dostępność terminu wymaga potwierdzenia',
    closedText: 'Rezerwacja online nie jest jeszcze dostępna. Potwierdź dostępność i cenę pobytu u właściciela przez WhatsApp. Zapytanie nie jest potwierdzoną rezerwacją.',
    contact: 'Zapytaj o termin przez WhatsApp',
    winterNote: 'Miesięczne pobyty zimowe mają odrębne warunki.',
  },
};

export const getRatesCopy = (language: string): RatesCopy => COPY[language] || COPY.en;
