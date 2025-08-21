import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Dropdown } from '@/components/ui/Dropdowns';
import { useIntl } from 'react-intl';
import messages from './messages';

export type LabelValue = 'Bug' | 'Feature' | 'Improvement';

export interface LabelOption {
  label: string;
  value: LabelValue;
}

interface LabelDropdownProps {
  value?: LabelValue;
  onChange?: (val: LabelValue) => void;
  className?: string;
  options?: LabelOption[];
}

const SESSION_KEY = 'selectedLabel';

export const LabelDropdown: FC<LabelDropdownProps> = ({
  value,
  onChange,
  className,
  options,
}) => {
  const intl = useIntl();

  const defaultOptions: LabelOption[] = [
    { value: 'Bug', label: intl.formatMessage(messages.bug) },
    { value: 'Feature', label: intl.formatMessage(messages.feature) },
    { value: 'Improvement', label: intl.formatMessage(messages.improvement) },
  ];

  const dropdownOptions = options ?? defaultOptions;

  const [selectedValue, setSelectedValue] = useState<LabelValue>(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return (stored as LabelValue) || value || 'Feature';
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, selectedValue);
  }, [selectedValue]);

  const handleChange = (val: string) => {
    const labelVal = val as LabelValue;
    setSelectedValue(labelVal);
    onChange?.(labelVal);
  };

  return (
    <div className={className}>
      <Dropdown
        options={dropdownOptions}
        defaultSelected={selectedValue}
        onValueChange={handleChange}
        menuClassName="rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        itemClassName="hover:bg-blue-100 dark:hover:bg-blue-900 px-4 py-2 font-medium text-sm transition-colors duration-200 cursor-pointer"
      />
    </div>
  );
};

export default LabelDropdown;
