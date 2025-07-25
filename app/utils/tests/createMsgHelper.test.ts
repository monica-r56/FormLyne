import { MessageDescriptor } from 'react-intl';
import { createMsgGetter } from '../createMsgGetter';

jest.mock('../intl', () => ({
  intl: {
    formatMessage: jest.fn((message) => message.defaultMessage),
  },
}));

describe('createMsgGetter', () => {
  const messages: Record<string, MessageDescriptor> = {
    testKey: { defaultMessage: 'Test message' },
    anotherKey: { defaultMessage: 'Another message' },
    nonStringKey: { defaultMessage: 123 as unknown as string },
  };

  const msg = createMsgGetter(messages);

  it('should return the formatted message for a valid key', () => {
    expect(msg('testKey')).toBe('Test message');
    expect(msg('anotherKey')).toBe('Another message');
  });

  it('should return an empty string for a non-existent key', () => {
    expect(msg('missingKey' as keyof typeof messages)).toBe('');
  });

  it('should return an empty string if defaultMessage is not a string', () => {
    expect(msg('nonStringKey')).toBe('');
  });

  it('should return empty string if messagesObject is empty', () => {
    const emptyMsg = createMsgGetter({});
    expect(emptyMsg('anyKey' as keyof typeof messages)).toBe('');
  });
});
