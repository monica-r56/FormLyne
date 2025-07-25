import React from 'react';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from '../IconButton';

interface RTIconButtonProps
  extends Omit<IconButtonProps, 'icon' | 'loading' | 'floating' | 'size' | 'rounded'>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon: React.ReactNode;
  scaleOnHover?: boolean;
  color?: 'blue' | 'red' | 'gray';
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  disabled?: boolean;
  className?: string;
}

export const RTIconButton = React.forwardRef<HTMLButtonElement, RTIconButtonProps>(function RealTimeIconButton(
  { icon, scaleOnHover = true, disabled = false, className = '', color = 'gray', type = 'Tertiary', ...props },
  ref
) {
  return (
    <IconButton
      ref={ref}
      color={color}
      type={type}
      disabled={disabled}
      icon={
        <span
          className={clsx(
            'flex items-center justify-center transition-transform duration-100 ease-[cubic-bezier(0,0,.2,1)]',
            !disabled && scaleOnHover && 'hover:scale-110'
          )}
        >
          {icon}
        </span>
      }
      className={clsx(
        'p-0 hover:bg-transparent active:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent',
        '[&_.inner-icon-style]:h-full [&_.inner-icon-style]:w-full [&_.inner-icon-style]:p-0',
        className
      )}
      {...props}
    />
  );
});
