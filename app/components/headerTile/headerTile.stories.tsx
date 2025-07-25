import type { Meta, StoryObj } from '@storybook/react-webpack5';
import HeaderTile from '.';

const meta: Meta<typeof HeaderTile> = {
  title: 'Components/Atoms/HeaderTile',
  component: HeaderTile,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label to be displayed',
      defaultValue: 'Default Label',
    },
    labelClassName: {
      control: 'text',
      description: 'Optional custom class for the label',
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderTile>;

export const Default: Story = {
  args: {
    label: 'Compatibility',
  },
};

export const WithCustomLabelClass: Story = {
  args: {
    label: 'Compatibility',
    labelClassName: 'text-lg font-medium text-zinc-900',
  },
};
