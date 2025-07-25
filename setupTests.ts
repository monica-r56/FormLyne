/* eslint-disable @typescript-eslint/no-require-imports */
import dotenv from 'dotenv';
import '@testing-library/jest-dom';
import 'whatwg-fetch';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

dotenv.config({ path: '.env' });

// Clean up mocks after each test to prevent memory overload
afterEach(() => {
  jest.clearAllMocks();
});
