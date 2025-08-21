import React from 'react';
import { IntlProvider } from 'react-intl';
import AssigneeInput from '.';
import messages from './messages';

export default {
  title: 'Components/Issue/AssigneeInput',
  component: AssigneeInput,
  tags: ['autodocs'],
};

const intlMessages = Object.values(messages).reduce((acc, msg) => {
  acc[msg.id] = msg.defaultMessage;
  return acc;
}, {} as Record<string, string>);

export const Default = () => (
  <IntlProvider locale="en" messages={intlMessages}>
    <div className="p-4 max-w-md">
      <AssigneeInput
        onEmailsChange={(emails) => console.log('Assignees Emails:', emails)}
      />
    </div>
  </IntlProvider>
);

export const CustomStyled = () => (
  <IntlProvider locale="en" messages={intlMessages}>
    <div className="p-4 max-w-md">
      <AssigneeInput
        className="bg-white dark:bg-zinc-900 p-4 border-2 border-gray-400 rounded-xl text-gray-700 font-medium"
        onEmailsChange={(emails) => console.log('Assignees Email:', emails)}
      />
    </div>
  </IntlProvider>
);
