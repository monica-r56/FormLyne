import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Chip from '.';

const meta = {
  title: 'Components/Atoms/Chip',
  component: Chip,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'squared'],
    },
    color: {
      control: 'select',
      options: ['gray', 'ltgray', 'purple', 'blue', 'orange', 'red', 'solidRed', 'green', 'amber'],
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleChip: Story = {
  args: {
    label: 'Sample Chip',
    color: 'purple',
    type: 'secondary',
    size: 'large',
    shape: 'squared',
  },
};

// Size Variation
export const SmallChip: Story = {
  args: {
    label: 'Small Chip',
    size: 'small',
  },
};

// Type Variation
export const SecondaryChip: Story = {
  args: {
    label: 'Secondary Chip',
    type: 'secondary',
  },
};
// Color Variation
export const PurpleColorChip: Story = {
  args: {
    label: 'Purple Chip',
    color: 'purple',
  },
};

// Shape Variation
export const SquaredChip: Story = {
  args: {
    label: 'Squared Chip',
    shape: 'squared',
  },
};

// Default chip with only label
export const DefaultChipWithOnlyLabel: Story = {
  args: {
    label: 'Default Chip',
  },
};

// Edge Cases
export const EmptyChip: Story = {
  args: {
    label: '',
  },
};

export const WhitespaceChip: Story = {
  args: {
    label: '      ',
  },
};
