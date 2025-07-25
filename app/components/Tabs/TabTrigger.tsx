import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { cva } from 'class-variance-authority';

export const tabVariants = cva(
  'flex items-center overflow-hidden text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 font-normal data-[state=active]:font-medium font-roboto leading-tight px-3 gap-1 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed z-10 relative',

  {
    variants: {
      variant: {
        primary: 'rounded-md py-1.5',
        secondary: 'rounded-none py-2',
        vertical: 'rounded-none py-2',
      },
      hasIcon: {
        true: 'gap-1',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        className:
          'text-zinc-800 dark:text-zinc-300 data-[state=inactive]:hover:bg-zinc-200 dark:data-[state=inactive]:hover:bg-zinc-700 data-[state=active]:text-zinc-800 dark:data-[state=active]:text-zinc-300',
      },
      {
        variant: 'secondary',
        className:
          'text-zinc-900 dark:text-zinc-100 hover:text-blue-700 dark:hover:text-blue-300 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300',
      },
      {
        variant: 'vertical',
        className:
          'text-zinc-900 dark:text-zinc-100 hover:text-blue-700 dark:hover:text-blue-300 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300 ',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      hasIcon: false,
    },
  }
);

export type TabVariant = 'primary' | 'secondary' | 'vertical';

const TabsVariantContext = createContext<TabVariant>('primary');

export const useTabVariant = () => useContext(TabsVariantContext);

export const TabsVariantProvider = ({
  children,
  variant = 'primary',
}: {
  children: React.ReactNode;
  variant: TabVariant;
}) => <TabsVariantContext.Provider value={variant}>{children}</TabsVariantContext.Provider>;

interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
  type?: TabVariant;
}

export function TabsList({ className, type = 'primary', children, ...props }: TabsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });

  const updateIndicator = useCallback(() => {
    const active = containerRef.current?.querySelector('[data-state="active"]') as HTMLElement;
    if (active) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = active;
      setIndicatorStyle({
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    updateIndicator();

    const resizeObserver = new ResizeObserver(updateIndicator);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [updateIndicator]);

  return (
    <TabsVariantProvider variant={type}>
      <TabsPrimitive.List
        ref={containerRef}
        className={clsx(
          'relative',
          type === 'vertical'
            ? 'inline-flex flex-col justify-start gap-1 rounded-lg'
            : 'inline-flex items-center gap-1 rounded-lg p-0.5',
          type === 'primary' ? 'bg-zinc-100 dark:bg-zinc-700' : '',
          className
        )}
        {...props}
      >
        {/* sliding pill */}
        {(type === 'primary' || type === 'secondary' || type === 'vertical') && (
          <div
            className={clsx(
              'pointer-events-none absolute z-0 transition-all duration-300 ease-in-out',
              type === 'primary' &&
                'rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900',
              type === 'secondary' && 'bottom-0 h-0.5 rounded bg-blue-700 dark:bg-blue-300',
              type === 'vertical' && 'left-0 w-full bg-blue-50 dark:bg-blue-900'
            )}
            style={{
              top: type === 'vertical' ? indicatorStyle.top : undefined,
              height:
                type === 'vertical' ? indicatorStyle.height : type === 'primary' ? indicatorStyle.height : undefined,
              left: type !== 'vertical' ? indicatorStyle.left : undefined,
              width: type !== 'vertical' ? indicatorStyle.width : undefined,
            }}
          />
        )}
        {children}
      </TabsPrimitive.List>
    </TabsVariantProvider>
  );
}

interface TabProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
  label?: string;
  value: string;
}

export function TabTrigger({ icon, count, children, disabled = false, className, label, value, ...props }: TabProps) {
  const variant = useTabVariant();
  const hasIcon = !!icon;
  const hasCount = typeof count === 'number' && count > 0;

  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={clsx(tabVariants({ variant, hasIcon }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span>{label || children}</span>
      {hasCount && <span className="ml-1 rounded-full bg-red-600 px-1.5 text-xs font-medium text-white">{count}</span>}
    </TabsPrimitive.Trigger>
  );
}
