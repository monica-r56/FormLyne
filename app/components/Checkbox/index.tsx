import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'onCheckedChange' | 'asChild'>,
    VariantProps<typeof checkboxVariants> {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
}

const checkboxVariants = cva(
  'w-[16px] h-[16px] border rounded-[4px] cursor-pointer flex items-center justify-center p-[2px] bg-white dark:bg-zinc-900 focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[2px] disabled:hover:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: `
          border border-zinc-300 
          hover:border-blue-700 dark:hover:border-blue-700
          focus-visible:outline-blue-700  focus-visible:border-blue-700
          data-[state=checked]:border-none data-[state=checked]:bg-blue-700 dark:data-[state=checked]:bg-blue-700 dark:data-[state=checked]:hover:bg-blue-800  data-[state=checked]:hover:bg-blue-800 dark:bg-zinc-900 dark:border-zinc-600 
          disabled:border-zinc-300  disabled:hover:border-zinc-300 
          disabled:data-[state=checked]:bg-blue-700 disabled:data-[state=checked]:hover:bg-blue-700  disabled:dark:data-[state=checked]:bg-blue-700  disabled:dark:hover:border-zinc-600
        `,
        error: `
          border-red-600 hover:border-red-700 dark:hover:border-red-700 
          focus-visible:outline-red-600  focus-visible:border-red-600
          data-[state=checked]:bg-red-600 data-[state=checked]:hover:bg-red-700 data-[state=checked]:border-none dark:data-[state=checked]:bg-red-600 dark:data-[state=checked]:hover:bg-red-700 dark:disabled:data-[state=checked]:hover:bg-red-600 dark:data-[state=checked]:border-none
          disabled:border-red-600 disabled:dark:hover:border-red-600
          disabled:data-[state=checked]:bg-red-600 
        `,
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ onCheckedChange, checked, indeterminate, disabled, error, className, defaultChecked }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        role="checkbox"
        className={checkboxVariants({
          variant: error ? 'error' : 'default',
          className,
        })}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <CheckboxPrimitive.Indicator>
          {indeterminate ? (
            <Minus className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          ) : (
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
