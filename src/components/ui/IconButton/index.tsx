import * as React from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { Loader } from '../Loader';
import { twMerge } from 'tailwind-merge';

type Size = 'sm' | 'md';

const iconButtonVariants = cva(
  'relative flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline ',
  {
    variants: {
      type: {
        Primary: 'text-white',
        Secondary: '',
        Tertiary: 'bg-transparent disabled:hover:bg-transparent dark:disabled:hover:bg-zinc-900 dark:border-zinc-600 ',
      },
      color: {
        blue: 'focus-visible:outline-blue-700',
        red: 'focus-visible:outline-red-700',
        gray: 'active:bg-zinc-100 focus-visible:outline-zinc-700 text-zinc-900 dark:text-zinc-100 dark:active:bg-zinc-700 hover:bg-zinc-50',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
      floating: {
        true: 'shadow-lg',
        false: '',
      },
      menuTrigger: {
        true: '',
        false: '',
      },
      size: {
        sm: 'h-[20px] w-[20px] p-[4px] focus-visible:outline-1 focus-visible:outline-offset-1',
        md: 'h-[36px] w-[36px] p-[8px] focus-visible:outline-2 focus-visible:outline-offset-2',
      },
    },
    compoundVariants: [
      {
        type: 'Primary',
        color: 'blue',
        className: 'bg-blue-700 disabled:hover:bg-blue-700 hover:bg-blue-800 active:bg-blue-900 ',
      },
      {
        type: 'Primary',
        color: 'red',
        className: 'bg-red-600 disabled:hover:bg-red-600 hover:bg-red-700 active:bg-red-800 ',
      },
      {
        type: 'Secondary',
        color: 'blue',
        className:
          'bg-blue-50 disabled:hover:bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:disabled:hover:bg-blue-900 dark:hover:bg-blue-800 dark:active:bg-blue-700 dark:text-blue-200',
      },
      {
        type: 'Secondary',
        color: 'red',
        className:
          'bg-red-50 disabled:hover:bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 dark:bg-red-900 dark:disabled:hover:bg-red-900 dark:hover:bg-red-800 dark:active:bg-red-700 dark:text-red-200',
      },
      {
        type: 'Secondary',
        color: 'gray',
        size: 'md',
        className:
          'bg-white border border-zinc-300 disabled:hover:bg-white dark:bg-zinc-900 dark:disabled:hover:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-600',
      },
      {
        type: 'Secondary',
        color: 'gray',
        size: 'sm',
        className:
          'bg-white border border-[0.56px] border-zinc-300 disabled:hover:bg-white dark:bg-zinc-900 dark:disabled:hover:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-600',
      },
      {
        type: 'Tertiary',
        color: 'blue',
        className:
          'hover:bg-blue-50 active:bg-blue-100 text-blue-700 dark:hover:bg-blue-900 dark:text-blue-300 dark:active:bg-blue-800',
      },
      {
        type: 'Tertiary',
        color: 'red',
        className:
          'hover:bg-red-50 active:bg-red-100 text-red-700 dark:hover:bg-red-900 dark:active:bg-red-800 dark:text-red-300',
      },
      {
        type: 'Tertiary',
        color: 'gray',
        className: 'dark:hover:bg-zinc-800',
      },
      {
        size: 'sm',
        rounded: false,
        className: 'rounded-[4.44px]',
      },
      {
        size: 'md',
        rounded: false,
        className: 'rounded-[8px]',
      },
      {
        menuTrigger: true,
        size: 'sm',
        className: 'w-[10px] p-0',
      },
      {
        menuTrigger: true,
        size: 'md',
        className: 'w-[14px] p-0',
      },
    ],
    defaultVariants: {
      type: 'Primary',
      color: 'blue',
      rounded: false,
      floating: false,
    },
  }
);

type BaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'children'> & {
  loading?: boolean;
  icon: React.ReactNode;
  rounded?: boolean;
  floating?: boolean;
  menuTrigger?: boolean;
  size?: Size;
};

export interface IconButtonProps extends BaseProps {
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  color?: 'blue' | 'red' | 'gray';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    type = 'Primary',
    color = 'blue',
    size = 'md',
    rounded = false,
    floating = false,
    menuTrigger = false,
    loading = false,
    disabled = false,
    icon,
    className,
    ...props
  },
  ref
) {
  const isDisabled = disabled;
  const isLoading = loading;
  const adjustedType = color === 'gray' && type === 'Primary' ? 'Secondary' : type;
  const spinnerColor: 'white' | 'red' | 'blue' | 'black' =
    type === 'Primary' && (color === 'blue' || color === 'red')
      ? 'white'
      : (type === 'Secondary' || type === 'Tertiary') && color === 'blue'
        ? 'blue'
        : color === 'red'
          ? 'red'
          : 'black';

  const spinnerSize = menuTrigger ? '2xs' : size === 'sm' ? 'xs' : 'sm';

  return (
    <button
      type="button"
      ref={ref}
      aria-busy={loading}
      disabled={isDisabled || isLoading}
      className={twMerge(
        iconButtonVariants({ type: adjustedType, color, rounded, floating, size, menuTrigger }),
        className,
        loading && 'relative',
        isLoading && !disabled && 'disabled:opacity-100'
      )}
      {...props}
    >
      <span
        className={clsx(
          'flex items-center justify-center overflow-hidden',
          size === 'sm' && 'h-[12px] w-[12px]',
          size === 'md' && 'h-[20px] w-[20px] p-[2px]',
          'inner-icon-style'
        )}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader color={spinnerColor} size={spinnerSize} />
          </span>
        ) : (
          icon
        )}
      </span>
    </button>
  );
});
