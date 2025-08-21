import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { RTIconButton } from '.';

const meta: Meta<typeof RTIconButton> = {
  title: 'components/UI/RTIconButton',
  component: RTIconButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Called on button click',
    },
  },
};

export default meta;

type Story = StoryObj<typeof RTIconButton>;

export const Default: Story = {
  args: {
    icon: <FontAwesomeIcon icon={faPlay} />,
    className: 'text-[20px]',
  },
};

export const ChangeIcon: Story = {
  render: (args) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
      <RTIconButton
        {...args}
        icon={<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />}
        className="text-[20px]"
        onClick={() => setIsPlaying((prev) => !prev)}
      />
    );
  },
};
