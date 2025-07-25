import { expect } from '@storybook/jest';
import { userEvent, screen } from '@storybook/testing-library';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import RadioGroup from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/molecules/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['dot', 'check'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    name: {
      control: false,
    },
    value: {
      type: 'string',
    },
    className: {
      control: false,
    },
    labelClassName: {
      control: false,
    },
    descriptionClassName: {
      control: false,
    },
    asChild: { table: { disable: true } },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const sampleOptions = [
  { label: 'Option One', value: 'option-one', description: 'This is option one' },
  { label: 'Option Two', value: 'option-two', description: 'This is option two' },
  { label: 'Option Three', value: 'option-three', description: 'This is option three' },
];

const OptionList = [{ label: 'Remember Me', value: 'remember', description: 'Save my login details for next time.' }];

export const Default: Story = {
  args: {
    options: sampleOptions,
    defaultValue: 'option-one',
    name: 'Form-data',
  },
  play: async () => {
    const defaultRadio = screen.getAllByRole('radio')[0];
    expect(defaultRadio).toBeChecked();

    const secondOption = screen.getAllByRole('radio')[1];
    await userEvent.click(secondOption);
    expect(secondOption).toBeChecked();
  },
};

export const DisabledState: Story = {
  args: {
    options: sampleOptions,
    defaultValue: 'option-one',
    disabled: true,
  },
  play: async () => {
    const options = screen.getAllByRole('radio');
    options.forEach((option) => {
      expect(option).toBeDisabled();
    });
  },
};

export const ControlledRadioGroup: Story = {
  args: {
    options: OptionList,
    value: 'remember',
  },
};
