import React from 'react';
import { useLanguage } from '../context/LanguageContext';

type SeoCopy = {
  amenitiesSuffix: string;
  availabilityQuestion: string;
  availabilityAnswer: string;
  shopQuestion: string;
  shopAnswer: string;
  beachQuestion: string;
  beachAnswer: string;
  airportRouteName: string;
  airportRouteDescription: string;
  airportStep1: string;
  airportStep2: string;
  airportStep3: string;
};

const SEO_COPY: Record<string, SeoCopy> = {
  ru: {
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    availabilityQuestion: 'Как проверить свободные даты?',
    availabilityAnswer: 'Напишите нам в WhatsApp — владелец быстро проверит доступность на выбранные даты.',
    shopQuestion: 'Есть ли рядом магазины?',
    shopAnswer: 'Да. Interspar находится примерно в 230 м от ScaleaStay — около 3 минут пешком.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
    airportRouteName: 'Как добраться из аэропорта Lamezia Terme до ScaleaStay в Скалее',
    airportRouteDescription: 'Маршрут из ближайшего международного аэропорта: Airlink до Lamezia Terme Centrale, поезд до Scalea и финальный участок до апартаментов.',
    airportStep1: 'Сесть на автобус Lamezia Airlink от аэропорта до станции Lamezia Terme Centrale.',
    airportStep2: 'Доехать поездом Trenitalia до станции Scalea–Santa Domenica Talao.',
    airportStep3: 'От станции продолжить на такси, трансфере или по локальному маршруту до ScaleaStay.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    availabilityQuestion: 'How can I check available dates?',
    availabilityAnswer: 'Message us on WhatsApp and the owner will quickly check availability for your dates.',
    shopQuestion: 'Are there shops nearby?',
    shopAnswer: 'Yes. Interspar is about 230 m from ScaleaStay, around a 3-minute walk.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
    airportRouteName: 'How to reach ScaleaStay in Scalea from Lamezia Terme Airport',
    airportRouteDescription: 'Route from the nearest international airport: Airlink to Lamezia Terme Centrale, train to Scalea and the final transfer to the apartment.',
    airportStep1: 'Take the Lamezia Airlink bus from the airport to Lamezia Terme Centrale station.',
    airportStep2: 'Take a Trenitalia train to Scalea–Santa Domenica Talao station.',
    airportStep3: 'Continue from the station by taxi, transfer or the local route to ScaleaStay.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    availabilityQuestion: 'Come posso verificare le date disponibili?',
    availabilityAnswer: 'Scrivi su WhatsApp e il proprietario verificherà rapidamente la disponibilità per le tue date.',
    shopQuestion: 'Ci sono negozi nelle vicinanze?',
    shopAnswer: 'Sì. Interspar si trova a circa 230 m da ScaleaStay, circa 3 minuti a piedi.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
    airportRouteName: 'Come raggiungere ScaleaStay a Scalea dall’aeroporto di Lamezia Terme',
    airportRouteDescription: 'Percorso dall’aeroporto internazionale più vicino: Airlink fino a Lamezia Terme Centrale, treno per Scalea e ultimo tratto verso l’appartamento.',
    airportStep1: 'Prendere la navetta Lamezia Airlink dall’aeroporto alla stazione Lamezia Terme Centrale.',
    airportStep2: 'Prendere un treno Trenitalia fino alla stazione Scalea–Santa Domenica Talao.',
    airportStep3: 'Dalla stazione proseguire in taxi, con transfer o con il percorso locale fino a ScaleaStay.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    availabilityQuestion: 'Wie kann ich freie Termine prüfen?',
    availabilityAnswer: 'Schreiben Sie uns auf WhatsApp; der Eigentümer prüft die Verfügbarkeit für Ihre Daten schnell.',
    shopQuestion: 'Gibt es Geschäfte in der Nähe?',
    shopAnswer: 'Ja. Interspar liegt etwa 230 m von ScaleaStay entfernt, rund 3 Gehminuten.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
    airportRouteName: 'Anreise vom Flughafen Lamezia Terme zu ScaleaStay in Scalea',
    airportRouteDescription: 'Route vom nächstgelegenen internationalen Flughafen: Airlink nach Lamezia Terme Centrale, Zug nach Scalea und letzter Abschnitt zum Apartment.',
    airportStep1: 'Mit dem Lamezia Airlink Bus vom Flughafen zum Bahnhof Lamezia Terme Centrale fahren.',
    airportStep2: 'Mit einem Trenitalia-Zug bis Scalea–Santa Domenica Talao fahren.',
    airportStep3: 'Vom Bahnhof per Taxi, Transfer oder über die lokale Route zu ScaleaStay weiterfahren.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    availabilityQuestion: 'Jak ověřit volné termíny?',
    availabilityAnswer: 'Napište na WhatsApp a majitel rychle ověří dostupnost pro vaše termíny.',
    shopQuestion: 'Jsou v okolí obchody?',
    shopAnswer: 'Ano. Interspar je přibližně 230 m od ScaleaStay, asi 3 minuty pěšky.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
    airportRouteName: 'Jak se dostat z letiště Lamezia Terme do ScaleaStay ve Scalee',
    airportRouteDescription: 'Trasa z nejbližšího mezinárodního letiště: Airlink do Lamezia Terme Centrale, vlak do Scalea a poslední úsek k apartmánu.',
    airportStep1: 'Jeďte autobusem Lamezia Airlink z letiště na nádraží Lamezia Terme Centrale.',
    airportStep2: 'Pokračujte vlakem Trenitalia do stanice Scalea–Santa Domenica Talao.',
    airportStep3: 'Z nádraží pokračujte taxíkem, transferem nebo místní trasou do ScaleaStay.',
  },
  pl: {
    amenitiesSuffix: 'W apartamencie są także suszarka do włosów, kuchenka mikrofalowa i podstawowe wyposażenie kuchenne.',
    availabilityQuestion: 'Jak sprawdzić wolne terminy?',
    availabilityAnswer: 'Napisz na WhatsApp, a właściciel szybko sprawdzi dostępność dla wybranych terminów.',
    shopQuestion: 'Czy w pobliżu są sklepy?',
    shopAnswer: 'Tak. Interspar znajduje się około 230 m od ScaleaStay, czyli około 3 minuty pieszo.',
    beachQuestion: 'Co jest dostępne na dzień na plaży?',
    beachAnswer: 'Goście mają do dyspozycji parasol plażowy, który można zabrać nad morze.',
    airportRouteName: 'Jak dojechać z lotniska Lamezia Terme do ScaleaStay w Scalei',
    airportRouteDescription: 'Trasa z najbliższego międzynarodowego lotniska: Airlink do Lamezia Terme Centrale, pociąg do Scalei i ostatni odcinek do apartamentu.',
    airportStep1: 'Wsiądź do autobusu Lamezia Airlink z lotniska do stacji Lamezia Terme Centrale.',
    airportStep2: 'Jedź pociągiem Trenitalia do stacji Scalea–Santa Domenica Talao.',
    airportStep3: 'Ze stacji jedź dalej taksówką, transferem lub lokalną trasą do ScaleaStay.',
  },
};

const JSONLD: React.FC = () => {
  const { t, language } = useLanguage();
  const copy = SEO_COPY[language] || SEO_COPY.ru;
  const pageUrl = `https://scaleastay.com/${language}/`;

  const websiteId = 'https://scaleastay.com/#website';
  const webPageId = `${pageUrl}#webpage`;
  const propertyId = 'https://scaleastay.com/#property';
  const accommodationId = 'https://scaleastay.com/#scaleastay-apartment';
  const scaleaId = 'https://scaleastay.com/#scalea';
  const beachId = 'https://scaleastay.com/#nearest-beach';
  const stationId = 'https://scaleastay.com/#scalea-station';
  const airportId = 'https://scaleastay.com/#lamezia-airport';
  const faqId = `${pageUrl}#faq`;
  const airportRouteId = `${pageUrl}#airport-route`;

  const homeMapUrl = 'https://www.google.com/maps/search/?api=1&query=39.8074152%2C15.7949133';
  const beachMapUrl = 'https://www.google.com/maps/search/?api=1&query=39.8064465%2C15.7889826';
  const stationMapUrl = 'https://www.google.com/maps/search/?api=1&query=Scalea-Santa%20Domenica%20Talao%20railway%20station';
  const airportMapUrl = 'https://www.google.com/maps/search/?api=1&query=Lamezia%20Terme%20International%20Airport';

  const faqItems = [
    { question: t('faqQ1'), answer: t('faqA1') },
    { question: t('faqQ2'), answer: `${t('faqA2')} ${copy.amenitiesSuffix}` },
    { question: t('faqQ3'), answer: t('faqA3') },
    { question: t('faqQ4'), answer: t('faqA4') },
    { question: t('faqQ5'), answer: t('faqA5') },
    { question: copy.availabilityQuestion, answer: copy.availabilityAnswer },
    { question: t('faqQ7'), answer: t('faqA7') },
    { question: copy.shopQuestion, answer: copy.shopAnswer },
    { question: copy.beachQuestion, answer: copy.beachAnswer },
  ];

  const airportSteps = [copy.airportStep1, copy.airportStep2, copy.airportStep3];
  const amenityFeature = [
    { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Hair dryer', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Microwave', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchen utensils', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Beach umbrella', value: true },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': webPageId,
        url: pageUrl,
        name: 'ScaleaStay — holiday apartment in Scalea',
        description: t('heroSubtitle'),
        inLanguage: language,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': propertyId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://i.postimg.cc/Dz0dHGzW/Scalea.webp',
        },
        about: [
          { '@id': propertyId },
          { '@id': accommodationId },
          { '@id': scaleaId },
        ],
        mentions: [
          { '@id': beachId },
          { '@id': stationId },
          { '@id': airportId },
          { '@id': airportRouteId },
        ],
      },
      {
        '@type': 'City',
        '@id': scaleaId,
        name: 'Scalea',
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Calabria',
        },
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Calabria',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'LodgingBusiness',
        '@id': propertyId,
        name: 'ScaleaStay',
        identifier: 'IT078138C2VN4E3MCD',
        description: t('heroSubtitle'),
        url: pageUrl,
        mainEntityOfPage: { '@id': webPageId },
        hasMap: homeMapUrl,
        telephone: '+420774620060',
        image: [
          'https://i.postimg.cc/Dz0dHGzW/Scalea.webp',
          'https://i.postimg.cc/rmgf10N5/IMG_0338.jpg',
          'https://i.postimg.cc/vBX0rgth/IMG_0349.jpg',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Giuseppe Saragat 11',
          addressLocality: 'Scalea',
          addressRegion: 'Calabria',
          postalCode: '87029',
          addressCountry: 'IT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.8074152,
          longitude: 15.7949133,
        },
        containedInPlace: { '@id': scaleaId },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'reservations',
          telephone: '+420774620060',
          availableLanguage: ['ru', 'en', 'it', 'de', 'cs', 'pl'],
        },
        containsPlace: { '@id': accommodationId },
        amenityFeature,
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Nearest beach walking distance',
            value: '600 m; approximately 5–8 minutes on foot',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest beach access coordinates',
            value: '39.8064465, 15.7889826',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest Interspar walking distance',
            value: '230 m; approximately 3 minutes on foot',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest railway station',
            value: 'Scalea–Santa Domenica Talao; approximately 500 m / 8 minutes on foot',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest international airport',
            value: 'Lamezia Terme International Airport (SUF), approximately 120 km from Scalea',
          },
          {
            '@type': 'PropertyValue',
            name: 'Airport public transport route',
            value: 'Lamezia Airlink to Lamezia Terme Centrale, Trenitalia train to Scalea–Santa Domenica Talao, then local transfer to ScaleaStay',
          },
        ],
        subjectOf: [
          { '@id': faqId },
          { '@id': airportRouteId },
        ],
      },
      {
        '@type': 'Accommodation',
        '@id': accommodationId,
        name: 'ScaleaStay apartment',
        containedInPlace: { '@id': propertyId },
        mainEntityOfPage: { '@id': webPageId },
        occupancy: {
          '@type': 'QuantitativeValue',
          value: 4,
        },
        amenityFeature,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.8074152,
          longitude: 15.7949133,
        },
      },
      {
        '@type': 'TouristAttraction',
        '@id': beachId,
        name: 'Nearest beach access to ScaleaStay',
        description: 'Nearest confirmed beach access point used by the route section on ScaleaStay.',
        hasMap: beachMapUrl,
        containedInPlace: { '@id': scaleaId },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 39.8064465,
          longitude: 15.7889826,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Scalea',
          addressRegion: 'Calabria',
          postalCode: '87029',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'TrainStation',
        '@id': stationId,
        name: 'Scalea–Santa Domenica Talao',
        hasMap: stationMapUrl,
        containedInPlace: { '@id': scaleaId },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Scalea',
          addressRegion: 'Calabria',
          postalCode: '87029',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'Airport',
        '@id': airportId,
        name: 'Lamezia Terme International Airport',
        alternateName: 'Aeroporto Internazionale di Lamezia Terme',
        iataCode: 'SUF',
        hasMap: airportMapUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lamezia Terme',
          addressRegion: 'Calabria',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        url: `${pageUrl}#faq`,
        inLanguage: language,
        isPartOf: { '@id': webPageId },
        about: { '@id': propertyId },
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': airportRouteId,
        name: copy.airportRouteName,
        description: copy.airportRouteDescription,
        url: `${pageUrl}#routes`,
        inLanguage: language,
        isPartOf: { '@id': webPageId },
        about: { '@id': propertyId },
        mentions: [
          { '@id': airportId },
          { '@id': stationId },
          { '@id': accommodationId },
        ],
        step: airportSteps.map((text, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: text,
          text,
        })),
        tool: [
          { '@type': 'HowToTool', name: 'Lamezia Airlink' },
          { '@type': 'HowToTool', name: 'Trenitalia' },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default JSONLD;
