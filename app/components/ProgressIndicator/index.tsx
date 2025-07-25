import React from 'react';
import { clsx } from 'clsx';
import message from './message';

import { createMsgGetter } from '@utils/createMsgGetter';

const msg = createMsgGetter(message);

export type ProgressBarProps = {
  variant?: 'linear' | 'circular';
  value: number;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  size?: 'sm' | 'md';
  className?: string;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'none';
  valuePosition?: 'top' | 'bottom' | 'side' | 'none';
};

const colorMap: Record<NonNullable<ProgressBarProps['color']>, string> = {
  blue: 'bg-blue-700 dark:bg-blue-300 stroke-blue-700 dark:stroke-blue-300',
  green: 'bg-green-700 dark:bg-green-200 stroke-green-700 dark:stroke-green-200',
  red: 'bg-red-600 stroke-red-600 ',
  yellow: 'bg-yellow-300 stroke-yellow-300',
};

const sizeMap: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-[2px]',
  md: 'h-[4px]',
};

const TextClass = 'text-sm leading-tight font-normal text-zinc-900 dark:text-zinc-100';
const wrapperClass = 'flex w-full max-w-[256px] flex-col gap-2';
const barWrapperClass = 'inline-flex w-full max-w-[256px] items-center gap-2';
const baseBarClass = 'flex-grow overflow-hidden rounded bg-zinc-200 dark:bg-zinc-700';

export const ProgressIndicator: React.FC<ProgressBarProps> = ({
  variant = 'linear',
  value,
  color = 'blue',
  size = 'md',
  className = '',
  label,
  labelPosition = 'top',
  valuePosition,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const valueUnit = msg('value');
  const ariaLabel = label || msg('ariaLabel');

  const progressValue = `${clampedValue}${valueUnit}`;

  const renderLinear = () => (
    <div className={clsx(wrapperClass, className)}>
      {((valuePosition && valuePosition !== 'side') || label) && (
        <div className={clsx('flex w-full items-center', TextClass)}>
          {label && labelPosition === 'top' && (
            <span className={clsx('truncate', valuePosition === 'side' && '-mb-2')}>{label}</span>
          )}
          {valuePosition === 'top' && <span className="ml-auto whitespace-nowrap">{progressValue}</span>}
        </div>
      )}

      <div className={barWrapperClass}>
        <div
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clampedValue}
          className={clsx(baseBarClass, sizeMap[size])}
        >
          <div
            className={clsx('h-full rounded-full transition-[width] duration-100 ease-linear', colorMap[color])}
            style={{ width: progressValue }}
          />
        </div>

        {valuePosition === 'side' && <span className={clsx(TextClass, 'whitespace-nowrap')}>{progressValue}</span>}
      </div>

      {((valuePosition && valuePosition !== 'side') || label) && (
        <div className={clsx('flex w-full items-center', TextClass)}>
          {label && labelPosition === 'bottom' && (
            <span className={clsx('truncate', valuePosition === 'side' && '-mt-2')}>{label}</span>
          )}
          {valuePosition === 'bottom' && <span className="ml-auto whitespace-nowrap">{progressValue}</span>}
        </div>
      )}
    </div>
  );

  const renderCircular = () => {
    const radius = 45;
    const strokeWidth = 7;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - clampedValue / 100);

    return (
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
        className={clsx('inline-flex items-center justify-center', className)}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="block">
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            className="stroke-zinc-200 dark:stroke-zinc-700"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className={clsx('transition-all duration-300', colorMap[color])}
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-zinc-900 text-lg font-normal dark:fill-zinc-100"
          >
            {progressValue}
          </text>
        </svg>
      </div>
    );
  };

  return variant === 'circular' ? renderCircular() : renderLinear();
};
