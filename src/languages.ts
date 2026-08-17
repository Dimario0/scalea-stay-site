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
    // Czech is shown to visitors as CZ. The internal language code stays `cs`
    // because HTML lang/hreflang use the ISO language code for Czech.
    displayCode: language.code === 'cs' ? 'cz' : language.code,
  })),
  { code: 'pl', name: 'Polski', flag: '🇵🇱', displayCode: 'pl' },
];
