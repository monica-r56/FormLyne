import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProgressIndicator } from '.';
import message from './message';

import { createMsgGetter } from '@utils/createMsgGetter';

const msg = createMsgGetter(message);

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/Atoms/ProgressBar',
  component: ProgressIndicator,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['linear', 'circular'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    color: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    labelPosition: {
      control: 'radio',
      options: ['top', 'bottom', 'none'],
    },
    valuePosition: {
      control: 'radio',
      options: ['top', 'bottom', 'side', 'none'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const LinearDefault: Story = {
  args: {
    variant: 'linear',
    label: msg('label'),
    value: 65,
    color: 'blue',
    size: 'md',
    valuePosition: 'top',
    labelPosition: 'top',
  },
};

export const LinearBottomLabel: Story = {
  args: {
    variant: 'linear',
    value: 50,
    color: 'red',
    size: 'sm',
    label: msg('label'),
    labelPosition: 'bottom',
  },
};

export const LinearWithSideValue: Story = {
  args: {
    variant: 'linear',
    value: 45,
    color: 'green',
    size: 'md',
    label: msg('label'),
    labelPosition: 'top',
    valuePosition: 'side',
  },
};

export const CircularDefault: Story = {
  args: {
    variant: 'circular',
    value: 80,
    color: 'blue',
    label: msg('label'),
  },
};
