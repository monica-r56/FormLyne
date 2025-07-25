import { Meta, StoryObj } from '@storybook/react-webpack5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RTButton from '.';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';

const meta: Meta<typeof RTButton> = {
  title: 'components/Atoms/RTButton',
  component: RTButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: false },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    hasIcon: { table: { disable: true } },
    color: { table: { disable: true } },
    iconPosition: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof RTButton>;

export const Default: Story = {
  args: {
    label: 'Button',
    icon: <FontAwesomeIcon icon={faArrowLeft} style={{ height: '24px', width: '24px' }} />,
    size: 'lg',
    type: 'static',
  },
};

export const StaticMediumSize: Story = {
  args: {
    label: 'Button',
    icon: <FontAwesomeIcon icon={faArrowLeft} style={{ height: '16px', width: '16px' }} />,
    type: 'static',
    size: 'md',
  },
};
export const StaticSmallSize: Story = {
  args: {
    label: 'Button',
    icon: <FontAwesomeIcon icon={faArrowLeft} style={{ height: '16px', width: '16px' }} />,
    type: 'static',
    size: 'sm',
  },
};

export const DynamicButton: Story = {
  args: {
    label: '0.5x',
    type: 'dynamic',
  },
};

export const IsSelected: Story = {
  args: {
    label: 'Button',
    icon: <FontAwesomeIcon icon={faArrowLeft} style={{ height: '16px', width: '16px' }} />,
    isSelected: true,
    type: 'static',
    size: 'sm',
  },
};
