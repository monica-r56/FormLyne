import { translations } from '../src/app/utils/intl';

import en from '../src/app/locale/en.json';
import fr from '../src/app/locale/fr.json';
import de from '../src/app/locale/de.json';
import es from '../src/app/locale/es.json';
import ja from '../src/app/locale/ja.json';

// Dynamically create the list of locales
const locales = Object.keys(translations);

// Map each locale to its messages
const messages = [
  { locale: 'en', messages: en },
  { locale: 'fr', messages: fr },
  { locale: 'de', messages: de },
  { locale: 'es', messages: es },
  { locale: 'ja', messages: ja },
];

// Optional: if you want to support custom date/number formats per locale
const formats = {};

export const reactIntl = {
  defaultLocale: 'en',
  locales,
  messages,
  formats,
};
