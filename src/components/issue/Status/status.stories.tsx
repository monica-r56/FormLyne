import type { Meta, StoryObj } from '@storybook/react';
import { StatusDropdown, type StatusOption } from '.';
import { IntlProvider } from 'react-intl';
import messages from './messages';
 
const meta: Meta<typeof StatusDropdown> = {
  title: 'components/Issue/StatusDropdown',
  component: StatusDropdown,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['Backlog', 'To do', 'In Progress', 'Done', 'Cancelled', 'Duplicate'],
      description: 'Selected status value',
    },
    options: {
      description: 'Custom list of dropdown options (optional)',
    },
    className: {
      control: 'text',
      description: 'CSS class for outer wrapper',
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={Object.fromEntries(Object.entries(messages).map(([k, v]) => [v.id, v.defaultMessage]))}>
        <Story />
      </IntlProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatusDropdown>;

export const Default: Story = {
  args: {
    value: 'To do',
  },
};

export const CustomOptions: Story = {
  args: {
    value: 'Custom 1' as any,
    options: [
      { label: 'Custom 1', value: 'Custom 1' as any },
      { label: 'Custom 2', value: 'Custom 2' as any },
    ],
  },
};

export const CustomStyled: Story = {
  args: {
    value: 'Backlog',
  },
  render: (args) => (
    <div className="p-2 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800 rounded-lg shadow-xl max-w-xs w-full">
      <StatusDropdown
        {...args}
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      />
    </div>
  ),
};
