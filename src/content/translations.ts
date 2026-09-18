import { TRANSLATIONS } from '../constants';
import { PL_TRANSLATIONS } from '../locales/pl';

export const ALL_TRANSLATIONS: Record<string, Record<string, string>> = {
  ...TRANSLATIONS,
  pl: PL_TRANSLATIONS,
};

const CONTENT_OVERRIDES: Record<string, Record<string, string>> = {
  ru: {
    apt1Desc: "Апартаменты с одной спальней и собственной террасой. Готовьте на оборудованной кухне, отдыхайте после пляжа и выбирайте удобный для вас срок поездки.",
    advLocationDesc: 'Центральная часть Скалеи: рядом магазины, прогулочные улицы и основные городские маршруты.',
    advSeaDesc: 'Ближайший пляж — 600 м, около 5–8 минут пешком. Точный пешеходный маршрут показан в разделе «Маршруты».',
    advSupermarket: 'Магазины рядом',
    advSupermarketDesc: 'В центральной части Скалеи удобно покупать продукты и всё необходимое для отдыха.',
    faqA1: 'Мы находимся по адресу Via Giuseppe Saragat 11 в центральной части Скалеи. До ближайшего пляжа — 600 м, обычно около 5–8 минут пешком. Точный маршрут можно открыть в разделе «Маршруты».',
    beachDistance: 'Пляж 5–8 мин',
    beachRouteLabel: 'Маршрут к пляжу',
    byPlaneDesc: 'Ближайший международный аэропорт — Lamezia Terme (SUF): Airlink до Lamezia Terme Centrale, затем поезд до Scalea или поездка на автомобиле.',
    routeDetailsDesc: 'Точные маршруты к пляжу, от станции и из аэропорта собраны в интерактивном разделе. Для автомобиля используйте координаты дома; гостевая парковка предусмотрена.',
    flawlessServiceDesc: 'AI-консьерж 24/7, понятные маршруты и помощь с информацией для подготовки поездки.',
    taItem4: 'Тем, кому важно удобно покупать продукты и всё необходимое рядом с квартирой.',
  },
  en: {
    apt1Desc: "A one-bedroom apartment with your own terrace. Prepare meals in the equipped kitchen, unwind after the beach and stay for a short break or a longer visit.",
    advLocationDesc: 'Central Scalea, with shops, walking streets and the main local routes nearby.',
    advSeaDesc: 'The nearest beach is 600 m away, about a 5–8 minute walk. The exact walking route is shown in the interactive Routes section.',
    advSupermarket: 'Shops nearby',
    advSupermarketDesc: 'Groceries and everyday holiday essentials are easy to buy in central Scalea.',
    faqA1: 'We are located at Via Giuseppe Saragat 11 in central Scalea. The nearest beach is 600 m away, usually about a 5–8 minute walk. The exact route can be opened in the Routes section.',
    beachDistance: 'Beach 5–8 min',
    beachRouteLabel: 'View beach route',
    byPlaneDesc: 'The nearest international airport is Lamezia Terme (SUF): take Airlink to Lamezia Terme Centrale, then a train to Scalea, or continue by car.',
    routeDetailsDesc: 'Precise routes to the beach, from the station and from the airport are collected in the interactive section. Drivers can use the apartment coordinates; guest parking is available.',
    flawlessServiceDesc: 'A 24/7 AI concierge, clear routes and practical information to help prepare your trip.',
    taItem4: 'Guests who want groceries and everyday essentials conveniently available near the apartment.',
  },
  it: {
    apt1Desc: "Un appartamento con una camera da letto e una terrazza tutta per te. Prepara i pasti nella cucina attrezzata, rilassati dopo la spiaggia e scegli tra una breve vacanza e un soggiorno più lungo.",
    advLocationDesc: 'Zona centrale di Scalea, con negozi, vie per passeggiare e principali collegamenti urbani nelle vicinanze.',
    advSeaDesc: 'La spiaggia più vicina dista 600 m, circa 5–8 minuti a piedi. Il percorso pedonale preciso è mostrato nella sezione interattiva «Percorsi».',
    advSupermarket: 'Negozi nelle vicinanze',
    advSupermarketDesc: 'Nel centro di Scalea è facile acquistare generi alimentari e tutto il necessario per il soggiorno.',
    faqA1: 'Ci troviamo in Via Giuseppe Saragat 11, nella zona centrale di Scalea. La spiaggia più vicina dista 600 m, normalmente circa 5–8 minuti a piedi. Il percorso preciso si può aprire nella sezione «Percorsi».',
    beachDistance: 'Spiaggia 5–8 min',
    beachRouteLabel: 'Vedi il percorso per la spiaggia',
    byPlaneDesc: 'L’aeroporto internazionale più vicino è Lamezia Terme (SUF): Airlink fino a Lamezia Terme Centrale, poi treno per Scalea oppure proseguimento in auto.',
    routeDetailsDesc: 'I percorsi precisi verso la spiaggia, dalla stazione e dall’aeroporto sono raccolti nella sezione interattiva. In auto si possono usare le coordinate dell’appartamento; è disponibile il parcheggio per gli ospiti.',
    flawlessServiceDesc: 'Concierge AI 24/7, percorsi chiari e informazioni pratiche per preparare il viaggio.',
    taItem4: 'A chi desidera acquistare comodamente generi alimentari e beni essenziali vicino all’appartamento.',
  },
  de: {
    apt1Desc: "Eine Ferienwohnung mit einem Schlafzimmer und eigener Terrasse. Kochen Sie in der ausgestatteten Küche, entspannen Sie nach dem Strandbesuch und bleiben Sie für einen Kurzurlaub oder länger.",
    advLocationDesc: 'Zentrale Lage in Scalea mit Geschäften, Spazierstraßen und den wichtigsten örtlichen Verbindungen in der Nähe.',
    advSeaDesc: 'Der nächste Strand ist 600 m entfernt, etwa 5–8 Gehminuten. Die genaue Fußroute wird im interaktiven Bereich „Routen“ angezeigt.',
    advSupermarket: 'Geschäfte in der Nähe',
    advSupermarketDesc: 'Lebensmittel und alles Wichtige für den Urlaub lassen sich im Zentrum von Scalea bequem einkaufen.',
    faqA1: 'Wir befinden uns in der Via Giuseppe Saragat 11 im zentralen Teil von Scalea. Der nächste Strand ist 600 m entfernt, normalerweise etwa 5–8 Gehminuten. Die genaue Route kann im Bereich „Routen“ geöffnet werden.',
    beachDistance: 'Strand 5–8 Min.',
    beachRouteLabel: 'Strandroute anzeigen',
    byPlaneDesc: 'Der nächstgelegene internationale Flughafen ist Lamezia Terme (SUF): mit Airlink nach Lamezia Terme Centrale, anschließend mit dem Zug nach Scalea oder weiter mit dem Auto.',
    routeDetailsDesc: 'Genaue Routen zum Strand, vom Bahnhof und vom Flughafen sind im interaktiven Bereich zusammengefasst. Für die Anfahrt mit dem Auto können die Koordinaten der Unterkunft genutzt werden; Gästeparkplätze sind vorhanden.',
    flawlessServiceDesc: 'Ein AI-Concierge rund um die Uhr, klare Routen und praktische Informationen zur Reisevorbereitung.',
    taItem4: 'Für Gäste, die Lebensmittel und Dinge des täglichen Bedarfs bequem in der Nähe der Unterkunft kaufen möchten.',
  },
  cs: {
    apt1Desc: "Apartmán s jednou ložnicí a vlastní terasou. Připravte si jídlo ve vybavené kuchyni, odpočiňte si po návratu z pláže a přijeďte na krátkou dovolenou i delší pobyt.",
    advLocationDesc: 'Centrální část města Scalea s obchody, pěšími ulicemi a hlavními místními trasami v okolí.',
    advSeaDesc: 'Nejbližší pláž je 600 m daleko, přibližně 5–8 minut pěšky. Přesná pěší trasa je zobrazena v interaktivní sekci „Trasy“.',
    advSupermarket: 'Obchody v okolí',
    advSupermarketDesc: 'Potraviny a vše potřebné pro dovolenou lze pohodlně nakoupit v centru města Scalea.',
    faqA1: 'Nacházíme se na adrese Via Giuseppe Saragat 11 v centrální části města Scalea. Nejbližší pláž je 600 m daleko, obvykle přibližně 5–8 minut pěšky. Přesnou trasu lze otevřít v sekci „Trasy“.',
    beachDistance: 'Pláž 5–8 min',
    beachRouteLabel: 'Zobrazit trasu na pláž',
    byPlaneDesc: 'Nejbližší mezinárodní letiště je Lamezia Terme (SUF): Airlink do Lamezia Terme Centrale, poté vlak do Scalea nebo pokračování autem.',
    routeDetailsDesc: 'Přesné trasy na pláž, z nádraží a z letiště jsou soustředěny v interaktivní sekci. Pro cestu autem lze použít souřadnice apartmánu; parkování pro hosty je k dispozici.',
    flawlessServiceDesc: 'AI concierge 24/7, přehledné trasy a praktické informace pro přípravu cesty.',
    taItem4: 'Pro hosty, kteří chtějí pohodlně nakupovat potraviny a běžné potřeby v okolí apartmánu.',
  },
};

export const translate = (language: string, key: string): string =>
  CONTENT_OVERRIDES[language]?.[key] || ALL_TRANSLATIONS[language]?.[key] || key;
