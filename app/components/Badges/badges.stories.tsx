import { Meta, StoryFn } from '@storybook/react-webpack5';
import { FormattedMessage } from 'react-intl';
import Badge from '.';
import messages from './message';
import Avatar from '../Avatars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/pro-light-svg-icons';

export default {
  title: 'components/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'blue', 'green', 'light-red', 'yellow', 'orange', 'purple', 'pink', 'gray', 'black'],
      description: 'Specifies the color of the badge.',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Determines the position of the badge when used with a child element.',
    },
    overlay: {
      control: 'select',
      options: ['rectangular', 'circular'],
      description: 'Determines the shape of the child.',
    },
    content: {
      control: 'select',
      options: ['121', '999+', 'Pencil', 'dot'],
      mapping: {
        Pencil: <FontAwesomeIcon icon={faPen} width={10} height={10} />,
        '121': 121,
        '999+': '999+',
        dot: undefined,
      },
      description: 'Content to be displayed inside the badge, which can be text, number, or an icon.',
    },
    children: {
      control: false,
      description: 'Child component to which the badge is attached.',
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  return <Badge id={''} {...args} />;
};

export const TextBadge = Template.bind({});
TextBadge.args = {
  color: 'blue',
  content: 121,
  children: (
    <button className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-zinc-900">
      <FormattedMessage {...messages.badgeButtonCTA} />
    </button>
  ),
};

export const DotBadge = Template.bind({});
DotBadge.args = {
  color: 'red',
  children: (
    <button className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-zinc-900">
      <FormattedMessage {...messages.badgeButtonCTA} />
    </button>
  ),
};

export const IconBadge = Template.bind({});
IconBadge.args = {
  color: 'green',
  content: <FontAwesomeIcon icon={faPen} width={10} height={10} />,
  children: (
    <button className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-zinc-900">
      <FormattedMessage {...messages.badgeButtonCTA} />
    </button>
  ),
};

export const PositionedBadge = Template.bind({});
PositionedBadge.args = {
  color: 'orange',
  content: <FontAwesomeIcon icon={faPen} width={10} height={10} />,
  position: 'bottom-left',
  children: (
    <button className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none dark:bg-zinc-900">
      <FormattedMessage {...messages.badgeButtonCTA} />
    </button>
  ),
};

export const AvatarBadge = Template.bind({});
AvatarBadge.args = {
  color: 'red',
  content: <FontAwesomeIcon icon={faPen} width={10} height={10} />,
  position: 'top-right',
  overlay: 'circular',
  children: <Avatar />,
};
