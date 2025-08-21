import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { fn } from 'storybook/test';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
};


export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Default Button',
    className: 'bg-blue-700 text-white hover:bg-blue-600 border border-blue-700',
  },
};

export const WithIconLeft: Story = {
  args: {
    label: 'Save',
    icon: <FontAwesomeIcon icon={faCheck} />,
    className: 'bg-green-600 text-white hover:bg-green-600 ',
    iconPosition: 'left',
  },
};

export const WithIconRight: Story = {
  args: {
    label: 'Next',
    icon: <FontAwesomeIcon icon={faCheck} />,
    className: 'bg-purple-600 text-white hover:bg-purple-400 ',
    iconPosition: 'right',
  },
};

export const Loading: Story = {
  args: {
    label: 'Submitting...',
    loading: true,
    className: 'bg-pink-600 text-white',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    className: 'bg-gray-600 text-white border border-gray-700',
  },
};

export const KeyboardAccessibility: Story = {
  args: {
    label: 'Keyboard Button',
    className: 'bg-purple-300 text-white-900 border hover:bg-purple-200',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Keyboard Button/i });
    button.focus();
    expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
