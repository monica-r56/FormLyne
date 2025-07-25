import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const loaderVariants = cva('inline-block align-[-0.125em]', {
  variants: {
    size: {
      xs: 'h-[12px] w-[12px]',
      sm: 'h-[16px] w-[16px]',
      md: 'h-[24px] w-[24px]',
      lg: 'h-[48px] w-[48px]',
      '2xs': 'h-[6px] w-[6px]',
    },
    color: {
      black: 'text-zinc-700 dark:text-zinc-400',
      blue: 'text-blue-700 dark:text-blue-300',
      red: 'text-red-700 dark:text-red-400',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'lg',
    color: 'black',
  },
});

type SpinnerColor = NonNullable<VariantProps<typeof loaderVariants>['color']>;
interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loaderVariants> {
  loading?: boolean;
  label?: string;
  color?: SpinnerColor;
}

export const Loader = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, color = 'black', loading = true, label = 'Loading', className, ...props }, ref) => {
    if (!loading) return null;

    const safeColor: SpinnerColor = ['black', 'blue', 'red', 'white'].includes(color) ? color : 'black';
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        aria-live="polite"
        className={clsx(loaderVariants({ size, color: safeColor }), className)}
        {...props}
      >
        <svg
          className={clsx('animate-spin', className)}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM3.6 24C3.6 35.2666 12.7334 44.4 24 44.4C35.2666 44.4 44.4 35.2666 44.4 24C44.4 12.7334 35.2666 3.6 24 3.6C12.7334 3.6 3.6 12.7334 3.6 24Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M1.8 24C0.805887 24 -0.00702475 24.807 0.0674576 25.7983C0.376514 29.9117 1.74178 33.8871 4.04473 37.3337C6.68188 41.2805 10.4302 44.3566 14.8156 46.1731C19.201 47.9896 24.0266 48.4649 28.6822 47.5388C33.3377 46.6128 37.6141 44.327 40.9706 40.9706C44.327 37.6141 46.6128 33.3377 47.5388 28.6822C48.4649 24.0266 47.9896 19.201 46.1731 14.8156C44.3566 10.4302 41.2805 6.68188 37.3337 4.04473C33.8871 1.74179 29.9117 0.376515 25.7984 0.067458C24.807 -0.00702458 24 0.805887 24 1.8C24 2.79411 24.8075 3.59175 25.7977 3.67935C29.1982 3.98016 32.4793 5.13078 35.3336 7.03802C38.6884 9.2796 41.3031 12.4656 42.8471 16.1933C44.3912 19.9209 44.7952 24.0226 44.008 27.9798C43.2209 31.9371 41.278 35.572 38.425 38.425C35.572 41.278 31.9371 43.2209 27.9798 44.008C24.0226 44.7952 19.9209 44.3912 16.1933 42.8471C12.4656 41.3031 9.2796 38.6884 7.03802 35.3336C5.13078 32.4793 3.98016 29.1982 3.67935 25.7977C3.59175 24.8075 2.79411 24 1.8 24Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }
);

Loader.displayName = 'Loader';
