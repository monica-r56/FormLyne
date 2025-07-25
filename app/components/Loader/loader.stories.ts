import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Loader } from '.';

const meta: Meta<typeof Loader> = {
  title: 'components/Atoms/Spinner',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['black', 'blue', 'red', 'white'],
    },
    loading: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    size: 'lg',
    color: 'black',
    loading: true,
    label: 'Loading',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    color: 'black',
    loading: true,
    label: 'Loading',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'black',
    loading: true,
    label: 'Loading',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    color: 'black',
    loading: true,
    label: 'Loading',
  },
};
