import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Slider } from './index';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import React from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Atoms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { action: 'valueChanged' },
    color: {
      control: 'radio',
      options: ['blue', 'gray'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Initial value of the slider (single number or range)',
    },
    step: {
      control: { type: 'number' },
      description: 'Step size between values',
    },
    valueLabels: {
      control: false,
      description: 'Custom value labels displayed below the track',
    },
  },
  decorators: [
    (Story) => {
      const storyElement = Story();
      return React.createElement('div', { className: 'w-full max-w-[15rem]' }, storyElement);
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Slider>;

const valueLabels = {
  0: '0',
  10: '1',
  20: '2',
  30: '3',
  40: '4',
};

export const Single: Story = {
  name: 'Single Slider',
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    color: 'blue',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = await canvas.findByRole('slider');

    slider.focus();
    await userEvent.keyboard('{arrowRight}');
    await userEvent.keyboard('{arrowLeft}');

    expect(slider).toHaveFocus();
  },
};

export const Range: Story = {
  name: 'Range Slider',
  args: {
    min: 0,
    max: 100,
    defaultValue: [20, 80],
    color: 'gray',
    size: 'sm',
  },
};

export const SingleLabels: Story = {
  name: 'Single Slider with Labels',
  args: {
    min: 0,
    max: 40,
    defaultValue: 20,
    valueLabels,
    color: 'blue',
    size: 'md',
    step: 10,
  },
};

export const RangeLabels: Story = {
  name: 'Range Slider with Labels',
  args: {
    min: 0,
    max: 40,
    defaultValue: [20, 30],
    valueLabels,
    color: 'blue',
    size: 'md',
    step: 10,
  },
};
