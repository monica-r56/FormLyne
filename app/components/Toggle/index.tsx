import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import clsx from 'clsx';

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'asChild' | 'onChange'> {
  isSelected?: boolean;
  defaultSelected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onChange?: (selected: boolean) => void;
}

const sizeStyles = {
  sm: {
    root: 'w-[28px] h-[14px] rounded-[12px] p-[2px] flex items-center flex-shrink-0 cursor-pointer',
    thumb: 'w-[10px] h-[10px] left-[2px] data-[state=checked]:translate-x-[14px]',
  },
  md: {
    root: 'w-[44px] h-[24px] rounded-[12px] p-[2px] flex items-center flex-shrink-0 cursor-pointer',
    thumb: 'w-[20px] h-[20px] data-[state=checked]:translate-x-[19px]',
  },
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ isSelected, defaultSelected, disabled, size = 'md', onChange, className }, ref) => {
    if (isSelected !== undefined && defaultSelected !== undefined) {
      console.warn(
        "Toggle component should not receive both 'isSelected' and 'defaultSelected'. Use either controlled or uncontrolled mode."
      );
    }
    const styles = sizeStyles[size];

    return (
      <SwitchPrimitive.Root
        ref={ref}
        checked={isSelected}
        defaultChecked={defaultSelected}
        disabled={disabled}
        onCheckedChange={onChange}
        data-disabled={disabled || undefined} //By explicitly passing undefined, we ensure the attribute is omitted from the DOM when not needed(data-disabled = false is also a truthy valu)
        className={clsx(
          'group relative box-border shrink-0 border-0 transition-colors duration-200',
          'focus-visible:border-blue-700 focus-visible:outline-[4px] focus-visible:outline-offset-[4px] focus-visible:outline-blue-600',
          styles.root,
          'bg-zinc-200 data-[state=checked]:bg-blue-700 dark:bg-zinc-700 dark:data-[state=checked]:bg-blue-700',
          disabled
            ? 'opacity-50 hover:cursor-not-allowed'
            : 'hover:bg-zinc-300 data-[state=checked]:hover:bg-blue-800 dark:hover:bg-zinc-600 dark:data-[state=checked]:hover:bg-blue-800',
          className
        )}
      >
        <SwitchPrimitive.Thumb
          className={clsx(
            'pointer-events-none rounded-full bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),0px_1px_3px_0px_rgba(10,13,18,0.10)] transition-transform duration-200',
            'absolute top-1/2 -translate-y-1/2',
            styles.thumb
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Toggle.displayName = 'Toggle';
