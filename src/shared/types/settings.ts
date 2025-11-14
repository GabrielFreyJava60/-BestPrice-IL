export type Language = 'he' | 'en' | 'ru';
export type Theme = 'light' | 'dark' | 'auto';

export interface Settings {
  language: Language;
  theme: Theme;
  preferredChain: 'shufersal' | 'ramilevy' | 'victory' | null;
  notificationsEnabled: boolean;
  isPro: boolean;
  adsEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  language: 'he',
  theme: 'auto',
  preferredChain: null,
  notificationsEnabled: true,
  isPro: false,
  adsEnabled: true,
};

