import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from './index';
import { within, userEvent } from '@storybook/testing-library';

const meta = {
  title: 'components/Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const interactionPlayButton = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const trigger = canvas.getByRole('button', { hidden: true });
  console.log('Found trigger (button):', trigger);

  await userEvent.hover(trigger);
  console.log('Hovered over the button, tooltip should appear');

  await userEvent.click(trigger);
  console.log('Mouse click triggered, tooltip might appear/disappear depending on implementation');

  trigger.focus();
  console.log('Focused the button');
  await userEvent.keyboard('{Enter}');
  console.log('Keyboard Enter key triggered');

  await userEvent.keyboard(' ');
  console.log('Keyboard Space key triggered');

  await userEvent.unhover(trigger);
  console.log('Unhovered button');
};

const interactionPlayCustomComponent = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const trigger = canvas.getByText('Custom Component');
  console.log('Found trigger (custom component):', trigger);

  await userEvent.hover(trigger);
  console.log('Hovered over the custom component, tooltip should appear');

  await userEvent.click(trigger);
  console.log('Mouse click triggered on custom component');

  try {
    trigger.focus();
    console.log('Attempted to focus the custom component');
    await userEvent.keyboard('{Enter}');
    console.log('Keyboard Enter key triggered on custom component');

    await userEvent.keyboard(' ');
    console.log('Keyboard Space key triggered on custom component');
  } catch (e) {
    console.warn(
      "Could not focus or trigger keyboard events on the custom component. It might need 'tabindex=0' or the Tooltip component needs to handle focus management.",
      e
    );
  }

  await userEvent.unhover(trigger);
  console.log('Unhovered custom component');
};

export const WithIconButton: Story = {
  args: {
    label: 'Information tooltip',
    text: 'This tooltip shows additional information',
    children: React.createElement(
      'button',
      {
        'aria-label': 'Info',
        className: 'flex h-8 w-8 items-center justify-center rounded-xl',

        type: 'button',
      },
      React.createElement(
        'div',
        {
          className: 'flex scale-150 transform cursor-pointer items-center justify-center',
          'aria-hidden': true,
        },
        React.createElement(FontAwesomeIcon, { icon: faCircleInfo })
      )
    ),
    arrow: true,
    position: 'right',
  },
  play: interactionPlayButton,
};

export const WithCustomComponent: Story = {
  args: {
    label: 'Custom component tooltip',
    text: 'Tooltip works with any React component',
    children: React.createElement(
      'div',
      {
        className: 'px-4 py-2 bg-purple-100 text-purple-800 rounded border border-purple-300',
      },
      'Custom Component'
    ),
    arrow: true,
    position: 'bottom-center',
  },
  play: interactionPlayCustomComponent,
};
