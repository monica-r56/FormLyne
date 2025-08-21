import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

interface AssigneeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onEmailsChange?: (emails: string[]) => void;
}

const STORAGE_KEY = 'assignee_emails_input';

const AssigneeInput: React.FC<AssigneeInputProps> = ({
  className,
  onEmailsChange,
  ...props
}) => {
  const [value, setValue] = useState('');

  // Load saved value from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setValue(saved);
      const emails = saved
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);
      onEmailsChange?.(emails);
    }
  }, [onEmailsChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    sessionStorage.setItem(STORAGE_KEY, input); 

    const emails = input
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    onEmailsChange?.(emails);
  };

  return (
    <div className={clsx('w-full', className)}>
      <label className="block text-sm font-small text-gray-700 dark:text-gray-300 mb-1">
        <FormattedMessage id="assignee.label" defaultMessage="Add one or more email addresses separated by commas" />
      </label>
      <input
        type="text"
        className={clsx(
          'w-full border border-gray-100 dark:border-zinc-700 rounded-md px-3 py-2 text-sm',
          'focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-300 bg-zinc-100 dark:bg-zinc-700 dark:text-white',
          'placeholder-gray-400 dark:placeholder-zinc-500 transition duration-200 ease-in-out'
        )}
        placeholder="email1@example.com, email2@example.com"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

export default AssigneeInput;
