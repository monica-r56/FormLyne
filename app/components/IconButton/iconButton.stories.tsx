import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { IconButton } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { within, userEvent } from '@storybook/testing-library';

const meta = {
  title: 'components/Atoms/IconButton',
  component: IconButton,
  argTypes: {
    type: { control: { type: 'select', options: ['Primary', 'Secondary', 'Tertiary'] } },
    color: { control: { type: 'select', options: ['blue', 'red', 'gray'] } },
    size: { control: { type: 'select', options: ['small', 'medium'] } },
    rounded: { control: { type: 'boolean' } },
    floating: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    icon: { table: { disable: true } },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const interactionPlay = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  await userEvent.click(button);
  console.log('Mouse click triggered');

  button.focus();
  await userEvent.keyboard('{Enter}');
  console.log('Keyboard Enter key triggered');

  await userEvent.keyboard(' ');
  console.log('Keyboard Space key triggered');
};

const chevronIcon = () => {
  return (
    <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.175736 0.195262C0.410051 -0.0650874 0.78995 -0.0650874 1.02426 0.195262L3 2.39052L4.97574 0.195262C5.21005 -0.0650874 5.58995 -0.0650874 5.82426 0.195262C6.05858 0.455612 6.05858 0.877722 5.82426 1.13807L3.42426 3.80474C3.18995 4.06509 2.81005 4.06509 2.57574 3.80474L0.175736 1.13807C-0.0585787 0.877722 -0.0585787 0.455612 0.175736 0.195262Z"
        fill="#F4F4F5"
      />
    </svg>
  );
};

export const Default: Story = {
  args: {
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
  play: interactionPlay,
};

export const SecondaryRed: Story = {
  args: {
    type: 'Secondary',
    color: 'red',
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
  play: interactionPlay,
};

export const RoundedButton: Story = {
  args: {
    type: 'Primary',
    color: 'blue',
    rounded: true,
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
  play: interactionPlay,
};

export const FloatingButton: Story = {
  args: {
    type: 'Tertiary',
    color: 'gray',
    floating: true,
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
  play: interactionPlay,
};

export const LoadingButton: Story = {
  args: {
    type: 'Primary',
    color: 'blue',
    loading: true,
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
};

export const DisabledButton: Story = {
  args: {
    type: 'Primary',
    color: 'blue',
    disabled: true,
    icon: <FontAwesomeIcon icon={faArrowLeft} />,
  },
};

export const SmallSizeButton: Story = {
  args: {
    type: 'Primary',
    color: 'blue',
    size: 'sm',
    icon: <FontAwesomeIcon icon={faArrowLeft} style={{ height: '9.6px', width: '9.6px' }} />,
  },
};

export const MenuTriggerVariant: Story = {
  args: {
    type: 'Tertiary',
    color: 'blue',
    size: 'md',
    menuTrigger: true,
    icon: chevronIcon(),
  },
};
