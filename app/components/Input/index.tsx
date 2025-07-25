import * as React from 'react';
import { cva } from 'class-variance-authority';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
import messages from './message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createMsgGetter } from '@utils/createMsgGetter';

const msg = createMsgGetter(messages);

interface BaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  placeholder?: string;
  error?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  leftIcon?: React.ReactNode; // left icon
  rightIcon?: React.ReactNode; // right icon
  value?: string;
  children?: React.ReactNode;
  className?: string;
}

interface TextProps extends BaseProps {
  type?: 'text';
}

interface PasswordProps extends BaseProps {
  type: 'password';
  size?: never;
  showClearButton?: never;
  leftIcon?: never;
  rightIcon?: never;
}

export type InputProps = TextProps | PasswordProps;

export const inputVariants = cva(
  [
    'flex items-center bg-white dark:bg-zinc-800 rounded',
    'leading-20px placeholder-zinc-500 dark:placeholder-zinc-400',
    'font-normal dark:text-zinc-100',
    'focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:outline-none',
  ],
  {
    variants: {
      type: {
        text: 'h-[36px] text-sm',
        password: 'h-[36px] text-sm',
      },
      error: {
        true: ['border border-red-600'],
        false: ['border border-zinc-300 dark:border-zinc-600 '],
      },
      disabled: {
        true: ['opacity-50 cursor-not-allowed hover:bg-transparent'],
        false: [],
      },
    },
    defaultVariants: {
      type: 'text',
      error: false,
      disabled: false,
    },
    compoundVariants: [
      {
        error: false,
        disabled: false,
        className: [
          'hover:border-zinc-400 dark:hover:border-zinc-500',
          'hover:focus-within:border-blue-700',
          'focus-within:border-blue-700',
        ],
      },
    ],
  }
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      error = false,
      type = 'text',
      leftIcon,
      rightIcon,
      showClearButton = false,
      onClear,
      onChange,
      value,
      defaultValue = '',
      disabled = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;

    const currentValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const togglePassword = () => setPasswordVisible((prev) => !prev);

    const showClear = showClearButton && !!currentValue;

    return (
      <div
        tabIndex={0}
        role="textbox"
        aria-label={msg('ariaLabel')}
        className={clsx(inputVariants({ type, error, disabled }), className)}
      >
        {leftIcon && (
          <div className="py-2 pl-2 text-zinc-400 dark:text-zinc-500">
            <span className="flex h-5 w-5 items-center justify-center">{leftIcon}</span>
          </div>
        )}
        {children}
        <input
          {...rest}
          ref={ref}
          placeholder={placeholder}
          className={clsx(
            `input-style h-full w-full flex-1 bg-transparent px-2 py-2 text-sm font-normal text-zinc-900 outline-none placeholder:opacity-100 focus:placeholder:opacity-0 dark:text-zinc-100 [&::-moz-appearance:textfield]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none`,
            disabled && 'cursor-not-allowed'
          )}
          type={type === 'password' && passwordVisible ? 'text' : type}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={error}
        />

        {showClear && (
          <IconButton
            icon={<FontAwesomeIcon icon={faXmark} className="h-5 w-5" />}
            onClick={handleClear}
            type="Tertiary"
            className="text-center text-[20px] text-zinc-900 hover:bg-transparent active:bg-transparent dark:text-zinc-100"
          />
        )}

        {type === 'password' && (
          <IconButton
            icon={
              passwordVisible ? (
                <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
              )
            }
            onClick={togglePassword}
            type="Tertiary"
            className="text-zinc-400 hover:bg-transparent hover:bg-none active:bg-transparent dark:text-zinc-500"
          />
        )}

        {!showClear && rightIcon && (
          <div className="py-2 pr-2 text-zinc-400 dark:text-zinc-500">
            <span className="flex h-5 w-5 items-center justify-center">{rightIcon}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
