import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Timeline } from './index';

const meta: Meta<typeof Timeline> = {
  title: 'components/Molecules/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current playback time in seconds (Watched Track).',
    },
    max: {
      control: { type: 'range', min: 10, max: 200, step: 1 },
      description: 'Total video duration in seconds (Progress Track).',
    },
    bufferedEnd: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
      description: 'End time of the buffered content in seconds (Buffered Track).',
    },
    className: {
      control: 'text',
      description: 'Custom class name for the timeline container.',
    },
    onSeek: {
      action: 'seek',
      description: 'Callback function when the user seeks on the timeline.',
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const DefaultTimeline: Story = {
  args: {
    value: 30,
    max: 100,
    bufferedEnd: 60,
  },
};

export const MobileView: Story = {
  args: {
    value: 40,
    max: 100,
    bufferedEnd: 70,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
