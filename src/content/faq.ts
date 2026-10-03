import { translate } from './translations';
import { getLongStayCopy } from './longStay';

const FAQ_COPY: Record<string, {
  amenitiesSuffix: string;
  availabilityQuestion: string;
  availabilityAnswer: string;
  shopQuestion: string;
  shopAnswer: string;
  beachQuestion: string;
  beachAnswer: string;
  familyAnswer: string;
}> = {
  ru: {
    familyAnswer: 'Да, апартаменты подходят для семьи и вмещают до 4 гостей. В квартире одна спальня, оборудованная кухня и собственная терраса.',
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    availabilityQuestion: 'Как проверить свободные даты?',
    availabilityAnswer: "Напишите даты и число гостей в WhatsApp — владелец проверит свободные даты и сообщит стоимость.",
    shopQuestion: 'Есть ли рядом магазины?',
    shopAnswer: 'Да. Interspar находится примерно в 230 м от ScaleaStay — около 3 минут пешком.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
  },
  en: {
    familyAnswer: 'Yes, the apartment is suitable for families and accommodates up to 4 guests. It has one bedroom, an equipped kitchen and a private terrace.',
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    availabilityQuestion: 'How can I check available dates?',
    availabilityAnswer: "Send your dates and number of guests on WhatsApp. The owner will check availability and share the price.",
    shopQuestion: 'Are there shops nearby?',
    shopAnswer: 'Yes. Interspar is about 230 m from ScaleaStay, around a 3-minute walk.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
  },
  it: {
    familyAnswer: 'Sì, l’appartamento è adatto alle famiglie e può ospitare fino a 4 persone. Dispone di una camera da letto, cucina attrezzata e terrazza privata.',
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    availabilityQuestion: 'Come posso verificare le date disponibili?',
    availabilityAnswer: "Invia date e numero di ospiti su WhatsApp: il proprietario verificherà la disponibilità e ti comunicherà il prezzo.",
    shopQuestion: 'Ci sono negozi nelle vicinanze?',
    shopAnswer: 'Sì. Interspar si trova a circa 230 m da ScaleaStay, circa 3 minuti a piedi.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
  },
  de: {
    familyAnswer: 'Ja, die Ferienwohnung eignet sich für Familien und bietet Platz für bis zu 4 Gäste. Sie hat ein Schlafzimmer, eine ausgestattete Küche und eine eigene Terrasse.',
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    availabilityQuestion: 'Wie kann ich freie Termine prüfen?',
    availabilityAnswer: "Senden Sie Reisedaten und Gästezahl per WhatsApp. Der Eigentümer prüft die Verfügbarkeit und nennt den Preis.",
    shopQuestion: 'Gibt es Geschäfte in der Nähe?',
    shopAnswer: 'Ja. Interspar liegt etwa 230 m von ScaleaStay entfernt, rund 3 Gehminuten.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
  },
  cs: {
    familyAnswer: 'Ano, apartmán je vhodný pro rodiny a pojme až 4 hosty. Má jednu ložnici, vybavenou kuchyň a vlastní terasu.',
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    availabilityQuestion: 'Jak ověřit volné termíny?',
    availabilityAnswer: "Pošlete termín a počet hostů přes WhatsApp. Majitel ověří dostupnost a sdělí cenu.",
    shopQuestion: 'Jsou v okolí obchody?',
    shopAnswer: 'Ano. Interspar je přibližně 230 m od ScaleaStay, asi 3 minuty pěšky.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
  },
  pl: {
    familyAnswer: 'Tak, apartament jest odpowiedni dla rodzin i może pomieścić do 4 gości. Ma jedną sypialnię, wyposażoną kuchnię i prywatny taras.',
    amenitiesSuffix: 'W apartamencie są także suszarka do włosów, kuchenka mikrofalowa i podstawowe wyposażenie kuchenne.',
    availabilityQuestion: 'Jak sprawdzić wolne terminy?',
    availabilityAnswer: "Wyślij termin i liczbę gości przez WhatsApp. Właściciel sprawdzi dostępność i poda cenę.",
    shopQuestion: 'Czy w pobliżu są sklepy?',
    shopAnswer: 'Tak. Interspar znajduje się około 230 m od ScaleaStay, czyli około 3 minuty pieszo.',
    beachQuestion: 'Co jest dostępne na dzień na plaży?',
    beachAnswer: 'Goście mają do dyspozycji parasol plażowy, który można zabrać nad morze.',
  },
};

export const getFaqItems = (language: string) => {
  const copy = FAQ_COPY[language] || FAQ_COPY.ru;
  const t = (key: string) => translate(language, key);
  return [
    ...getLongStayCopy(language).faq,
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: `${t('faqA2')} ${copy.amenitiesSuffix}` },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
    { q: copy.availabilityQuestion, a: copy.availabilityAnswer },
    { q: t('faqQ7'), a: copy.familyAnswer },
    { q: copy.shopQuestion, a: copy.shopAnswer },
    { q: copy.beachQuestion, a: copy.beachAnswer },
  ];
};

// Commercial pages have no Routes section; keep their location answer self-contained.
const COMMERCIAL_TRAVEL_FAQ = {
  it: [
    { q: 'Quanto dista la spiaggia?', a: 'La spiaggia più vicina è a circa 600 m, normalmente 5–8 minuti a piedi. ScaleaStay si trova in Via Giuseppe Saragat 11, Scalea.' },
    { q: 'Si può arrivare in treno?', a: 'Sì. La stazione Scalea–Santa Domenica Talao è a circa 500 m, circa 8 minuti a piedi.' },
  ],
  pl: [
    { q: 'Jak daleko jest do plaży?', a: 'Najbliższa plaża znajduje się około 600 m od apartamentu — zwykle 5–8 minut pieszo. ScaleaStay mieści się przy Via Giuseppe Saragat 11 w Scalei.' },
    { q: 'Czy można przyjechać pociągiem?', a: 'Tak. Dworzec Scalea–Santa Domenica Talao jest około 500 m od apartamentu, mniej więcej 8 minut pieszo.' },
  ],
};

export const getCommercialFaqItems = (language: 'it' | 'pl') => {
  const [beach, train] = COMMERCIAL_TRAVEL_FAQ[language];
  return [...getFaqItems(language).map(item => item.q === translate(language, 'faqQ1') ? beach : item), train];
};
