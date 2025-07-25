import { Meta, StoryObj } from '@storybook/react-webpack5';
import { InputChips } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { Loader } from '@components/Loader';

const meta: Meta<typeof InputChips> = {
  title: 'Components/molecules/InputChips',
  component: InputChips,
  args: {
    disabled: false,
    error: false,
  },
  argTypes: {
    rightIcon: {
      control: 'radio',
      options: ['Loader', 'ChevronDown'],
      mapping: {
        none: undefined,
        Loader: <Loader size="sm" />,
        ChevronDown: <FontAwesomeIcon icon={faChevronDown} />,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputChips>;

export const Default: Story = {
  args: {
    placeholder: 'placeholder text',
  },
};

export const WithChips: Story = {
  args: {
    variant: 'chips',
    chips: [
      {
        label: 'Gray Chip',
        chipProps: { color: 'gray', size: 'small' },
      },
      {
        label: 'Blue Chip',
        chipProps: { color: 'blue', size: 'small' },
      },
    ],
  },
};

export const WithTags: Story = {
  args: {
    chips: ['Blue Tag', 'Blue Tag'],
    variant: 'tags',
  },
};

export const WithLoader: Story = {
  args: {
    chips: ['Blue Tag ', 'Blue Tag'],
    variant: 'tags',
    rightIcon: <Loader size="sm" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    chips: ['Blue Tag ', 'Blue Tag'],
    variant: 'tags',
    rightIcon: <FontAwesomeIcon icon={faChevronDown} />,
  },
};
