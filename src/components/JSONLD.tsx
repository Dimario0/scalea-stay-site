import React from 'react';
import { useLanguage } from '../context/LanguageContext';

type SeoCopy = {
  amenitiesSuffix: string;
  beachQuestion: string;
  beachAnswer: string;
};

const SEO_COPY: Record<string, SeoCopy> = {
  ru: {
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
  },
};

const JSONLD: React.FC = () => {
  const { t, language } = useLanguage();
  const copy = SEO_COPY[language] || SEO_COPY.ru;
  const pageUrl = `https://scaleastay.com/${language}/`;
  const propertyId = 'https://scaleastay.com/#property';
  const faqId = `${pageUrl}#faq`;

  const faqItems = [
    { question: t('faqQ1'), answer: t('faqA1') },
    { question: t('faqQ2'), answer: `${t('faqA2')} ${copy.amenitiesSuffix}` },
    { question: t('faqQ3'), answer: t('faqA3') },
    { question: t('faqQ4'), answer: t('faqA4') },
    { question: t('faqQ5'), answer: t('faqA5') },
    { question: t('faqQ6'), answer: t('faqA6') },
    { question: t('faqQ7'), answer: t('faqA7') },
    { question: t('faqQ8'), answer: t('faqA8') },
    { question: copy.beachQuestion, answer: copy.beachAnswer },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LodgingBusiness',
        '@id': propertyId,
        name: 'ScaleaStay',
        alternateName: 'Casa Marittima',
        identifier: 'IT078138C2VN4E3MCD',
        description: t('heroSubtitle'),
        url: pageUrl,
        mainEntityOfPage: pageUrl,
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
          latitude: 39.8122,
          longitude: 15.7853,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'reservations',
          telephone: '+420774620060',
          availableLanguage: ['ru', 'en', 'it', 'de', 'cs'],
        },
        containsPlace: {
          '@type': 'Accommodation',
          name: 'Casa Marittima',
          occupancy: {
            '@type': 'QuantitativeValue',
            value: 4,
          },
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Private parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Hair dryer', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Microwave', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Kitchen utensils', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Beach umbrella', value: true },
        ],
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Approximate distance to the nearest beach access',
            value: '400 m',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest beach access',
            value: 'Corso Mediterraneo, Snc, 87029 Scalea CS, Italy',
          },
          {
            '@type': 'PropertyValue',
            name: 'Nearest railway station',
            value: 'Scalea–Santa Domenica Talao',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': faqId,
        url: `${pageUrl}#faq`,
        inLanguage: language,
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
