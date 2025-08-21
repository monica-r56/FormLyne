import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddLink } from '.';
import { IntlProvider } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof AddLink> = {
  title: 'Components/Issue/Add Link',
  component: AddLink,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddLink>;

const intlMessages = Object.fromEntries(
  Object.entries(messages).map(([key, val]) => [val.id, val.defaultMessage])
);

export const Default: Story = {
  render: () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    return (
      <IntlProvider locale="en" messages={intlMessages}>
        <div className="max-w-md p-4 bg-white dark:bg-zinc-900 rounded-lg shadow">
          <AddLink
            url={url}
            title={title}
            onUrlChange={setUrl}
            onTitleChange={setTitle}
            className='border border-gray-600 rounded-lg p-4'
          />
        </div>
      </IntlProvider>
    );
  },
};

export const ResponsiveDesign: Story = {
  render: () => {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    return (
      <IntlProvider locale="en" messages={intlMessages}>
        <div className="p-4">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white dark:bg-zinc-900 rounded-xl shadow-md p-4">
            <AddLink
              url={url}
              title={title}
              onUrlChange={setUrl}
              onTitleChange={setTitle}
              className="w-full"
            />
          </div>
        </div>
      </IntlProvider>
    );
  },
};
