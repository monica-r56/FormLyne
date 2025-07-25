import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Timer from '.';

const meta: Meta<typeof Timer> = {
  title: 'components/molecules/Timer',
  component: Timer,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary', 'hideable'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
    format: {
      control: 'radio',
      options: ['mm:ss', 'hh:mm:ss'],
    },
    live: { control: 'boolean' },
    progress: { control: 'boolean' },
    maxtime: { control: 'number' },
    isRunning: { control: 'boolean' },
    onComplete: { action: 'completed' },
  },
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Default: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    format: 'mm:ss',
    live: false,
    progress: false,
    maxtime: 120,
    isRunning: false,
  },
};

export const LiveCountingTimer: Story = {
  args: {
    type: 'primary',
    size: 'lg',
    format: 'hh:mm:ss',
    live: true,
    progress: false,
    isRunning: true,
  },
};

export const ProgressTimer: Story = {
  args: {
    type: 'primary',
    size: 'lg',
    format: 'hh:mm:ss',
    maxtime: 90,
    progress: true,
    isRunning: true,
  },
};
export const HidableTypeTimer: Story = {
  args: {
    type: 'hideable',
    size: 'sm',
    format: 'mm:ss',
    live: false,
    progress: false,
    maxtime: 60,
    isHidden: true,
    isRunning: true,
  },
};
