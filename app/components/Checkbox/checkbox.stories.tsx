import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Checkbox } from '.';

const meta = {
  title: 'components/Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: { type: 'boolean' } },
    indeterminate: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    error: { control: { type: 'boolean' } },
    variant: { table: { disable: true } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    checked: true,
  },
};

export const ErrorUnchecked: Story = {
  args: {
    error: true,
    checked: false,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    defaultChecked: true,
  },
};

export const ErrorIndeterminate: Story = {
  args: {
    error: true,
    checked: true,
    indeterminate: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const DisabledCheckedIndeterminate: Story = {
  args: {
    disabled: true,
    checked: true,
    indeterminate: true,
  },
};

export const DisabledErrorUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
    error: true,
  },
};

export const DisabledErrorChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    error: true,
  },
};

export const DisabledErrorCheckedIndeterminate: Story = {
  args: {
    disabled: true,
    checked: true,
    error: true,
    indeterminate: true,
  },
};
