import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Calendar from '.';

const meta: Meta<typeof Calendar> = {
  title: 'Components/UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const NormalBorder: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    return (
      <div className="max-w-sm mx-auto mt-10">
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className="shadow-md border border-gray-300 bg-white dark:bg-zinc-900"
        />
      </div>
    );
  },
};

export const ShadowBorder: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    return (
      <div className="max-w-sm mx-auto mt-10">
        <div className="backdrop-blur-md bg-white/20 dark:bg-zinc-800/30 border rounded-xl p-4 shadow-xl">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            className="bg-purple-200 text-black dark:text-white"
          />
        </div>
      </div>
    );
  },
};
