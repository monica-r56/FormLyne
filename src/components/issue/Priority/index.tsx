import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Dropdown } from '@/components/ui/Dropdowns';
import { useIntl } from 'react-intl';
import messages from './messages';

export type PriorityValue = 'No priority' | 'Urgent' | 'High' | 'Medium' | 'Low';

export interface PriorityOption {
  label: string;
  value: PriorityValue;
}

interface PriorityDropdownProps {
  value?: PriorityValue;
  onChange?: (val: PriorityValue) => void;
  className?: string;
  options?: PriorityOption[];
}

const SESSION_KEY = 'selected-priority';

export const PriorityDropdown: FC<PriorityDropdownProps> = ({
  value,
  onChange,
  className,
  options,
}) => {
  const intl = useIntl();

  const defaultOptions: PriorityOption[] = [
    { value: 'No priority', label: intl.formatMessage(messages.noPriority) },
    { value: 'Urgent', label: intl.formatMessage(messages.urgent) },
    { value: 'High', label: intl.formatMessage(messages.high) },
    { value: 'Medium', label: intl.formatMessage(messages.medium) },
    { value: 'Low', label: intl.formatMessage(messages.low) },
  ];

  const dropdownOptions = options ?? defaultOptions;

  // Load stored value from session or fallback to prop or 'No priority'
  const getInitialValue = (): PriorityValue => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored && dropdownOptions.some(opt => opt.value === stored)) {
      return stored as PriorityValue;
    }
    return value ?? 'No priority';
  };

  const [selectedValue, setSelectedValue] = useState<PriorityValue>(getInitialValue);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, selectedValue);
  }, [selectedValue]);

  const handleChange = (val: string) => {
    const typedVal = val as PriorityValue;
    setSelectedValue(typedVal);
    onChange?.(typedVal);
  };

  return (
    <div className={className}>
      <Dropdown
        options={dropdownOptions}
        defaultSelected={selectedValue}
        onValueChange={handleChange}
        menuClassName="rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700"
        itemClassName="hover:bg-gray-100 dark:hover:bg-zinc-800 px-4 py-2 transition-all"
      />
    </div>
  );
};

export default PriorityDropdown;
