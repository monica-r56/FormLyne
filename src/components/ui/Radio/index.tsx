import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'onValueChange' | 'asChild'>,
    VariantProps<typeof radioGroupVariants> {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  type?: 'dot' | 'check';
}

const radioGroupVariants = cva(
  'w-[16px] h-[16px] border rounded-full cursor-pointer flex items-center justify-center bg-white dark:bg-zinc-900 focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-offset-[2px] disabled:hover:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: `
            border border-zinc-300 
            hover:border-blue-700 dark:hover:border-blue-700
            focus-visible:outline-blue-700  focus-visible:border-blue-700
            data-[state=checked]:border-none data-[state=checked]:bg-blue-700 dark:data-[state=checked]:bg-blue-700 dark:data-[state=checked]:hover:bg-blue-800  data-[state=checked]:hover:bg-blue-800 dark:bg-zinc-900 dark:border-zinc-600 
            disabled:border-zinc-300  disabled:hover:border-zinc-300 
            disabled:data-[state=checked]:bg-blue-700 disabled:data-[state=checked]:hover:bg-blue-700 disabled:dark:data-[state=checked]:bg-blue-700  disabled:dark:hover:border-zinc-600
          `,
        error: `
            border-red-600 hover:border-red-700 dark:hover:border-red-700 
            focus-visible:outline-red-600  focus-visible:border-red-600
            data-[state=checked]:bg-red-600 data-[state=checked]:hover:bg-red-700 data-[state=checked]:border-none dark:data-[state=checked]:bg-red-600 dark:data-[state=checked]:hover:bg-red-700 dark:disabled:data-[state=checked]:hover:bg-red-600 dark:data-[state=checked]:border-none
            disabled:border-red-600  disabled:dark:hover:border-red-600
            disabled:data-[state=checked]:bg-red-600 
          `,
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'type'> {
  type?: 'dot' | 'check';
  error?: boolean;
  value: string;
}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(
  ({ className, type, error, disabled, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={radioGroupVariants({
          variant: error ? 'error' : 'default',
          className,
        })}
        disabled={disabled}
        {...props}
      >
        <RadioGroupPrimitive.Indicator>
          {type === 'check' ? (
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          ) : (
            <div className="size-1.5 rounded-full bg-white"></div>
          )}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroupItem };
