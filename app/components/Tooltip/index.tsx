import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { useMemo } from 'react';
import clsx from 'clsx';

type TooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'right'
  | 'left'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export interface TooltipProps {
  label: string;
  text?: string;
  arrow?: boolean;
  position: TooltipPosition;
  delay?: number;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const POSITION_MAP: Record<
  TooltipPosition,
  { side: 'top' | 'right' | 'bottom' | 'left'; align: 'start' | 'center' | 'end' }
> = {
  'top-left': { side: 'bottom', align: 'start' },
  'top-center': { side: 'bottom', align: 'center' },
  'top-right': { side: 'bottom', align: 'end' },
  right: { side: 'left', align: 'center' },
  left: { side: 'right', align: 'center' },
  'bottom-center': { side: 'top', align: 'center' },
  'bottom-left': { side: 'top', align: 'start' },
  'bottom-right': { side: 'top', align: 'end' },
};

export const Tooltip = ({
  label,
  text,
  arrow = false,
  position,
  delay = 100,
  children,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) => {
  const { side, align } = useMemo(() => POSITION_MAP[position], [position]);

  const isDisabled = useMemo(() => {
    return React.Children.toArray(children).some((child) => {
      if (React.isValidElement<{ disabled?: boolean; 'aria-disabled'?: boolean }>(child)) {
        const { disabled, 'aria-disabled': ariaDisabled } = child.props;
        return disabled === true || ariaDisabled === true;
      }
      return false;
    });
  }, [children]);

  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root {...(open !== undefined ? { open, onOpenChange } : { defaultOpen })}>
        <TooltipPrimitive.Trigger asChild>
          <span data-testid="tooltip-trigger" className={clsx('inline-block', { 'pointer-events-none': isDisabled })}>
            {children}
          </span>
        </TooltipPrimitive.Trigger>

        {!isDisabled && (
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side={side}
              align={align}
              sideOffset={5}
              className={clsx(
                'relative z-50 max-w-[320px] rounded-md bg-zinc-800 px-3 py-2 text-sm leading-none text-white shadow-md dark:bg-zinc-700',
                'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95 transition-all duration-500 ease-out data-[state=closed]:duration-200',
                className
              )}
              data-testid="tooltip-content"
              role="tooltip"
              aria-live="polite"
            >
              {arrow && (
                <TooltipPrimitive.Arrow className="-mt-0.5 fill-zinc-800 dark:fill-zinc-700" width={15} height={8} />
              )}

              {label && (
                <p className="text-left text-xs leading-[1.5] font-semibold break-words" data-testid="tooltip-label">
                  {label}
                </p>
              )}

              {text && (
                <p
                  className={clsx('text-left text-xs leading-[1.5] font-normal break-words', { 'mt-1': label })}
                  data-testid="tooltip-description"
                >
                  {text}
                </p>
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.displayName = 'Tooltip';
