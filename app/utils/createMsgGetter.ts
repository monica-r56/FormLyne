import { MessageDescriptor } from 'react-intl';
import { intl } from './intl';

type Messages = Record<string, MessageDescriptor>;

// Utility to extract defaultMessage strings from a react-intl messages object.
export const createMsgGetter = (messagesObject: Messages) => {
  return (key: keyof typeof messagesObject): string => {
    const message = messagesObject[key];
    if (message && typeof message.defaultMessage === 'string') {
      return intl.formatMessage(message);
    }
    return '';
  };
};
