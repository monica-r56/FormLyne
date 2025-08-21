import React from 'react';
import { Button } from '../Button';
import LabelGroup from '../LabelGroup';
import { twMerge } from 'tailwind-merge';

type ButtonPropsSubset = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>;

interface CardProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  buttonLabel?: string;
  buttonProps?: ButtonPropsSubset;
  children?: React.ReactNode; // ✅ added children
}

const Card: React.FC<CardProps> = ({
  className,
  label,
  labelClassName,
  buttonLabel,
  buttonProps,
  children,
}) => {
  return (
    <div
      className={twMerge(
        'flex h-full w-full flex-col rounded-[8px] border border-zinc-200 bg-zinc-100  dark:border-zinc-700 dark:bg-zinc-900',
        className
      )}
    >
      {children ? (
        children 
      ) : (
        <>
          <div>
            <LabelGroup label={label} labelClassName={labelClassName} />
          </div>
          {buttonLabel && (
            <div>
              <Button label={buttonLabel} type="button" color="gray" {...buttonProps} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
