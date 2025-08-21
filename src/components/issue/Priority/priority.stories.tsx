import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PriorityDropdown, type PriorityValue, type PriorityOption } from '.';
import { IntlProvider } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof PriorityDropdown> = {
  title: 'Components/Issue/Priority',
  component: PriorityDropdown,
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={Object.fromEntries(
        Object.entries(messages).map(([key, msg]) => [msg.id, msg.defaultMessage])
      )}>
        <div className="p-4">
          <Story />
        </div>
      </IntlProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PriorityDropdown>;

export const Default: Story = {
  args: {
    value: 'Medium',
    onChange: (val: PriorityValue) => console.log('Selected priority:', val),
  },
};

export const Custom: Story = {
  args: {
    value: 'Urgent',
    options: [
      { value: 'No priority', label: '🟢 No priority' },
      { value: 'Urgent', label: '🔴 Urgent' },
      { value: 'High', label: '🟠 High' },
      { value: 'Medium', label: '🟡 Medium' },
      { value: 'Low', label: '🔵 Low' },
    ],
    className: 'w-60 h-auto border-2 border-purple-500 rounded-lg',
  },
};
