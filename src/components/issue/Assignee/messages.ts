import { defineMessages } from 'react-intl';

const messages = defineMessages({
  assigneeLabel: {
    id: 'assigneeInput.label',
    defaultMessage: 'Add one or more email addresses separated by commas',
  },
  assigneePlaceholder: {
    id: 'assigneeInput.placeholder',
    defaultMessage: 'email1@example.com, email2@example.com',
  },
});

export default messages;
