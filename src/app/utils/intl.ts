import { IntlShape, createIntl, createIntlCache } from 'react-intl';
import { get } from 'lodash';
import { LANG_STORAGE_KEY, localStorageGetItem, localStorageSetItem } from './localStorageHelpers';
import { catchError } from './sentry';

import en from '../locale/en.json';
import fr from '../locale/fr.json';
import de from '../locale/de.json';
import es from '../locale/es.json';
import ja from '../locale/ja.json';

// 1. Add all your supported translations here
export const translations: Record<string, Record<string, string>> = {
  en,
  fr,
  de,
  es,
  ja,
};

// 2. Optional - for toolbar/dropdown labels or internal mapping
export const translationLabels: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  ja: '日本語',
};

export const DEFAULT_LOCALE_CONSTANT = 'en';

export const defaultLocale = (): keyof typeof translations => {
  try {
    const val = localStorageGetItem(LANG_STORAGE_KEY);
    if (val && translations[val]) {
      return val as keyof typeof translations;
    }
    return DEFAULT_LOCALE_CONSTANT;
  } catch (error) {
    catchError({
      title: 'An error occurred in defaultLocale function',
      error: error as Error,
    });
    return DEFAULT_LOCALE_CONSTANT;
  }
};

export const DEFAULT_LOCALE: keyof typeof translations = defaultLocale();

export const cache = createIntlCache();

const translationContent = translations[DEFAULT_LOCALE];

export let intl = createIntl({ locale: DEFAULT_LOCALE, messages: translationContent }, cache);

export let fmt = intl.formatMessage;

export const changeLanguage = (newLocale: keyof typeof translations): IntlShape => {
  try {
    const parsedLocale =
      (newLocale || '').trim().length && get(translations, newLocale) ? newLocale : DEFAULT_LOCALE;

    const translationContent = get(translations, parsedLocale);
    intl = createIntl({ locale: parsedLocale, messages: translationContent }, cache);
    fmt = intl.formatMessage;

    if (typeof document !== 'undefined') {
      document.documentElement.lang = parsedLocale;
    }

    localStorageSetItem(LANG_STORAGE_KEY, parsedLocale);
    return intl;
  } catch (error) {
    catchError({
      title: 'An error occurred in changeLanguage function',
      error: error as Error,
    });
    return intl;
  }
};

export default intl;
