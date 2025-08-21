import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from '.';
import { HorizontalScroll } from '@/components/ui/HorizontalScroll';
import { FormContainer } from '@/components/ui/FormContainer';
import { fn } from 'storybook/test';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof Dashboard> = {
  title: 'Components/Layout/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

/**
 * Empty state story - shows dashboard without children
 */
export const Empty: Story = {
  args: {
    title: 'Dashboard',
    description: 'Manage your forms and view recent submissions',
    children: (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        <svg
          className="w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0h-4m0 0H8m4-10V7m0 0H8m4 0h4"
          />
        </svg>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
          No content available. Start by creating a new form or adding content to your dashboard.
        </p>
      </div>
    ),
  },
};

/**
 * Story with 10 FormContainers in a horizontal scroll bar
 */
export const WithForms: Story = {
  args: {
    title: 'My Forms',
    description: 'Scroll through your available forms',
    children: (
      <HorizontalScroll className="mt-2">
        {Array.from({ length: 10 }).map((_, idx) => (
          <FormContainer
            key={idx}
            id={`${idx + 1}`}
            title={`Issue task ${idx + 1}`}
            shareId={`share-${idx + 1}`}
            onDelete={fn()}
            className="min-w-[200px] mr-2"
          />
        ))}
      </HorizontalScroll>
    ),
  },
};

/**
 * Custom content story - dashboard with alternate colored cards
 */
export const WithCustomContent: Story = {
  args: {
    children: (
      <HorizontalScroll>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className={`w-48 h-32 flex items-center justify-center rounded-lg shadow-md text-white font-semibold text-lg ${
              idx % 2 === 0
                ? 'bg-gradient-to-r from-green-500 to-teal-500'
                : 'bg-gradient-to-r from-pink-500 to-red-500'
            }`}
          >
            <FormattedMessage {...messages.card} values={{ number: idx + 1 }} />
          </div>
        ))}
      </HorizontalScroll>
    ),
  },
};
