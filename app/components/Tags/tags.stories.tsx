import { Meta, StoryFn } from '@storybook/react-webpack5';
import { userEvent, within } from '@storybook/testing-library';
import Tags from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import Avatar from '../Avatars';

export default {
  title: 'Components/Atoms/Tags',
  component: Tags,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The `Tags` component is a versatile UI element that can be used to display labels or tags with optional icons and dismiss functionality. It supports various states such as selected, disabled, and dismissable, making it suitable for a wide range of applications.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'green', 'gray', 'red'],
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'squared'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    dismissable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
    onDismiss: { action: 'dismissed' },
    icon: {
      control: 'select',
      options: ['none', 'Tick', 'Avatar'],
      mapping: {
        Avatar: <Avatar src="/assets/images/olivia-rhye.jpeg" size="3xs" />,
        Tick: <FontAwesomeIcon icon={faCheck} className="h-4 w-4 stroke-[2.5]" />,
        none: null,
      },
    },
    label: { control: 'text' },
  },
} as Meta;

const Template: StoryFn = (args) => <Tags label="" {...args} />;

export const PrimaryTags = Template.bind({});
PrimaryTags.args = {
  color: 'blue',
  type: 'primary',
  shape: 'rounded',
  size: 'md',
  selected: false,
  dismissable: false,
  disabled: false,
  label: 'Blue Tag',
};
PrimaryTags.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tag = await canvas.findByText('Blue Tag');
  await userEvent.click(tag);
};

export const SecondaryTags = Template.bind({});
SecondaryTags.args = {
  ...PrimaryTags.args,
  type: 'secondary',
};
SecondaryTags.play = PrimaryTags.play;

export const SelectedTags = Template.bind({});
SelectedTags.args = {
  ...PrimaryTags.args,
  selected: true,
};
SelectedTags.play = PrimaryTags.play;

export const DismissableTags = Template.bind({});
DismissableTags.args = {
  ...PrimaryTags.args,
  dismissable: true,
};
DismissableTags.play = PrimaryTags.play;

export const IconsTags = Template.bind({});
IconsTags.args = {
  ...PrimaryTags.args,
  icon: <FontAwesomeIcon icon={faCheck} className="h-4 w-4 stroke-[2.5]" />,
};
IconsTags.play = PrimaryTags.play;

export const AvatarTag = Template.bind({});
AvatarTag.args = {
  ...PrimaryTags.args,
  icon: <Avatar src="/assets/images/olivia-rhye.jpeg" size="3xs" />,
};
AvatarTag.play = PrimaryTags.play;

export const RedTags = Template.bind({});
RedTags.args = {
  ...PrimaryTags.args,
  color: 'red',
  label: 'Red Tag',
};
