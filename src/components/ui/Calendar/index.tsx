import React, { FC, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CalendarProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  className?: string;
}

const Calendar: FC<CalendarProps> = ({ selectedDate, onSelectDate, className = '' }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(today);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className={`p-2 border-2 border-gray-500 dark:border-x-zinc-300 rounded-lg bg-white dark:bg-zinc-900 ${className}`}>
      {/* Header with month and year */}
      <div className="flex items-center justify-between mb-2 px-2">
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={goToPreviousMonth}
          className="cursor-pointer text-gray-600 dark:text-gray-300"
        />
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={goToNextMonth}
          className="cursor-pointer text-gray-600 dark:text-gray-300"
        />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = selectedDate && isSameDay(selectedDate, day);
          const isCurrent = isToday(day);
          let dayClass = 'text-sm p-1 rounded-md hover:bg-blue-100 dark:hover:bg-zinc-700';

          if (isSelected && isCurrent) {
            dayClass += ' bg-blue-600 text-white ring-2 dark:bg-blue-300 dark:text-black ring-white dark:ring-black'; 
          } else if (isSelected) {
            dayClass += ' bg-blue-500 text-white dark:hover:bg-blue-400 dark:text-black';
          } else if (isCurrent) {
            dayClass += ' border border-blue-400 dark:border-blue-200 text-blue-700 dark:text-blue-300';
          }

          return (
            <button
              key={day.toISOString()}
              className={dayClass}
              onClick={() => onSelectDate(day)}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
