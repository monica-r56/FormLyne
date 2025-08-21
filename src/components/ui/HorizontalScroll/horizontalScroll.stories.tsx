import type { Meta, StoryObj } from '@storybook/react';
import  {HorizontalScroll}  from '.';
import { Button } from '@/components/ui/Button';

const meta: Meta<typeof HorizontalScroll> = {
  title: 'Components/UI/HorizontalScroll',
  component: HorizontalScroll,
  tags: ['autodocs'],
  args: {
    title: 'Sample Horizontal Scroll',
    showControls: true,
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalScroll>;

export const Default: Story = {
  render: (args) => (
    <HorizontalScroll {...args}>
      {/* Sample child items */}
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="w-48 h-32 flex items-center justify-center rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg"
        >
          Item {idx + 1}
        </div>
      ))}
    </HorizontalScroll>
  ),
};

export const WithButtons: Story = {
  args: {
    title: 'With Buttons',
    showControls: true,
  },
  render: (args) => (
    <HorizontalScroll {...args}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Button key={idx} className="w-48 h-32">
          Button {idx + 1}
        </Button>
      ))}
    </HorizontalScroll>
  ),
};

export const WithoutControls: Story = {
  args: {
    title: 'No Controls',
    showControls: false,
  },
  render: (args) => (
    <HorizontalScroll {...args}>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="w-48 h-32 flex items-center justify-center rounded-lg shadow bg-gray-200 dark:bg-gray-800"
        >
          Box {idx + 1}
        </div>
      ))}
    </HorizontalScroll>
  ),
};
