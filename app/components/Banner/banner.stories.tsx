import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Banner } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta<typeof Banner> = {
  title: 'Components/Atoms/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: {
      control: 'boolean',
      options: [true, false],
      mapping: {
        true: <FontAwesomeIcon icon={faWifi} size="xl" className="w-[24px] sm:w-[34px]" />,
        false: undefined,
      },
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    className: {
      control: 'radio',
      options: [
        'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200',
        'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300',
        'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Strong: Story = {
  args: {
    title: 'Your connection is stable',
    description: 'Your audio and video quality should be good.',
    icon: true,
    iconPosition: 'left',
    className: 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200',
  },
};

export const Weak: Story = {
  args: {
    title: 'Connection lost',
    description: 'We are attempting to reconnect.',
    icon: true,
    iconPosition: 'left',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300',
  },
};

export const Poor: Story = {
  args: {
    title: 'Poor network',
    description: 'You may experience lag or reduced video quality.',
    icon: true,
    iconPosition: 'left',
    className: 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200',
  },
};