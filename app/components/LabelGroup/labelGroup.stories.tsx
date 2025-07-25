import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import LabelGroup from '.';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Checkbox } from '@components/Checkbox';
import { RadioGroupItem } from '@components/Radio';
import Avatar from '@components/Avatars';

const meta: Meta<typeof LabelGroup> = {
  title: 'components/Atoms/labelGroup',
  component: LabelGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LabelGroup>;

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

export const LabelWithCheckbox: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time',
  },
  render: (args) => <LabelGroup {...args} component={<Checkbox />} />,
};

export const LabelWithRadioButton: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time',
  },
  render: (args) => (
    <RadioGroup>
      <LabelGroup {...args} component={<RadioGroupItem value="One" />} />
    </RadioGroup>
  ),
};

export const SmallAvatarLabelGroup: Story = {
  render: () => {
    return (
      <LabelGroup
        component={<Avatar src="/assets/images/olivia-rhye.jpeg" size="sm" />}
        label="Olivia Rhye"
        description="olivia@exampleui.com"
      />
    );
  },
};

export const MediumAvatarLabelGroup: Story = {
  render: () => {
    return (
      <LabelGroup
        component={<Avatar src="/assets/images/olivia-rhye.jpeg" size="md" />}
        label="Olivia Rhye"
        description="olivia@exampleui.com"
      />
    );
  },
};

export const LargeAvatarLabelGroup: Story = {
  render: () => {
    return (
      <LabelGroup
        component={<Avatar src="/assets/images/olivia-rhye.jpeg" size="lg" />}
        label="Olivia Rhye"
        description="olivia@exampleui.com"
      />
    );
  },
};

export const ExtraLargeAvatarLabelGroup: Story = {
  render: () => {
    return (
      <LabelGroup
        component={<Avatar src="/assets/images/olivia-rhye.jpeg" size="xl" />}
        label="Olivia Rhye"
        description="olivia@exampleui.com"
      />
    );
  },
};
