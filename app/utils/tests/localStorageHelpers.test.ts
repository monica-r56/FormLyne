import { catchError } from '@utils/sentry';
import { appName, localStorageGetItem, localStorageSetItem } from '../localStorageHelpers';

jest.mock('@utils/sentry', () => ({
  ...jest.requireActual('@utils/sentry'),
  catchError: jest.fn(),
}));

const actualLocalStorage = window.localStorage;
beforeEach(() => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

afterAll(() => {
  jest.resetAllMocks();
  Object.defineProperty(window, 'localStorage', {
    value: actualLocalStorage,
  });
});

describe('localStorageSetItem', () => {
  it('should store the key-value pair in localStorage successfully when localStorage is available and setItem is a function', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    localStorageSetItem('testKey', 'testValue');
    expect(setItemSpy).toHaveBeenCalledWith(`${appName}-testKey`, 'testValue');
    setItemSpy.mockRestore();
  });

  it('should throw an error and log a message when localStorage is undefined or setItem is not a function', () => {
    const originalLocalStorage = global.localStorage;
    // @ts-expect-error : This for handle the testing scenario
    delete global.localStorage;

    localStorageSetItem('testKey', 'testValue');
    expect(catchError).toHaveBeenCalledWith({
      title: 'localStorage.setItem not found',
      error: Error('localStorage is not defined'),
    });

    global.localStorage = originalLocalStorage;
  });

  it('should log an error message when an exception occurs during the execution of localStorage.setItem', () => {
    const setItemMock = jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('setItem failed');
    });

    localStorageSetItem('testKey', 'testValue');
    expect(catchError).toHaveBeenCalledWith({
      title: 'localStorage.setItem not found',
      error: Error('setItem failed'),
    });

    setItemMock.mockRestore();
  });

  it('should log an error when localStorage is undefined or localStorage.setItem is not a function', () => {
    const key = 'testKey';
    const value = 'testValue';
    const consoleLogMock = jest.spyOn(console, 'log');
    const originalLocalStorage = global.localStorage;
    global.localStorage = undefined as never;

    localStorageSetItem(key, value);
    expect(catchError).toHaveBeenCalledWith({
      title: 'localStorage.setItem not found',
      error: Error('Either localStorage is undefined or localStorage.setItem is not a function'),
    });

    global.localStorage = originalLocalStorage;
    consoleLogMock.mockRestore();
  });
});

describe('localStorageGetItem', () => {
  it('should return the value associated with the given key from localStorage when the key exists', () => {
    const key = 'testKey';
    const value = 'testValue';
    const localStorageGetItemMock = jest.spyOn(localStorage, 'getItem').mockImplementation(() => value);

    const result = localStorageGetItem(key);
    expect(result).toBe(value);
    localStorageGetItemMock.mockRestore();
  });

  it('should return undefined and log an error when localStorage is undefined or localStorage.getItem is not a function', () => {
    const key = 'testKey';
    const consoleLogMock = jest.spyOn(console, 'log');
    const originalLocalStorage = global.localStorage;
    global.localStorage = undefined as never;

    const result = localStorageGetItem(key);
    expect(result).toBeUndefined();
    expect(catchError).toHaveBeenCalledWith({
      title: 'localStorage.getItem not found',
      error: Error('Either localStorage is undefined or localStorage.getItem is not a function'),
    });

    global.localStorage = originalLocalStorage;
    consoleLogMock.mockRestore();
  });

  it('should return undefined and log an error when an exception is thrown during the retrieval process', () => {
    const key = 'testKey';
    const consoleLogMock = jest.spyOn(console, 'log');
    const localStorageGetItemMock = jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('Test error');
    });

    const result = localStorageGetItem(key);
    expect(result).toBeUndefined();
    expect(catchError).toHaveBeenCalledWith({
      title: 'localStorage.getItem not found',
      error: Error('Test error'),
    });

    localStorageGetItemMock.mockRestore();
    consoleLogMock.mockRestore();
  });
});
