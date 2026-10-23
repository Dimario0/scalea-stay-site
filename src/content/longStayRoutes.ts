export const LONG_STAY_ROUTES = {
  ru: { path: '/ru/zimnee-prozhivanie-scalea/', label: 'Зимнее и длительное проживание', rentalLink: 'Зимняя аренда в Скалее: €450/мес. + коммунальные', name: 'Русский', nav: 'Зимнее проживание' },
  en: { path: '/en/winter-long-stays-scalea/', label: 'Winter and longer stays', rentalLink: 'Winter apartment rental in Scalea: €450/month + utilities', name: 'English', nav: 'Winter stays' },
  it: { path: '/it/soggiorni-lunghi-scalea/', label: 'Soggiorni lunghi e invernali', rentalLink: 'Affitto invernale a Scalea: 450 €/mese + utenze', name: 'Italiano', nav: 'Soggiorni invernali' },
  de: { path: '/de/ueberwintern-scalea/', label: 'Überwintern und länger bleiben', rentalLink: 'Überwintern in Scalea: 450 €/Monat + Verbrauchskosten', name: 'Deutsch', nav: 'Überwintern' },
  cs: { path: '/cs/zimni-dlouhodobe-pobyty-scalea/', label: 'Zimní a delší pobyty', rentalLink: 'Zimní pronájem ve Scalee: 450 €/měsíc + energie a služby', name: 'Čeština', nav: 'Zimní pobyty' },
  pl: { path: '/pl/zimowe-dluzsze-pobyty-scalea/', label: 'Zimowe i dłuższe pobyty', rentalLink: 'Wynajem apartamentu w Scalei zimą: 450 €/mies. + media', name: 'Polski', nav: 'Pobyty zimowe' },
};
export type StayLanguage = keyof typeof LONG_STAY_ROUTES;
export const getLongStayRoute = (language: string) => LONG_STAY_ROUTES[language as StayLanguage] || LONG_STAY_ROUTES.en;
