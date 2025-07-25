import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import clsx from 'clsx';
import { RadioGroupItem } from '@components/Radio';
import LabelGroup from '@components/LabelGroup';

type Option = {
  label: string;
  value: string;
  description?: string;
};

interface CustomRadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'onValueChange' | 'onChange'> {
  options: Option[];
  defaultValue?: string;
  value?: string;
  name: string;
  type?: 'dot' | 'check';
  error?: boolean;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, CustomRadioGroupProps>(
  (
    {
      className,
      options,
      defaultValue,
      name,
      value,
      type = 'dot',
      error = false,
      labelClassName,
      descriptionClassName,
      disabled = false,
      orientation = 'vertical',
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        <RadioGroupPrimitive.Root
          ref={ref}
          className={clsx(orientation === 'horizontal' ? 'flex flex-row gap-6' : 'flex flex-col gap-6', className)}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          name={name}
          onValueChange={onChange}
          {...props}
        >
          {options.map(({ label, value, description }) => (
            <LabelGroup
              key={value}
              labelFor={value}
              component={<RadioGroupItem value={value} disabled={disabled} type={type} error={error} />}
              label={label}
              description={description}
              disabled={disabled}
              labelClassName={labelClassName}
              descriptionClassName={descriptionClassName}
            />
          ))}
        </RadioGroupPrimitive.Root>
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
