import React from 'react';
import { Checkbox } from '@components/Checkbox';
import clsx from 'clsx';
import LabelGroup from '@components/LabelGroup';

type Option = {
  label: string;
  value: string;
  description?: string;
};

interface CheckboxGroupProps {
  options: Option[];
  values?: string[];
  defaultValues?: string[];
  name: string;
  error?: boolean;
  indeterminate?: boolean;
  labelClassName?: string;
  className?: string;
  descriptionClassName?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onChange?: (selected: string[]) => void;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      values,
      defaultValues = [],
      name,
      error = false,
      indeterminate = false,
      labelClassName,
      className,
      descriptionClassName,
      disabled = false,
      orientation = 'vertical',
      onChange,
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValues);

    React.useEffect(() => {
      if (values) {
        setSelectedValues(values);
      }
    }, [values]);

    const handleToggle = (value: string) => {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      setSelectedValues(updatedValues);
      onChange?.(updatedValues);
    };

    return (
      <div
        ref={ref}
        className={clsx(orientation === 'horizontal' ? 'flex flex-row gap-6' : 'flex flex-col gap-6', className)}
      >
        {options.map(({ label, value, description }) => {
          const isChecked = selectedValues.includes(value);

          return (
            <LabelGroup
              aria-label={label}
              key={value}
              labelFor={value}
              component={
                <Checkbox
                  checked={isChecked}
                  name={name}
                  indeterminate={indeterminate}
                  onCheckedChange={() => handleToggle(value)}
                  disabled={disabled}
                  error={error}
                  aria-label={label}
                  role="checkbox"
                />
              }
              label={label}
              description={description}
              labelClassName={labelClassName}
              descriptionClassName={descriptionClassName}
              disabled={disabled}
            />
          );
        })}
      </div>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
