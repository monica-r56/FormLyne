import * as React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import message from './message';
import { createMsgGetter } from '@utils/createMsgGetter';

const msg = createMsgGetter(message);

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'className'> {
  rows?: 4 | 8;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const textAreaVariants = cva(
  [
    'w-full rounded text-sm bg-white dark:bg-zinc-900 font-normal text-zinc-900 dark:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 border',
  ],
  {
    variants: {
      error: {
        true: ['border-red-500 hover:border-red-600'],
        false: ['border-zinc-300  dark:border-zinc-600'],
      },
      disabled: {
        true: ['opacity-50 cursor-not-allowed'],
        false: [],
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
    compoundVariants: [
      {
        error: false,
        disabled: false,
        className: [
          'hover:border-zinc-400 dark:hover:border-zinc-500',
          'hover:focus-within:border-blue-700',
          'focus-within:border-blue-700',
        ],
      },
    ],
  }
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { rows = 4, error = false, disabled = false, placeholder, value, defaultValue = '', onChange, className, ...rest },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    return (
      <div
        tabIndex={0}
        role="textbox"
        aria-label={msg('ariaLabel')}
        className={clsx(textAreaVariants({ error, disabled }), rows === 8 ? 'min-h-48' : 'min-h-28', className)}
      >
        <textarea
          {...rest}
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          rows={rows}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={error}
          className={clsx(
            'h-full w-full resize-none bg-transparent px-2 py-2 text-sm font-normal placeholder-zinc-500 outline-none dark:placeholder-zinc-400',
            disabled && 'cursor-not-allowed'
          )}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
