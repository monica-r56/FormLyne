import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { cn } from '@utils/cn';
import Chip from '@components/Chips';
import { Dropdown } from '../Dropdowns';
import { Loader } from '@components/Loader';

const accordionItemVariants = cva('flex flex-col ', {
  variants: {
    type: {
      boxed: 'border border-zinc-300 dark:border-zinc-600 rounded-[8px] gap-2',
      divider: 'border-b-2 border-zinc-300 dark:border-zinc-600 rounded-[8px] gap-1',
    },
  },
  defaultVariants: {
    type: 'divider',
  },
});

const accordionTriggerColorVariants = cva('', {
  variants: {
    color: {
      white: 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100',
      blue: 'bg-blue-50 text-zinc-900 dark:bg-blue-900 dark:text-zinc-100 border-none',
    },
  },
  defaultVariants: {
    color: 'white',
  },
});

type AccordionType = 'boxed' | 'divider';
type AccordionColor = 'white' | 'blue';
type IconPosition = 'left' | 'right';

export interface AccordionProps extends Omit<AccordionPrimitive.AccordionMultipleProps, 'type'> {
  type?: AccordionType;
  color?: AccordionColor;
  className?: string;
  labelclassName?: string;
}

export interface AccordionItemProps extends Omit<React.ComponentProps<typeof AccordionPrimitive.Item>, 'value'> {
  label: string;
  id: string;
  status?: string;
  statusColor?: 'blue' | 'gray' | 'ltgray' | 'purple' | 'orange' | 'red' | 'solidRed' | 'green' | 'amber';
  dropdownProps?: React.ComponentProps<typeof Dropdown>;
  dropdownIcon?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  labelclassName?: string;
  loading?: boolean;
}

const AccordionContext = React.createContext<{ type: AccordionType; color: AccordionColor } | undefined>(undefined);

function Accordion({ type = 'divider', color = 'white', ...props }: AccordionProps) {
  const effectiveColor = type === 'divider' && color === 'blue' ? 'white' : color;

  return (
    <AccordionContext.Provider value={{ type, color: effectiveColor }}>
      <AccordionPrimitive.Root
        type="multiple"
        className="flex flex-col gap-2"
        data-testid="accordion-root"
        {...props}
      />
    </AccordionContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const context = React.useContext(AccordionContext);
  const isBoxedBlue = context?.type === 'boxed' && context?.color === 'blue';

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={twMerge(
          'mr-0 flex flex-1 items-center justify-between gap-2 rounded-[8px] text-left text-sm font-normal transition-all duration-300 ease-out hover:cursor-pointer focus-visible:outline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]_.rotate-icon]:rotate-180',
          context?.type === 'boxed' ? accordionTriggerColorVariants({ color: context.color }) : '',
          isBoxedBlue && 'data-[state=closed]:rounded-[8px] data-[state=open]:rounded-b-none',
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up transition-all',
        'data-[state=closed]:overflow-hidden'
      )}
      {...props}
    >
      <div className="p-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

function AccordionItem({
  className,
  children,
  label,
  id,
  status,
  statusColor,
  icon,
  labelclassName,
  dropdownProps,
  loading = false,
  iconPosition = 'left',
  ...props
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  const { type, color } = context;

  const isBlueBoxed = type === 'boxed' && color === 'blue';

  return (
    <AccordionPrimitive.Item
      className={twMerge(
        accordionItemVariants({ type }),
        'justify-center rounded-[8px] transition-all duration-200 ease-out data-[state=open]:pb-0 dark:bg-zinc-800',
        loading && 'pointer-events-none',
        isBlueBoxed && 'border-none',
        className
      )}
      value={id}
      {...props}
    >
      <div>
        <AccordionTrigger className="min-w-0">
          <div
            className={cn(
              'ml-4 flex w-full min-w-0 flex-col gap-2 pr-2 sm:flex-row sm:items-center sm:justify-between',
              type === 'divider' && 'h-auto py-2 sm:h-13',
              type === 'boxed' && (dropdownProps ? 'h-auto py-2 sm:max-h-11' : 'max-h-11 py-1')
            )}
          >
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                {iconPosition === 'left' && icon && <div className="flex-shrink-0">{icon}</div>}
                <span className={cn('min-w-0 truncate', labelclassName)}>{label}</span>
                {iconPosition === 'right' && icon && <div className="flex-shrink-0">{icon}</div>}

                <div className="ml-auto flex items-center justify-center gap-1 sm:hidden">
                  {status && (
                    <Chip label={status} color={statusColor ?? 'blue'} size="medium" shape="rounded" type="primary" />
                  )}
                  <div className="flex h-9 w-9 items-center justify-center p-2 sm:hidden">
                    {loading ? (
                      <Loader color="black" size="sm" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="rotate-icon pointer-events-none text-xl text-zinc-600 transition-transform duration-300 ease-out dark:text-zinc-400"
                      />
                    )}
                  </div>
                </div>
              </div>

              {dropdownProps && (
                <div className="w-full flex-shrink-0 sm:w-fit">
                  <div
                    className="w-full max-w-full sm:min-w-68"
                    onClick={(e) => e.stopPropagation()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <Dropdown {...dropdownProps} />
                  </div>
                </div>
              )}
            </div>

            <div className="hidden flex-shrink-0 items-center justify-center gap-1 sm:flex">
              {status && (
                <Chip label={status} color={statusColor ?? 'blue'} size="medium" shape="rounded" type="primary" />
              )}
              <div className="hidden h-9 w-9 items-center justify-center p-2 sm:flex">
                {loading ? (
                  <Loader color="black" size="sm" />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="rotate-icon pointer-events-none text-xl text-zinc-600 transition-transform duration-300 ease-out dark:text-zinc-400"
                  />
                )}
              </div>
            </div>
          </div>
        </AccordionTrigger>
      </div>
      <AccordionContent>{children}</AccordionContent>
    </AccordionPrimitive.Item>
  );
}

export { Accordion, AccordionItem };
