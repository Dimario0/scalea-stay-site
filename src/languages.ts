import { LANGUAGES as BASE_LANGUAGES } from './constants';

export type SiteLanguage = {
  code: string;
  name: string;
  flag: string;
  displayCode: string;
};

export const LANGUAGES: SiteLanguage[] = [
  ...BASE_LANGUAGES.map((language) => ({
    ...language,
    // Keep the technical Czech language code as `cs` for standards/SEO,
    // while showing the familiar country-style abbreviation `CZ` in the UI.
    displayCode: language.code === 'cs' ? 'cz' : language.code,
  })),
  { code: 'pl', name: 'Polski', flag: '🇵🇱', displayCode: 'pl' },
];
