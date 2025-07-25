import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect } from '@storybook/jest';
import { fireEvent, screen, waitFor } from '@storybook/testing-library';
import CheckboxGroup from '.';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'components/molecules/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    indeterminate: {
      control: 'boolean',
    },
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const sampleOptions = [
  { label: 'Option A', value: 'a', description: 'Description A' },
  { label: 'Option B', value: 'b', description: 'Description B' },
  { label: 'Option C', value: 'c' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    defaultValues: ['b'],
    name: 'default-checkbox-group',
  },
  play: async () => {
    const optionB = screen.getAllByRole('checkbox');
    expect(optionB[1]).toBeChecked();

    fireEvent.click(optionB[1]);
    await waitFor(() => {
      expect(optionB[1]).not.toBeChecked();
    });
  },
};

export const Horizontal: Story = {
  args: {
    options: sampleOptions,
    defaultValues: ['b'],
    name: 'horizontal-checkbox-group',
    orientation: 'horizontal',
  },
  play: async () => {
    const optionB = screen.getAllByRole('checkbox');
    expect(optionB[1]).toBeChecked();

    fireEvent.click(optionB[1]);
    await waitFor(() => {
      expect(optionB[1]).not.toBeChecked();
    });
  },
};

export const WithExternalState: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(['a']);

    return <CheckboxGroup {...args} values={selected} onChange={setSelected} />;
  },
  args: {
    options: sampleOptions,
    name: 'controlled-checkbox-group',
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    defaultValues: ['c'],
    name: 'disabled-checkbox-group',
    disabled: true,
  },
  play: async () => {
    const optionC = screen.getAllByRole('checkbox')[2];
    expect(optionC).toBeChecked();
    expect(optionC).toBeDisabled();
    fireEvent.click(optionC);
    expect(optionC).toBeChecked();
  },
};

export const ErrorState: Story = {
  args: {
    options: sampleOptions,
    name: 'error-checkbox-group',
    error: true,
  },
};
