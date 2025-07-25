import { AppError, catchException, createError, processSagaError } from '@utils/catchException';

describe('AppError Class', () => {
  it('should create an AppError instance with correct properties', () => {
    const message = 'Validation error';
    const details = { field: 'email', issue: 'required' };
    const type = 'ValidationError';
    const statusCode = 400;

    const error = new AppError(message, details, type, statusCode);

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe(message);
    expect(error.details).toEqual(details);
    expect(error.type).toBe(type);
    expect(error.statusCode).toBe(statusCode);
    expect(error.name).toBe(type);
    expect(error.stack).toBeDefined();
  });

  it('should set default type to UnknownError', () => {
    const message = 'An unknown error occurred';

    const error = new AppError(message);

    expect(error.type).toBe('UnknownError');
  });
});

describe('createError Function', () => {
  it('should create an AppError instance using the provided arguments', () => {
    const message = 'API error';
    const details = { endpoint: '/users' };
    const type = 'APIError';
    const statusCode = 500;

    const error = createError(message, details, type, statusCode);

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe(message);
    expect(error.details).toEqual(details);
    expect(error.type).toBe(type);
    expect(error.statusCode).toBe(statusCode);
  });

  it('should default type to UnknownError when not provided', () => {
    const message = 'Default error';

    const error = createError(message);

    expect(error.type).toBe('UnknownError');
  });
});

describe('catchException', () => {
  it('should create a validation error using validationError', () => {
    const message = 'Invalid input';
    const details = { field: 'username' };

    const error = catchException.validationError(message, details);

    expect(error).toBeInstanceOf(AppError);
    expect(error.type).toBe('ValidationError');
    expect(error.details).toEqual(details);
  });

  it('should create an API error using apiError', () => {
    const message = 'Failed to fetch data';
    const details = { endpoint: '/data' };
    const statusCode = 404;

    const error = catchException.apiError(message, details, statusCode);

    expect(error).toBeInstanceOf(AppError);
    expect(error.type).toBe('APIError');
    expect(error.details).toEqual(details);
    expect(error.statusCode).toBe(statusCode);
  });

  it('should create an unknown error using unknownError', () => {
    const message = 'Something went wrong';

    const error = catchException.unknownError(message);

    expect(error).toBeInstanceOf(AppError);
    expect(error.type).toBe('UnknownError');
  });
});

describe('processSagaError Function', () => {
  it('should return the original AppError if error is already an AppError', () => {
    const existingError = new AppError('Existing error');
    const result = processSagaError(existingError, 'Context message');

    expect(result).toBe(existingError);
  });

  it('should wrap a non-AppError in an AppError with context message', () => {
    const error = 'Something failed';
    const contextMessage = 'Processing saga';

    const result = processSagaError(error, contextMessage);

    expect(result).toBeInstanceOf(AppError);
    expect(result.type).toBe('UnknownError');
    expect(result.message).toBe(contextMessage);
    expect(result.details).toEqual({ originalError: error });
  });

  it('should handle objects as error and wrap them with context message', () => {
    const error = { code: 500, message: 'Server error' };
    const contextMessage = 'API call failed';

    const result = processSagaError(error, contextMessage);

    expect(result).toBeInstanceOf(AppError);
    expect(result.type).toBe('UnknownError');
    expect(result.message).toBe(contextMessage);
    expect(result.details).toEqual({ originalError: error });
  });
});
