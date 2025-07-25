import { LANG_STORAGE_KEY, localStorageGetItem, localStorageSetItem } from '@utils/localStorageHelpers';
import { catchError } from '@utils/sentry';
import { changeLanguage, defaultLocale, translations } from '../intl';

jest.mock('@utils/localStorageHelpers', () => ({
  ...jest.requireActual('@utils/localStorageHelpers'),
  localStorageSetItem: jest.fn(),
  localStorageGetItem: jest.fn(),
}));

jest.mock('@utils/sentry', () => ({
  ...jest.requireActual('@utils/sentry'),
  catchError: jest.fn(),
}));

jest.mock('@utils/localStorageHelpers');

beforeEach(() => {
  jest.restoreAllMocks();
});
afterAll(() => {
  jest.resetAllMocks();
});

it('should update intl object correctly when changing language to "en"', () => {
  (localStorageGetItem as jest.Mock).mockReturnValue('en');

  const newIntl = changeLanguage('es');

  expect(newIntl.locale).toBe('es');
  expect(newIntl.messages).toEqual(translations.es);
  expect(document.documentElement.lang).toBe('es');
  expect(localStorageSetItem).toHaveBeenCalledWith(LANG_STORAGE_KEY, 'es');
});

it('should fallback to default locale if invalid locale string provided', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  (localStorageGetItem as jest.Mock).mockReturnValue('en');

  // @ts-expect-error : this is required to test the failure case
  const newIntl = changeLanguage('');

  expect(newIntl.locale).toBe('en');
  expect(newIntl.messages).toEqual(translations.en);
  expect(document.documentElement.lang).toBe('en');
  expect(localStorageSetItem).toHaveBeenCalledWith('lang', 'en');

  expect(consoleSpy).toHaveBeenCalled();

  consoleSpy.mockRestore();
});

it('should call the console while changeLanguage fails', () => {
  localStorage.setItem(LANG_STORAGE_KEY, 'en');
  (localStorageSetItem as jest.Mock).mockImplementation(() => {
    throw new Error('localStorage setItem failed');
  });
  const newIntl = changeLanguage('es');

  expect(newIntl.locale).toBe('es');
  expect(newIntl.messages).toEqual(translations.es);
  expect(document.documentElement.lang).toBe('es');
  expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
  expect(catchError).toHaveBeenCalled();
});

it('should return "en" when localStorage does not have LANG_STORAGE_KEY', () => {
  (localStorageGetItem as jest.Mock).mockImplementation(() => {
    throw new Error('Localstorage failure case');
  });

  const result = defaultLocale();
  expect(result).toBe('en');
  expect(catchError).toHaveBeenCalled();
});

it('should return "es" when localStorage have stored value', () => {
  (localStorageGetItem as jest.Mock).mockImplementation(() => 'es');

  const result = defaultLocale();
  expect(result).toBe('es');
});
