import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Divider from '.';
import messages from './messages';

const meta = {
  title: 'Components/Atoms/Divider',
  component: Divider,
  argTypes: {
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
    orientation: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    textClassName: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DividerSeparatingContent: Story = {
  args: {
    type: 'horizontal',
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md rounded-md border p-4">
      <div className="pb-4">
        <h3 className="text-lg font-medium">{messages.sectionOne.defaultMessage}</h3>
        <p className="text-sm text-gray-500">{messages.sectionOneContent.defaultMessage}</p>
      </div>

      <Divider {...args} />

      <div className="pt-4">
        <h3 className="text-lg font-medium">{messages.sectionTwo.defaultMessage}</h3>
        <p className="text-sm text-gray-500">{messages.sectionTwoContent.defaultMessage}</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    type: 'vertical',
  },
  render: (args) => (
    <div className="flex h-16 items-center gap-4 p-4">
      <span className="text-sm">{messages.profile.defaultMessage}</span>
      <Divider {...args} />
      <span className="text-sm">{messages.settings.defaultMessage}</span>
      <Divider {...args} />
      <span className="text-sm">{messages.logout.defaultMessage}</span>
    </div>
  ),
};

export const WithLongText: Story = {
  args: {
    text: messages.longText.defaultMessage,
    orientation: 'center',
  },
};

export const WithCustomSizeText: Story = {
  args: {
    text: messages.mediumText.defaultMessage,
    textClassName: 'text-sm leading-5 px-3',
  },
};

export const WithExtraLargeText: Story = {
  args: {
    text: messages.xlText.defaultMessage,
    textClassName: 'text-lg leading-7 px-6 font-semibold',
  },
};

export const EmptyText: Story = {
  args: {
    text: '',
  },
};

export const WhitespaceText: Story = {
  args: {
    text: '     ',
  },
};
