import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown } from '.';

const meta: Meta<typeof Dropdown> = {
  title: 'components/molecules/Dropdown',
  component: Dropdown,
};

export default meta;

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
];

export const Basic: StoryObj<typeof Dropdown> = {
  args: {
    options: mockOptions,
  },
  render: (args) => (
    <div style={{ maxWidth: '272px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const Searchable: StoryObj<typeof Dropdown> = {
  args: {
    options: mockOptions,
    isSearchable: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '272px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const SearchableAndCreatable: StoryObj<typeof Dropdown> = {
  args: {
    options: mockOptions,
    isCreatable: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '272px' }}>
      <Dropdown {...args} />
    </div>
  ),
};
