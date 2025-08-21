import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Dropdown } from '@/components/ui/Dropdowns';
import { useIntl } from 'react-intl';
import messages from './messages';

export type StatusValue =
  | 'Backlog'
  | 'To do'
  | 'In Progress'
  | 'Done'
  | 'Cancelled'
  | 'Duplicate';

export interface StatusOption {
  label: string;
  value: StatusValue;
}

interface StatusDropdownProps {
  value?: StatusValue;
  onChange?: (val: StatusValue) => void;
  className?: string;
  options?: StatusOption[];
}

const SESSION_KEY = 'statusDropdownValue';

export const StatusDropdown: FC<StatusDropdownProps> = ({
  value = 'To do',
  onChange,
  className,
  options,
}) => {
  const intl = useIntl();
  const [selectedValue, setSelectedValue] = useState<StatusValue>(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return (stored as StatusValue) || value;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, selectedValue);
  }, [selectedValue]);

  const defaultOptions: StatusOption[] = [
    { value: 'Backlog', label: intl.formatMessage(messages.backlog) },
    { value: 'To do', label: intl.formatMessage(messages.todo) },
    { value: 'In Progress', label: intl.formatMessage(messages.inProgress) },
    { value: 'Done', label: intl.formatMessage(messages.done) },
    { value: 'Cancelled', label: intl.formatMessage(messages.cancelled) },
    { value: 'Duplicate', label: intl.formatMessage(messages.duplicate) },
  ];

  const dropdownOptions = options ?? defaultOptions;

  const handleChange = (val: string) => {
    const newValue = val as StatusValue;
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={className}>
      <Dropdown
        options={dropdownOptions}
        defaultSelected={selectedValue}
        onValueChange={handleChange}
        menuClassName="rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700"
        itemClassName="hover:bg-gray-100 font-medium dark:hover:bg-zinc-800 px-4 py-2 transition-all"
      />
    </div>
  );
};

export default StatusDropdown;
