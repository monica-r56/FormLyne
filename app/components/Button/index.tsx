import * as React from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'type' | 'children'> {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  spinnerColor?: 'white' | 'red' | 'blue' | 'black';
}

function Button({
  className,
  disabled = false,
  loading = false,
  label,
  icon,
  iconPosition = 'left',
  spinnerColor = 'white',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading}
      aria-label={label}
      data-slot="button"
      type={type}
      className={twMerge(
        'relative inline-flex items-center justify-center rounded-md h-[36px] w-full sm:w-auto px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'hover:cursor-pointer',
        disabled && 'opacity-50 hover:cursor-not-allowed',
        loading && 'relative',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className={clsx('flex items-center justify-center gap-2', loading && 'opacity-0')}>
        {iconPosition === 'left' && icon}
        <span className="whitespace-nowrap">{label}</span>
        {iconPosition === 'right' && icon}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader color={spinnerColor} size="md" />
        </span>
      )}
    </button>
  );
}

export { Button };