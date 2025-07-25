import { Meta, StoryObj } from '@storybook/react-webpack5';
import AvatarGroup, { AvatarWithBadge } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';

const sampleAvatars: AvatarWithBadge[] = [
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 1',
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 2',
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 3',
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 4',
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 5',
  },
];

const sampleAvatarsBadge: AvatarWithBadge[] = [
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 1',
    badge: {
      id: 'badge1',
      content: <FontAwesomeIcon icon={faCheck} className="text-xs" />,
      color: 'green',
      position: 'top-right',
    },
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 2',
    badge: {
      id: 'badge1',
      content: <FontAwesomeIcon icon={faCheck} className="text-xs" />,
      color: 'green',
      position: 'top-right',
    },
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 3',
    badge: {
      id: 'badge1',
      content: <FontAwesomeIcon icon={faCheck} className="text-xs" />,
      color: 'green',
      position: 'top-right',
    },
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 4',
    badge: {
      id: 'badge1',
      content: <FontAwesomeIcon icon={faCheck} className="text-xs" />,
      color: 'green',
      position: 'top-right',
    },
  },
  {
    src: 'assets/images/olivia-rhye.jpeg',
    label: 'Avatar 5',
    badge: {
      id: 'badge1',
      content: <FontAwesomeIcon icon={faCheck} className="text-xs" />,
      color: 'green',
      position: 'top-right',
    },
  },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'components/molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    maxCount: { control: 'number' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    color: {
      control: 'select',
      options: ['blue', 'purple'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Stacked: Story = {
  args: {
    avatars: sampleAvatars,
    size: 'sm',
  },
};

export const SingleSpaced: Story = {
  args: {
    avatars: sampleAvatars,
    size: 'sm',
    type: 'single',
  },
};

export const Spaced: Story = {
  args: {
    avatars: sampleAvatars,
    size: 'sm',
    type: 'spaced',
  },
};

export const WithMaxCount: Story = {
  args: {
    avatars: sampleAvatars,

    size: 'sm',
    maxCount: 3,
  },
};

export const AvatarGroupBadge: Story = {
  args: {
    avatars: sampleAvatarsBadge,
    size: 'md',
    maxCount: 3,
  },
};
