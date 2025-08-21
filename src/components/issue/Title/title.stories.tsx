import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TitleInput from '.';

const meta: Meta<typeof TitleInput> = {
  title: 'Components/Issue/TitleInput',
  component: TitleInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter title...',
    className: 'border border-gray-300 rounded p-2',
  },
};

export const WithCustomStyles: Story = {
  args: {
    placeholder: 'Enter issue title',
    className: 'text-purple-600 border-b border-purple-400',
  },
};
