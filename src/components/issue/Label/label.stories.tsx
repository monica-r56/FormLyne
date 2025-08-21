import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import LabelDropdown, { LabelValue } from '.';
import { IntlProvider } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof LabelDropdown> = {
  title: 'Components/Issue/Label',
  component: LabelDropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LabelDropdown>;

const intlMessages = {
  [messages.bug.id]: messages.bug.defaultMessage,
  [messages.feature.id]: messages.feature.defaultMessage,
  [messages.improvement.id]: messages.improvement.defaultMessage,
};

const Template = (args: any) => (
  <IntlProvider locale="en" messages={intlMessages}>
    <LabelDropdown {...args} />
  </IntlProvider>
);

export const Default: Story = {
  render: Template,
  args: {
    value: 'Feature' as LabelValue,
  },
};

export const WithCustomOptions: Story = {
  render: Template,
  args: {
    value: 'Bug' as LabelValue,
    options: [
      { value: 'Bug', label: '🐞 Bug' },
      { value: 'Feature', label: '✨ Feature' },
      { value: 'Improvement', label: '🔧 Improvement' },
    ],
  },
};

export const DesignStory: Story = {
  render: Template,
  args: {
    value: 'Improvement' as LabelValue,
    options: [
      { value: 'Bug', label: '🐞 Bug' },
      { value: 'Feature', label: '✨ Feature' },
      { value: 'Improvement', label: '🔧 Improvement' },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xs p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-xl dark:from-zinc-800 dark:to-zinc-700">
        <Story />
      </div>
    ),
  ],
};
