import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const JSONLD: React.FC = () => {
  const { t, language } = useLanguage();

  const lodgingData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "ScaleaStay",
    "description": t('heroSubtitle'),
    "url": `https://scaleastay.com/${language}/`,
    "telephone": "+420774620060",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Giuseppe Saragat 11",
      "addressLocality": "Scalea",
      "addressRegion": "Calabria",
      "postalCode": "87029",
      "addressCountry": "IT"
    },
    "image": "https://i.postimg.cc/Dz0dHGzW/Scalea.webp",
    "petsAllowed": false,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking",
        "value": true
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('faqQ1'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA1')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ2'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA2')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ3'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA3')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ4'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA4')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ5'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA5')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ6'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA6')
        }
      },
      {
        "@type": "Question",
        "name": t('faqQ7'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('faqA7')
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
};

export default JSONLD;
