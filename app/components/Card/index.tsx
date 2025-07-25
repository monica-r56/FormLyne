import React from 'react';
import { Button } from '@components/Button';
import LabelGroup from '@components/LabelGroup';
import { twMerge } from 'tailwind-merge';

type ButtonPropsSubset = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>;

interface CardProps {
  className?: string;
  label: string;
  labelClassName?: string;
  buttonLabel: string;
  buttonProps?: ButtonPropsSubset;
}

const Card: React.FC<CardProps> = ({ className, label, labelClassName, buttonLabel, buttonProps }) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full flex-col items-center justify-center gap-4 rounded-[8px] border border-zinc-200 bg-white py-6 dark:border-zinc-700 dark:bg-zinc-900',
        className
      )}
    >
      <div>
        <LabelGroup label={label} labelClassName={labelClassName} />
      </div>

      <div>
        <Button label={buttonLabel} type="button" color="gray" {...buttonProps} />
      </div>
    </div>
  );
};

export default Card;
