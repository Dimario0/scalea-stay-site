import fs from 'node:fs';

const file = 'src/constants.tsx';
const source = fs.readFileSync(file, 'utf8');

const replacements = {
  ru: {
    taItem4: 'Тем, кому важно иметь продуктовые магазины и повседневные покупки рядом.',
    byPlaneDesc: 'Ближайший аэропорт — Ламеция-Терме (SUF). Далее можно ехать через Lamezia Airlink и поезд до Скалеи либо на автомобиле; расписание лучше проверять на дату поездки.',
    routeDetailsDesc: 'Апартаменты находятся в центре Скалеи. Для поездки на машине используйте точную точку дома в навигаторе; для прибытия поездом и самолётом откройте раздел «Маршруты».',
    advSeaDesc: 'До ближайшего пляжа удобно пройти пешком; точный маршрут и актуальное время показаны в разделе «Маршруты».',
    advSupermarket: 'Магазины рядом',
    advSupermarketDesc: 'В районе есть продуктовые магазины для ежедневных покупок во время отдыха.',
    flawlessServiceDesc: 'AI-консьерж и понятные маршруты помогут спланировать прибытие и отдых в Скалее.',
    beachDistance: 'Пляж рядом',
    faqA1: 'Апартаменты находятся в центре Скалеи. Для точного пути до ближайшего пляжа откройте раздел «Маршруты»: он использует подтверждённые координаты дома и пляжа.',
    apt1Desc: 'Элегантные апартаменты рядом с морем и центром Скалеи. Современный ремонт, уютная атмосфера и удобное расположение для семейного отдыха в любое время года.\n📍 Точный путь до ближайшего пляжа доступен в разделе «Маршруты».',
  },
  en: {
    taItem4: 'Guests who value having grocery shops and everyday essentials nearby.',
    byPlaneDesc: 'The nearest airport is Lamezia Terme (SUF). Continue via Lamezia Airlink and train to Scalea, or travel by car; check the timetable for your travel date.',
    routeDetailsDesc: 'The apartment is in central Scalea. Use the confirmed home point for driving, and open the Routes section for train and airport arrival guidance.',
    advSeaDesc: 'The nearest beach is within walking distance; the exact route and current travel time are available in the Routes section.',
    advSupermarket: 'Shops nearby',
    advSupermarketDesc: 'Grocery shops for everyday purchases are available in the surrounding area.',
    flawlessServiceDesc: 'The AI concierge and clear route guidance help you plan your arrival and stay in Scalea.',
    beachDistance: 'Beach nearby',
    faqA1: 'The apartment is in central Scalea. For the exact walk to the nearest beach, open the Routes section, which uses the confirmed coordinates of the apartment and beach.',
    apt1Desc: 'Elegant apartment near the sea and central Scalea. Modern interiors, a welcoming atmosphere and a convenient location for family stays throughout the year.\n📍 The exact route to the nearest beach is available in the Routes section.',
  },
  it: {
    taItem4: 'Ospiti che desiderano avere negozi di alimentari e servizi quotidiani nelle vicinanze.',
    byPlaneDesc: 'L’aeroporto più vicino è Lamezia Terme (SUF). Si prosegue con Lamezia Airlink e il treno per Scalea oppure in auto; verifica gli orari per la data del viaggio.',
    routeDetailsDesc: 'L’appartamento si trova nel centro di Scalea. Per arrivare in auto usa il punto confermato della casa; per treno e aeroporto consulta la sezione «Percorsi».',
    advSeaDesc: 'La spiaggia più vicina è raggiungibile a piedi; il percorso esatto e il tempo aggiornato sono nella sezione «Percorsi».',
    advSupermarket: 'Negozi nelle vicinanze',
    advSupermarketDesc: 'Nella zona sono presenti negozi di alimentari utili per gli acquisti quotidiani.',
    flawlessServiceDesc: 'L’AI concierge e le indicazioni chiare aiutano a pianificare l’arrivo e il soggiorno a Scalea.',
    beachDistance: 'Spiaggia vicina',
    faqA1: 'L’appartamento si trova nel centro di Scalea. Per il percorso esatto verso la spiaggia più vicina, apri la sezione «Percorsi», basata sulle coordinate confermate dell’appartamento e della spiaggia.',
    apt1Desc: 'Elegante appartamento vicino al mare e al centro di Scalea. Interni moderni, atmosfera accogliente e posizione comoda per soggiorni in famiglia durante tutto l’anno.\n📍 Il percorso esatto verso la spiaggia più vicina è disponibile nella sezione «Percorsi».',
  },
  de: {
    taItem4: 'Gäste, denen Lebensmittelgeschäfte und Dinge des täglichen Bedarfs in der Nähe wichtig sind.',
    byPlaneDesc: 'Der nächstgelegene Flughafen ist Lamezia Terme (SUF). Weiter geht es mit Lamezia Airlink und dem Zug nach Scalea oder mit dem Auto; den Fahrplan bitte für das Reisedatum prüfen.',
    routeDetailsDesc: 'Die Ferienwohnung liegt im Zentrum von Scalea. Für die Anreise mit dem Auto nutzen Sie den bestätigten Standort; Hinweise für Bahn und Flughafen finden Sie im Bereich „Routen“.',
    advSeaDesc: 'Der nächste Strand ist zu Fuß erreichbar; die genaue Route und aktuelle Gehzeit stehen im Bereich „Routen“.',
    advSupermarket: 'Geschäfte in der Nähe',
    advSupermarketDesc: 'In der Umgebung gibt es Lebensmittelgeschäfte für Einkäufe während des Aufenthalts.',
    flawlessServiceDesc: 'Der AI-Concierge und klare Routenhinweise helfen bei der Planung von Anreise und Aufenthalt in Scalea.',
    beachDistance: 'Strand in der Nähe',
    faqA1: 'Die Ferienwohnung liegt im Zentrum von Scalea. Den genauen Fußweg zum nächsten Strand finden Sie im Bereich „Routen“; dort werden die bestätigten Koordinaten der Unterkunft und des Strandes verwendet.',
    apt1Desc: 'Elegante Ferienwohnung nahe am Meer und im Zentrum von Scalea. Moderne Ausstattung, eine angenehme Atmosphäre und eine praktische Lage für Familienaufenthalte zu jeder Jahreszeit.\n📍 Die genaue Route zum nächsten Strand finden Sie im Bereich „Routen“.',
  },
  cs: {
    taItem4: 'Hostům, kteří chtějí mít obchody s potravinami a každodenní potřeby v blízkém okolí.',
    byPlaneDesc: 'Nejbližší letiště je Lamezia Terme (SUF). Dále lze pokračovat linkou Lamezia Airlink a vlakem do města Scalea nebo autem; jízdní řád ověřte pro datum cesty.',
    routeDetailsDesc: 'Apartmán se nachází v centru města Scalea. Při cestě autem použijte potvrzený bod domu; pokyny pro příjezd vlakem a z letiště najdete v části „Trasy“.',
    advSeaDesc: 'Nejbližší pláž je dostupná pěšky; přesná trasa a aktuální doba chůze jsou uvedeny v části „Trasy“.',
    advSupermarket: 'Obchody v okolí',
    advSupermarketDesc: 'V okolí jsou obchody s potravinami pro každodenní nákupy během pobytu.',
    flawlessServiceDesc: 'AI concierge a přehledné trasy pomáhají naplánovat příjezd i pobyt ve městě Scalea.',
    beachDistance: 'Pláž v blízkosti',
    faqA1: 'Apartmán se nachází v centru města Scalea. Přesnou pěší trasu k nejbližší pláži najdete v části „Trasy“, která používá potvrzené souřadnice apartmánu a pláže.',
    apt1Desc: 'Elegantní apartmán v blízkosti moře a centra města Scalea. Moderní interiér, příjemná atmosféra a praktická poloha pro rodinné pobyty po celý rok.\n📍 Přesná trasa k nejbližší pláži je uvedena v části „Trasy“.',
  },
};

const quote = (value) => `'${value
  .replaceAll('\\', '\\\\')
  .replaceAll("'", "\\'")
  .replaceAll('\r', '')
  .replaceAll('\n', '\\n')}'`;

const expectedKeys = Object.keys(replacements.ru);
const counts = Object.fromEntries(
  Object.keys(replacements).map((lang) => [lang, Object.fromEntries(expectedKeys.map((key) => [key, 0]))])
);

let inTranslations = false;
let currentLanguage = null;
let apartmentDescriptionCount = 0;
let distanceCount = 0;
let versionCount = 0;

const lines = source.split('\n').map((line) => {
  if (/^export const SITE_DATA_VERSION = \d+;$/.test(line)) {
    versionCount += 1;
    return 'export const SITE_DATA_VERSION = 11;';
  }

  if (line.startsWith('export const TRANSLATIONS:')) {
    inTranslations = true;
    currentLanguage = null;
    return line;
  }

  if (!inTranslations) {
    if (apartmentDescriptionCount === 0 && /^    description: /.test(line)) {
      apartmentDescriptionCount += 1;
      return `    description: ${quote('Элегантные апартаменты рядом с морем и центром Скалеи. Современный ремонт, уютная атмосфера и удобное расположение для семейного отдыха в любое время года.\n📍 Точный путь до ближайшего пляжа доступен в разделе «Маршруты».')},`;
    }
    if (distanceCount === 0 && /^    distanceToSea: /.test(line)) {
      distanceCount += 1;
      return "    distanceToSea: '',";
    }
    return line;
  }

  const languageMatch = line.match(/^  (ru|en|it|de|cs): \{$/);
  if (languageMatch) {
    currentLanguage = languageMatch[1];
    return line;
  }

  if (/^  },?$/.test(line)) {
    currentLanguage = null;
    return line;
  }

  if (!currentLanguage) return line;

  const keyMatch = line.match(/^    ([A-Za-z0-9]+): /);
  if (!keyMatch) return line;

  const key = keyMatch[1];
  const replacement = replacements[currentLanguage]?.[key];
  if (replacement === undefined) return line;

  counts[currentLanguage][key] += 1;
  return `    ${key}: ${quote(replacement)},`;
});

if (versionCount !== 1 || apartmentDescriptionCount !== 1 || distanceCount !== 1) {
  throw new Error(`Top-level replacement mismatch: version=${versionCount}, description=${apartmentDescriptionCount}, distance=${distanceCount}`);
}

for (const [language, languageCounts] of Object.entries(counts)) {
  for (const [key, count] of Object.entries(languageCounts)) {
    if (count !== 1) {
      throw new Error(`Expected exactly one ${language}.${key} replacement, got ${count}`);
    }
  }
}

const output = `${lines.join('\n').replace(/\n*$/, '')}\n`;

const forbidden = [
  /400\s*(?:m\b|meters?|metres?|metri|meter|metrů|метр)/iu,
  /6[-\s]?(?:minute|minutes|minuti|minuten|minut|минут)/iu,
  /Interspar/iu,
  /1\.5\s*(?:hour|hours|ore|stunden|hodin|час)/iu,
];

for (const pattern of forbidden) {
  if (pattern.test(output)) {
    throw new Error(`Forbidden stale claim remains: ${pattern}`);
  }
}

fs.writeFileSync(file, output, 'utf8');
console.log('Source content cleanup completed and validated.');
