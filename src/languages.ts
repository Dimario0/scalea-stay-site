import { LANGUAGES as BASE_LANGUAGES } from './constants';

export type SiteLanguage = {
  code: string;
  name: string;
  flag: string;
};

export const LANGUAGES: SiteLanguage[] = [
  ...BASE_LANGUAGES,
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];
