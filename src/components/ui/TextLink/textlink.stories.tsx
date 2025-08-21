import { Meta, StoryObj } from '@storybook/react';
import TextLink from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof TextLink> = {
  title: 'Components/UI/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'critical', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    icon: {
      control: false,
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof TextLink>;

export const Default: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    text: 'Primary Link',
  },
};

export const WithLeadingIcon: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    text: 'Primary Link with Icon',
    icon: <FontAwesomeIcon icon={faChevronRight} />,
    leading: true,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    type: 'primary',
    size: 'sm',
    text: 'Primary Link with Icon',
    icon: <FontAwesomeIcon icon={faChevronRight} />,
    leading: false,
  },
};

export const Disabled: Story = {
  args: {
    type: 'secondary',
    size: 'sm',
    text: 'Disabled Link',
    disabled: true,
  },
};
