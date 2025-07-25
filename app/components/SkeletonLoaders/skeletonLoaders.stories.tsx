import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SkeletonLoader from '.';

const meta: Meta<typeof SkeletonLoader> = {
  title: 'components/Atoms/SkeletonLoader',
  component: SkeletonLoader,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rectangle', 'pill', 'text', 'paragraph', 'heading'],
    },
    size: {
      control: { type: 'select' },
      description: 'Not Applicable to paragraph',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    lines: {
      control: { type: 'number' },
      description: 'Number of lines, only for paragraph type',
    },
    className: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

export const Circle: Story = {
  args: {
    type: 'circle',
    size: 'lg'
  },
};

export const Paragraph: Story = {
  args: {
    type: 'paragraph',
  },
};
