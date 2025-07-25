import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '../Button';
import { Loader } from '../Loader';
import Badge from '../Badges';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

const rtButtonVariants = cva(
  'h-auto dark:disabled:hover:bg-transparent dark:disabled:text-zinc-400 dark:disabled:hover:text-zinc-400 font-medium [&_.button-content-style]:flex [&_.button-content-style]:flex-col [&_.button-content-style]:items-center w-auto [&_.button-label-style]:!whitespace-normal [&_.button-label-style]:break-normal [&_.button-label-style]:text-center [&_.button-label-style]:leading-tight',
  {
    variants: {
      type: {
        dynamic:
          'hover:scale-110 disabled:hover:scale-none transition-transform duration-200 p-0 ease-in-out dark:hover:bg-transparent dark:active:bg-transparent active:bg-transparent min-h-[36px] text-base',
        static:
          'p-2 focus-visible:border focus-visible:border-1 focus-visible:border-zinc-300 dark:focus-visible:border-zinc-600',
      },
      size: {
        sm: 'min-h-14.5 [&_.button-label-style]:text-xs',
        md: 'min-h-15',
        lg: 'min-h-17',
      },
      hasIcon: {
        true: '',
        false: 'min-h-9 min-w-12.25',
      },
      isSelected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        type: 'dynamic',
        hasIcon: false,
        size: ['sm', 'md', 'lg'],
        class: 'min-h-9 min-w-12.25',
      },
      {
        type: 'static',
        size: 'sm',
        isSelected: false,
        class:
          'active:bg-zinc-100 dark:active:bg-zinc-700 text-zinc-900 dark:active:text-zinc-100 dark:hover:active:text-zinc-100 dark:hover:active:bg-zinc-600',
      },
      {
        type: 'static',
        size: 'sm',
        isSelected: true,
        class:
          'bg-zinc-100 hover:bg-zinc-100 !text-zinc-900 dark:bg-zinc-700 disabled:bg-zinc-100 disabled:hover:bg-zinc-700 disabled:text-black disabled:hover:!bg-white text-zinc-100 dark:!text-zinc-100 dark:hover:bg-zinc-600 ',
      },
      {
        type: 'static',
        size: ['lg', 'md'],
        isSelected: true,
        class:
          'bg-white dark:text-zinc-700 bg-blue-200 dark:disabled:hover:bg-white dark:bg-white hover:bg-blue-300 disabled:hover:bg-blue-200 disabled:hover:text-blue-900 hover:text-blue-950 text-blue-900 dark:hover:text-zinc-900 dark:hover:bg-white dark:active:bg-white active:bg-blue-200 active:hover:bg-blue-300 active:hover:text-blue-950 active:text-blue-900 dark:active:text-zinc-700 dark:active:hover:text-zinc-900',
      },
      {
        type: 'static',
        size: ['lg', 'md'],
        isSelected: false,
        class:
          'dark:active:bg-white active:bg-blue-200 active:hover:bg-blue-300   active:hover:text-blue-950 active:text-blue-900 dark:active:text-zinc-700 dark:active:hover:text-zinc-900',
      },
    ],
    defaultVariants: {
      type: 'dynamic',
      size: 'md',
      hasIcon: false,
    },
  }
);

type NativeButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Button>, 'type'>;

interface RTButtonProps extends NativeButtonProps, VariantProps<typeof rtButtonVariants> {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'dynamic' | 'static';
  error?: boolean;
  isSelected?: boolean;
  className?: string;
}

const RTButton: React.FC<RTButtonProps> = ({
  label,
  icon,
  onClick,
  disabled,
  loading,
  size = 'md',
  type = 'dynamic',
  error = false,
  isSelected = false,
  className,
  ...rest
}) => {
  const loaderSize = size === 'sm' || size === 'md' ? 'sm' : 'md';
  const effectiveIcon = type === 'static' ? loading ? <Loader size={loaderSize} /> : icon : undefined;
  const effectiveSize = type === 'static' ? size : undefined;
  const hasIcon = !!effectiveIcon;

  const buttonClassName = twMerge(
    rtButtonVariants({
      type,
      size: effectiveSize,
      isSelected,
      hasIcon: type === 'static' ? hasIcon : false,
      ...(type === 'static' ? { isSelected } : {}),
    }),
    'h-auto',
    className
  );

  return error ? (
    <Badge
      id="button"
      content={<FontAwesomeIcon icon={faExclamation} className="text-[10px] text-white" />}
      color="red"
    >
      <Button
        type="button"
        color="gray"
        label={label}
        icon={effectiveIcon}
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      />
    </Badge>
  ) : (
    <Button
      type="button"
      color="gray"
      label={label}
      icon={effectiveIcon}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    />
  );
};

export default RTButton;
