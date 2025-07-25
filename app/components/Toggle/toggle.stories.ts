import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from '@storybook/testing-library';
import { ToggleProps, Toggle } from '.';

const meta: Meta<typeof Toggle> = {
  title: 'components/Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
      description: 'Determines whether the switch is selected (controlled mode).',
      defaultValue: false,
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Determines the default state (uncontrolled mode).',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch when set to true.',
      defaultValue: false,
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size of the switch component.',
      defaultValue: 'md',
    },
    onChange: {
      action: 'value changed',
      description: 'Callback function triggered when the switch state changes.',
    },
  },
};

export default meta;

type Story = StoryObj<ToggleProps>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
  },
};

export const Small: Story = {
  args: { size: 'sm' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
  },
};

export const SelectedByDefault: Story = {
  args: { defaultSelected: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
    await userEvent.click(toggle);
  },
};

export const Controlled: Story = {
  args: { isSelected: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
  },
};

export const SmallDisabled: Story = {
  args: { size: 'sm', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await userEvent.click(toggle);
  },
};
