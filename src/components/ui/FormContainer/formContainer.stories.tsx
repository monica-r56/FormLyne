import type { Meta, StoryObj } from '@storybook/react';
import { FormContainer } from '.';
import { fn } from 'storybook/test';

const meta: Meta<typeof FormContainer> = {
  title: 'Components/UI/FormContainer',
  component: FormContainer,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof FormContainer>;

export const Light: Story = {
  args: {
    id: '1',
    title: 'Sample Feedback Form',
    shareId: 'abc123',
    onDelete: fn(),
    className: '',
  },
};

