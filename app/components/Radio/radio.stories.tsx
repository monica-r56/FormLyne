import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { RadioGroupItem, RadioGroupItemProps } from '.';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'asChild'>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root ref={ref} className={className} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  );
});

RadioGroup.displayName = 'RadioGroup';

const meta: Meta<RadioGroupItemProps> = {
  title: 'components/Atoms/Radio',
  component: RadioGroupItem,
  argTypes: {
    asChild: { table: { disable: true } },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    type: {
      control: { type: 'inline-radio' },
      options: ['dot', 'check'],
    },
    value: {
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
        required: true,
      },
    },
  },
  args: {
    value: 'example',
  },
};

export default meta;

type Story = StoryObj<RadioGroupItemProps>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue={args.checked ? args.value : undefined}>
      <RadioGroupItem {...args} />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  args: {
    value: 'checked',
    checked: true,
  },
  render: (args) => (
    <RadioGroup>
      <RadioGroupItem {...args} />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled',
  },
  render: (args) => (
    <RadioGroup>
      <RadioGroupItem {...args} />
    </RadioGroup>
  ),
};

export const Error: Story = {
  args: {
    error: true,
    value: 'error',
  },
  render: (args) => (
    <RadioGroup>
      <RadioGroupItem {...args} />
    </RadioGroup>
  ),
};

export const CheckType: Story = {
  args: {
    type: 'check',
    value: 'checkType',
  },
  render: (args) => (
    <RadioGroup>
      <RadioGroupItem {...args} />
    </RadioGroup>
  ),
};
