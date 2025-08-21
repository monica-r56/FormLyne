import { defineMessages, MessageDescriptor } from 'react-intl';

const messages = defineMessages({
  ariaLabel: {
    id: 'Input.ariaLabel',
    defaultMessage: 'Input Field',
  },
});

export type MessagesType = Record<keyof typeof messages, MessageDescriptor>;

export default messages;
