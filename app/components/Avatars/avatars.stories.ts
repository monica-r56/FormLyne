import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Avatar from '.';

const meta = {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    color: {
      control: 'select',
      options: ['blue', 'purple'],
    },
    src: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    delayMs: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageAvatar: Story = {
  args: {
    src: '/assets/images/olivia-rhye.jpeg',
    label: 'Olivia Rhye',
  },
};

export const TextAvatar: Story = {
  args: {
    label: 'Olivia Rhye',
  },
};

export const DefaultPlaceholderAvatar: Story = {
  args: {},
};

export const SpecialCharacterLabelAvatar: Story = {
  args: {
    label: '@#kim 00&*!@$paul)',
  },
};

export const PlusNumberLabelAvatar: Story = {
  args: {
    label: '+99',
  },
};

export const BrokenImageWithLabel: Story = {
  args: {
    src: 'non-existent-image.jpg',
    label: 'Kim Paul',
  },
};

export const BrokenImageWithoutLabel: Story = {
  args: {
    src: 'non-existent-image.jpg',
  },
};

export const BrokenImageWithCustomDelay: Story = {
  args: {
    src: 'non-existent-image.jpg',
    label: 'Olivia Rhye',
    delayMs: 2000,
  },
};

export const ThreeWordlabelFallback: Story = {
  args: {
    size: 'lg',
    src: 'non-existent-image.jpg',
    label: 'Kim Paul Martin',
  },
};
