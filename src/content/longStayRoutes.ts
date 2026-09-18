export const LONG_STAY_ROUTES = {
  ru: { path: '/ru/zimnee-prozhivanie-scalea/', label: 'Зимнее и длительное проживание', name: 'Русский', nav: 'Зимнее проживание' },
  en: { path: '/en/winter-long-stays-scalea/', label: 'Winter and longer stays', name: 'English', nav: 'Winter stays' },
  it: { path: '/it/soggiorni-lunghi-scalea/', label: 'Soggiorni lunghi e invernali', name: 'Italiano', nav: 'Soggiorni invernali' },
  de: { path: '/de/ueberwintern-scalea/', label: 'Überwintern und länger bleiben', name: 'Deutsch', nav: 'Überwintern' },
  cs: { path: '/cs/zimni-dlouhodobe-pobyty-scalea/', label: 'Zimní a delší pobyty', name: 'Čeština', nav: 'Zimní pobyty' },
  pl: { path: '/pl/zimowe-dluzsze-pobyty-scalea/', label: 'Zimowe i dłuższe pobyty', name: 'Polski', nav: 'Pobyty zimowe' },
};
export type StayLanguage = keyof typeof LONG_STAY_ROUTES;
export const getLongStayRoute = (language: string) => LONG_STAY_ROUTES[language as StayLanguage] || LONG_STAY_ROUTES.en;
