import React from 'react';
import { IntlProvider } from 'react-intl';
import DatePicker from '.';
import messages from './messages';

export default {
  title: 'Components/Issue/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

const intlMessages = {
  'datepicker.dueDateLabel': 'Due Date - Issue needs to be completed by this date',
};

export const Default = () => (
  <IntlProvider locale="en" messages={intlMessages}>
    <DatePicker />
  </IntlProvider>
);

export const CustomStyled = () => (
  <IntlProvider locale="en" messages={intlMessages}>
    <DatePicker
      className="bg-white dark:bg-zinc-900 p-4 border-2 border-blue-400 rounded-xl"
      inputClassName="text-blue-700 font-semibold"
      calendarClassName="bg-blue-50 border-blue-300"
    />
  </IntlProvider>
);
