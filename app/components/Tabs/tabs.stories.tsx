import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from '@storybook/testing-library';
import { TabList } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/pro-regular-svg-icons';

const meta: Meta<typeof TabList> = {
  title: 'Components/molecules/Tabs',
  component: TabList,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'vertical'],
    },
    value: { control: false },
    onChange: { control: false },
    defaultValue: { control: 'text' },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof TabList>;

const PrimaryTabsItems = [
  { id: 1, label: 'All (127)', value: 'all', content: 'All interviews content goes here' },
  { id: 2, label: 'Screening (90)', value: 'screening', content: 'Screening content' },
  { id: 3, label: 'Assessment (30)', value: 'assessment', content: 'Assessment content' },
  { id: 4, label: 'HM Interview (0)', value: 'hm-interview', content: 'Hiring Manager Interview content' },
  { id: 5, label: 'Technical Interview (0)', value: 'technical', content: 'Tech Interview content' },
];

const SecondaryTabsItems = [
  { id: 1, label: 'Overview', value: 'overview', content: 'All interviews content goes here' },
  { id: 2, label: 'Responses', value: 'responses', content: 'Screening content' },
  { id: 3, label: 'Evaluation', value: 'eval', content: 'Assessment content' },
  { id: 4, label: 'Call History', value: 'history', content: 'Hiring Manager Interview' },
];

const VerticalTabsItems = [
  {
    id: 1,
    label: 'Profile',
    value: 'profile',
    icon: <FontAwesomeIcon icon={faCirclePlus} size="lg" className="h-[18px] w-[18px]" />,
    content: 'All interviews content goes here',
  },
  {
    id: 2,
    label: 'Notification Preferences',
    value: 'notify',
    icon: <FontAwesomeIcon icon={faCirclePlus} size="lg" className="h-[18px] w-[18px]" />,
    content: 'Screening content',
  },
  {
    id: 3,
    label: 'Change Password',
    value: 'password',
    icon: <FontAwesomeIcon icon={faCirclePlus} size="lg" className="h-[18px] w-[18px]" />,
    content: 'Assessment content',
  },
  {
    id: 4,
    label: 'Timezone',
    value: 'timezone',
    icon: <FontAwesomeIcon icon={faCirclePlus} size="lg" className="h-[18px] w-[18px]" />,
    content: 'Hiring Manager Interview content',
  },
];

export const Primary: Story = {
  args: {
    type: 'primary',
    items: PrimaryTabsItems,
    defaultValue: 'all',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = await canvas.findByText('Assessment (30)');
    await userEvent.click(tab);
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    items: SecondaryTabsItems,
    defaultValue: 'overview',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = await canvas.findByText('Evaluation');
    await userEvent.click(tab);
  },
};

export const Vertical: Story = {
  args: {
    type: 'vertical',
    items: VerticalTabsItems,
    defaultValue: 'profile',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = await canvas.findByText('Change Password');
    await userEvent.click(tab);
  },
};
