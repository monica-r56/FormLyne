import { catchError } from '@utils/sentry';

describe('catchError', () => {
  it('should log error message with title and error object', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const props = {
      title: 'Test Title',
      error: Error('Test error message'),
    };
    catchError(props);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Test Title error: ', 'Test error message');
    consoleErrorSpy.mockRestore();
  });

  it('should handle error object without message property', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const props = {
      title: 'Test Title',
      error: Error('Some value'),
    };
    catchError(props);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Test Title error: ', 'Some value');
    consoleErrorSpy.mockRestore();
  });
});
