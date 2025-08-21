import React, { FC, useEffect, useRef, useState } from 'react';
import Calendar from '@/components/ui/Calendar';
import { FormattedMessage } from 'react-intl';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parse } from 'date-fns';
import messages from './messages';

interface DatePickerProps {
  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePicker: FC<DatePickerProps> = ({
  className = '',
  inputClassName = '',
  calendarClassName = '',
  selectedDate,
  onDateChange,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) {
      setInputValue(format(selectedDate, 'dd/MM/yyyy'));
    } else {
      setInputValue('');
    }
  }, [selectedDate]);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const handleSelectDate = (date: Date) => {
    onDateChange(date);
    setInputValue(format(date, 'dd/MM/yyyy'));
    setShowCalendar(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsedDate = parse(inputValue, 'dd/MM/yyyy', new Date());
    if (!isNaN(parsedDate.getTime())) {
      onDateChange(parsedDate);
    } else {
      onDateChange(null);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
        <FormattedMessage {...messages.dueDateLabel} />
      </label>

      <div className="relative">
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 placeholder:font-extralight rounded-md text-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300 ${inputClassName}`}
        />
        <FontAwesomeIcon
          icon={faCalendarDays}
          onClick={() => setShowCalendar((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-600 dark:text-zinc-100 cursor-pointer"
        />
      </div>

      {showCalendar && (
        <div className="absolute z-10 mt-2">
          <Calendar
            selectedDate={selectedDate ?? undefined}
            onSelectDate={handleSelectDate}
            className={calendarClassName}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
