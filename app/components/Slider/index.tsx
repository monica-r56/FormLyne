import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cva } from 'class-variance-authority';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import _ from 'lodash';

interface SliderProps {
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  value?: number | number[]; // Controlled mode
  defaultValue?: number | number[]; // Uncontrolled mode
  valueLabels?: Record<number, string>;
  step?: number;
  size?: 'sm' | 'md';
  color?: 'blue' | 'gray';
  className?: string;
}

const trackVariants = cva('relative grow rounded-full', {
  variants: {
    color: {
      blue: 'bg-zinc-300 dark:bg-zinc-600',
      gray: 'bg-gray-200 dark:bg-zinc-600',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

const rangeVariants = cva('absolute rounded-full h-full', {
  variants: {
    color: {
      blue: 'bg-blue-700 dark:bg-blue-300',
      gray: 'bg-zinc-900 dark:bg-zinc-100',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

const thumbVariants = cva(
  'block rounded-full border-4 shadow-sm transition duration-200 ease-in-out ' +
    'bg-white dark:bg-zinc-900 outline-none focus:outline-none ring-0 ring-transparent',
  {
    variants: {
      color: {
        blue: 'border-blue-700 dark:border-blue-300',
        gray: 'border-zinc-900 dark:border-zinc-100',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);

const labelVariants = cva('text-sm font-normal font-roboto text-center', {
  variants: {
    color: {
      blue: 'text-neutral-500 dark:text-zinc-400',
      gray: 'text-zinc-600 dark:text-zinc-400',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      onValueChange,
      min,
      max,
      value,
      defaultValue = min,
      valueLabels,
      step = 1,
      size = 'md',
      color = 'blue',
      className,
      ...props
    },
    ref
  ) => {
    const intl = useIntl();

    const isControlled = value !== undefined;
    const normalizedValue = value ? (Array.isArray(value) ? value : [value]) : undefined;
    const normalizedDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue];

    const sizeConfig = {
      sm: {
        thumbSize: 'w-3.5 h-3.5',
        trackHeight: 'h-0.5',
      },
      md: {
        thumbSize: 'w-4 h-4',
        trackHeight: 'h-1',
      },
    };

    const sizes = sizeConfig[size];

    const renderLabels = () => {
      if (!valueLabels) return null;

      const sortedEntries = _.sortBy(Object.entries(valueLabels), ([key]) => Number(key));

      return (
        <div className="mt-[5px] flex h-4 w-full justify-between">
          {_.map(sortedEntries, ([value, label]) => (
            <div key={value} className={labelVariants({ color })}>
              {label}
            </div>
          ))}
        </div>
      );
    };
    const thumbCount = isControlled ? normalizedValue!.length : normalizedDefaultValue.length;

    return (
      <div className="w-full">
        <div className="relative flex h-4 w-full items-center">
          <SliderPrimitive.Root
            ref={ref}
            className={clsx(
              'slider-root relative flex w-full touch-none items-center rounded-md outline-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-zinc-900',
              className
            )}
            value={normalizedValue}
            defaultValue={isControlled ? undefined : normalizedDefaultValue}
            onValueChange={onValueChange}
            min={min}
            max={max}
            step={step}
            {...props}
            tabIndex={0}
          >
            <SliderPrimitive.Track
              className={`${trackVariants({ color })} ${sizes.trackHeight}`}
              data-testid="slider-track"
            >
              <SliderPrimitive.Range className={rangeVariants({ color })} />
            </SliderPrimitive.Track>

            {Array.from({ length: thumbCount }).map((_, index) => (
              <SliderPrimitive.Thumb
                key={index}
                className={`${thumbVariants({ color })} ${sizes.thumbSize}`}
                aria-label={intl.formatMessage({ id: 'atoms.Slider.thumbLabel', defaultMessage: 'Thumb' })}
              />
            ))}
          </SliderPrimitive.Root>
        </div>
        {renderLabels()}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
