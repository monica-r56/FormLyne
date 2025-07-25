import { translations } from '../app/utils/intl';

import en from '../app/locale/en.json';
import fr from '../app/locale/fr.json';
import es from '../app/locale/es.json';
import ja from '../app/locale/ja.json';

const locales = Object.keys(translations);

const messages = [
  { locale: 'en', messages: en },
  { locale: 'fr', messages: fr },
  { locale: 'es', messages: es },
  { locale: 'ja', messages: ja },
];

const formats = {}; // optional, if you have any formats

export const reactIntl = {
  defaultLocale: 'en',
  locales,
  messages,
  formats,
};
