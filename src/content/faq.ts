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
}> = {
  ru: {
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    availabilityQuestion: 'Как проверить свободные даты?',
    availabilityAnswer: "Напишите даты и число гостей в WhatsApp — владелец проверит свободные даты и сообщит стоимость.",
    shopQuestion: 'Есть ли рядом магазины?',
    shopAnswer: 'Да. Interspar находится примерно в 230 м от ScaleaStay — около 3 минут пешком.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    availabilityQuestion: 'How can I check available dates?',
    availabilityAnswer: "Send your dates and number of guests on WhatsApp. The owner will check availability and share the price.",
    shopQuestion: 'Are there shops nearby?',
    shopAnswer: 'Yes. Interspar is about 230 m from ScaleaStay, around a 3-minute walk.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    availabilityQuestion: 'Come posso verificare le date disponibili?',
    availabilityAnswer: "Invia date e numero di ospiti su WhatsApp: il proprietario verificherà la disponibilità e ti comunicherà il prezzo.",
    shopQuestion: 'Ci sono negozi nelle vicinanze?',
    shopAnswer: 'Sì. Interspar si trova a circa 230 m da ScaleaStay, circa 3 minuti a piedi.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    availabilityQuestion: 'Wie kann ich freie Termine prüfen?',
    availabilityAnswer: "Senden Sie Reisedaten und Gästezahl per WhatsApp. Der Eigentümer prüft die Verfügbarkeit und nennt den Preis.",
    shopQuestion: 'Gibt es Geschäfte in der Nähe?',
    shopAnswer: 'Ja. Interspar liegt etwa 230 m von ScaleaStay entfernt, rund 3 Gehminuten.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    availabilityQuestion: 'Jak ověřit volné termíny?',
    availabilityAnswer: "Pošlete termín a počet hostů přes WhatsApp. Majitel ověří dostupnost a sdělí cenu.",
    shopQuestion: 'Jsou v okolí obchody?',
    shopAnswer: 'Ano. Interspar je přibližně 230 m od ScaleaStay, asi 3 minuty pěšky.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
  },
  pl: {
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
    { q: t('faqQ7'), a: t('faqA7') },
    { q: copy.shopQuestion, a: copy.shopAnswer },
    { q: copy.beachQuestion, a: copy.beachAnswer },
  ];
};
