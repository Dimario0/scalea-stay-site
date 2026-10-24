import type { StayLanguage } from './longStayRoutes';

// These strings also supply the shared form handler's localized validation and WhatsApp draft.
type WinterInquiry = {
  title: string; text: string; terms: string; arrival: string; departure: string; guests: string;
  submit: string; fallback: string; minimum: string; season: string; message: string;
};
export const WINTER_INQUIRY: Record<StayLanguage, WinterInquiry> = {
  it: {
    title: 'Chiedi un soggiorno di almeno un mese',
    text: '450 € al mese per l’appartamento, da novembre a marzo, più utenze a consumo. Wi-Fi disponibile.',
    terms: 'L’anticipo per le utenze è di 100 € una tantum, con conguaglio. Il proprietario conferma disponibilità e importo totale su WhatsApp. Questo è un preventivo da richiedere, non una prenotazione.',
    arrival: 'Arrivo', departure: 'Partenza', guests: 'Ospiti', submit: 'Chiedi le date su WhatsApp',
    fallback: 'Altre date o domande? Scrivi direttamente su WhatsApp',
    minimum: 'Scegli un soggiorno di almeno un mese di calendario.',
    season: 'Scegli le date da novembre a marzo della stessa stagione (partenza entro il 1° aprile). Per altre date, scrivi direttamente.',
    message: 'Buongiorno! Mi interessa un soggiorno invernale ScaleaStay di almeno un mese. Arrivo: {arrival}. Partenza: {departure}. Ospiti: {guests}. Ho letto: 450 € al mese per l’appartamento più utenze a consumo e anticipo utenze di 100 € una tantum con conguaglio. Potete confermare disponibilità e importo totale?',
  },
  pl: {
    title: 'Zapytaj o pobyt na co najmniej miesiąc',
    text: '450 € miesięcznie za apartament, od listopada do marca, plus media według zużycia. Wi-Fi jest dostępne.',
    terms: 'Jednorazowa zaliczka na media wynosi 100 €, z późniejszym rozliczeniem. Właściciel potwierdzi dostępność i całkowitą kwotę na WhatsApp. To zapytanie o ofertę, nie rezerwacja.',
    arrival: 'Przyjazd', departure: 'Wyjazd', guests: 'Goście', submit: 'Zapytaj o daty na WhatsApp',
    fallback: 'Inne daty lub pytania? Napisz bezpośrednio na WhatsApp',
    minimum: 'Wybierz pobyt trwający co najmniej jeden miesiąc kalendarzowy.',
    season: 'Wybierz daty od listopada do marca tego samego sezonu (wyjazd do 1 kwietnia). O inne daty zapytaj bezpośrednio.',
    message: 'Dzień dobry! Interesuje mnie zimowy pobyt w ScaleaStay na co najmniej miesiąc. Przyjazd: {arrival}. Wyjazd: {departure}. Liczba gości: {guests}. Znam warunki: 450 € miesięcznie za apartament plus media według zużycia i jednorazowa zaliczka na media 100 € z rozliczeniem. Proszę o potwierdzenie dostępności i całkowitej kwoty.',
  },
  ru: {
    title: 'Запросите проживание от одного месяца',
    text: '450 € в месяц за апартаменты с ноября по март, плюс коммунальные по счётчикам. Wi-Fi есть.',
    terms: 'Аванс за коммунальные — 100 € разово, с перерасчётом. Владелец подтвердит свободные даты и полную стоимость в WhatsApp. Это запрос условий, а не подтверждённая бронь.',
    arrival: 'Заезд', departure: 'Выезд', guests: 'Гости', submit: 'Запросить даты в WhatsApp',
    fallback: 'Другие даты или вопросы? Написать напрямую в WhatsApp',
    minimum: 'Выберите проживание минимум на один календарный месяц.',
    season: 'Выберите даты с ноября по март одного сезона (выезд не позднее 1 апреля). Другие даты уточните напрямую.',
    message: 'Здравствуйте! Интересует зимнее проживание в ScaleaStay от одного месяца. Заезд: {arrival}. Выезд: {departure}. Гостей: {guests}. Условия прочитал(а): 450 € в месяц за апартаменты плюс коммунальные по счётчикам, аванс за коммунальные 100 € разово с перерасчётом. Подтвердите, пожалуйста, свободные даты и полную стоимость.',
  },
  en: {
    title: 'Ask about a stay of at least one month',
    text: '€450 per month for the apartment, November to March, plus metered utilities. Wi-Fi is available.',
    terms: 'A one-time €100 utilities advance is reconciled against actual use. The owner will confirm availability and the total cost on WhatsApp. This is an enquiry, not a confirmed booking.',
    arrival: 'Arrival', departure: 'Departure', guests: 'Guests', submit: 'Ask about dates on WhatsApp',
    fallback: 'Other dates or questions? Write directly on WhatsApp',
    minimum: 'Please choose a stay of at least one calendar month.',
    season: 'Choose dates from November to March in the same winter season (departure by 1 April). Ask directly about other dates.',
    message: 'Hello! I am interested in a winter stay at ScaleaStay of at least one month. Arrival: {arrival}. Departure: {departure}. Guests: {guests}. I have read the terms: €450 per month for the apartment plus metered utilities and a one-time €100 utilities advance reconciled against actual use. Please confirm availability and the total cost.',
  },
  de: {
    title: 'Aufenthalt ab einem Monat anfragen',
    text: '450 € pro Monat für die Wohnung, von November bis März, zuzüglich Nebenkosten nach Zählerstand. WLAN ist vorhanden.',
    terms: 'Für die Nebenkosten fällt eine einmalige Vorauszahlung von 100 € mit späterer Abrechnung an. Der Eigentümer bestätigt Verfügbarkeit und Gesamtpreis per WhatsApp. Dies ist eine Anfrage, keine bestätigte Buchung.',
    arrival: 'Anreise', departure: 'Abreise', guests: 'Gäste', submit: 'Termine per WhatsApp anfragen',
    fallback: 'Andere Termine oder Fragen? Direkt per WhatsApp schreiben',
    minimum: 'Bitte mindestens einen Kalendermonat auswählen.',
    season: 'Bitte Termine von November bis März derselben Wintersaison wählen (Abreise spätestens am 1. April). Andere Termine bitte direkt anfragen.',
    message: 'Guten Tag! Ich interessiere mich für einen Winteraufenthalt bei ScaleaStay ab einem Monat. Anreise: {arrival}. Abreise: {departure}. Gäste: {guests}. Die Bedingungen sind mir bekannt: 450 € pro Monat für die Wohnung zuzüglich Nebenkosten nach Verbrauch und einmalig 100 € Nebenkostenvorauszahlung mit Abrechnung. Bitte bestätigen Sie Verfügbarkeit und Gesamtpreis.',
  },
  cs: {
    title: 'Zeptejte se na pobyt alespoň na měsíc',
    text: '450 € měsíčně za apartmán od listopadu do března, plus energie podle měřidel. Wi-Fi je k dispozici.',
    terms: 'Jednorázová záloha na energie činí 100 € s následným vyúčtováním. Majitel potvrdí dostupnost a celkovou cenu přes WhatsApp. Jde o poptávku, nikoli potvrzenou rezervaci.',
    arrival: 'Příjezd', departure: 'Odjezd', guests: 'Hosté', submit: 'Zeptat se na termín přes WhatsApp',
    fallback: 'Jiné termíny nebo dotazy? Napište přímo přes WhatsApp',
    minimum: 'Vyberte pobyt alespoň na jeden kalendářní měsíc.',
    season: 'Vyberte termíny od listopadu do března stejné zimní sezóny (odjezd nejpozději 1. dubna). Na jiné termíny se zeptejte přímo.',
    message: 'Dobrý den! Mám zájem o zimní pobyt ve ScaleaStay alespoň na měsíc. Příjezd: {arrival}. Odjezd: {departure}. Počet hostů: {guests}. Znám podmínky: 450 € měsíčně za apartmán plus energie podle spotřeby a jednorázová záloha na energie 100 € s vyúčtováním. Prosím potvrďte dostupnost a celkovou cenu.',
  },
};
