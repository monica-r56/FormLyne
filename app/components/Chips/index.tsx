import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const chipVariants = cva('inline-flex items-center font-medium cursor-default whitespace-nowrap min-w-fit', {
  variants: {
    type: {
      primary: '',
      secondary: 'bg-white dark:bg-zinc-900',
    },
    shape: {
      squared: 'rounded-[4px]',
      rounded: 'rounded-[200px]',
    },
    size: {
      small: 'text-xs leading-4 h-5 py-0.5 px-2 min-w-[40px]',
      medium: 'text-sm h-6 py-0.5 px-3 min-w-[50px]',
      large: 'text-sm h-8 py-1.5 px-3 min-w-[60px]',
    },
    color: {
      gray: 'text-zinc-900 dark:text-zinc-100',
      ltgray: 'text-zinc-500 dark:text-zinc-400',
      purple: 'text-purple-700  dark:text-purple-300',
      blue: 'text-blue-700 dark:text-blue-300',
      orange: 'text-orange-700 dark:text-orange-200',
      red: 'text-red-700 dark:text-red-300',
      solidRed: '',
      green: 'text-green-700 dark:text-green-200',
      amber: 'text-amber-700 dark:text-amber-200',
    },
  },
  compoundVariants: [
    // Primary type variants with color tokens
    {
      type: 'primary',
      color: 'gray',
      class: 'bg-zinc-100 dark:bg-zinc-700',
    },
    {
      type: 'primary',
      color: 'ltgray',
      class: 'bg-zinc-100 dark:bg-zinc-700',
    },
    {
      type: 'primary',
      color: 'purple',
      class: 'bg-purple-50 dark:bg-purple-900',
    },
    {
      type: 'primary',
      color: 'blue',
      class: 'bg-blue-50 dark:bg-blue-900',
    },
    {
      type: 'primary',
      color: 'orange',
      class: 'bg-orange-50 dark:bg-orange-900',
    },
    {
      type: 'primary',
      color: 'red',
      class: 'bg-red-50 dark:bg-red-900',
    },
    {
      type: 'primary',
      color: 'solidRed',
      class: 'bg-red-600 text-white dark:bg-red-600 dark:text-white',
    },
    {
      type: 'primary',
      color: 'green',
      class: 'bg-green-50 dark:bg-green-900',
    },
    {
      type: 'primary',
      color: 'amber',
      class: 'bg-amber-50 dark:bg-amber-900',
    },

    // Secondary type variants with color tokens
    {
      type: 'secondary',
      color: 'gray',
      class: 'border border-zinc-100 dark:border-zinc-700',
    },
    {
      type: 'secondary',
      color: 'ltgray',
      class: 'border border-zinc-100 dark:border-zinc-700',
    },
    {
      type: 'secondary',
      color: 'purple',
      class: 'border border-purple-100 dark:border-purple-800',
    },
    {
      type: 'secondary',
      color: 'blue',
      class: 'border border-blue-100 dark:border-blue-800',
    },
    {
      type: 'secondary',
      color: 'orange',
      class: 'border border-orange-100 dark:border-orange-800',
    },
    {
      type: 'secondary',
      color: 'red',
      class: 'border border-red-100 dark:border-red-800',
    },
    {
      type: 'secondary',
      color: 'solidRed',
      class: 'border border-red-600 text-red-600 dark:border-red-600 dark:text-red-600',
    },
    {
      type: 'secondary',
      color: 'green',
      class: 'border border-green-100 dark:border-green-800',
    },
    {
      type: 'secondary',
      color: 'amber',
      class: 'border border-amber-100 dark:border-amber-800',
    },
  ],
  defaultVariants: {
    type: 'primary',
    shape: 'rounded',
    size: 'medium',
    color: 'blue',
  },
});

export interface ChipProps extends VariantProps<typeof chipVariants> {
  label: string;
}

const Chip: React.FC<ChipProps> = ({ label, ...variantProps }) => {
  const displayLabel = !label || label.trim() === '' ? '\u00A0' : label;
  return <div className={` ${chipVariants({ ...variantProps })} `}>{displayLabel}</div>;
};
export default Chip;
