import React from 'react';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import Avatar from '../Avatars';
import intl from '@utils/intl';
import messages from './message';

const TagsVariants = cva(
  'inline-flex items-center justify-center font-medium whitespace-nowrap align-middle focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      type: {
        primary: '',
        secondary: '',
      },
      shape: {
        rounded: 'rounded-full',
        squared: 'rounded',
      },
      size: {
        sm: 'h-5 text-xs leading-4',
        md: 'h-6 text-sm leading-5',
        lg: 'h-8 text-sm leading-5',
      },
      color: {
        blue: '',
        gray: '',
        green: '',
        red: '',
      },
      selected: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    compoundVariants: [
      // Primary - Blue
      {
        type: 'primary',
        color: 'blue',
        selected: false,
        class:
          'bg-blue-50 text-blue-700 dark:text-blue-300 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 focus-visible:ring-blue-700',
      },
      {
        type: 'primary',
        color: 'blue',
        selected: true,
        class: 'bg-blue-700 dark:bg-blue-300 text-white dark:text-zinc-900 focus-visible:ring-blue-700',
      },
      // Primary - Gray
      {
        type: 'primary',
        color: 'gray',
        selected: false,
        class:
          'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus-visible:ring-zinc-700',
      },
      {
        type: 'primary',
        color: 'gray',
        selected: true,
        class: 'bg-zinc-700 dark:bg-zinc-400 text-white dark:text-zinc-900 focus-visible:ring-zinc-700',
      },
      // Primary - Green
      {
        type: 'primary',
        color: 'green',
        selected: false,
        class:
          'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-800 focus-visible:ring-green-700',
      },
      {
        type: 'primary',
        color: 'green',
        selected: true,
        class: 'bg-green-700 dark:bg-green-500 text-white dark:text-zinc-900 focus-visible:ring-zinc-700',
      },
      //primary red
      {
        type: 'primary',
        color: 'red',
        selected: false,
        class: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
      },
      {
        type: 'primary',
        color: 'red',
        selected: true,
        class: 'bg-red-800 text-white focus-visible:ring-red-600',
      },
      // Secondary - Blue
      {
        type: 'secondary',
        color: 'blue',
        selected: false,
        class:
          'bg-white dark:bg-zinc-900 text-blue-700 dark:text-blue-300 border border-blue-700 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 focus-visible:ring-blue-700',
      },
      {
        type: 'secondary',
        color: 'blue',
        selected: true,
        class:
          'border border-transparent bg-blue-700 dark:bg-blue-300 text-white dark:text-zinc-900 focus-visible:ring-blue-700',
      },
      // Secondary - Gray
      {
        type: 'secondary',
        color: 'gray',
        selected: false,
        class:
          'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 border border-zinc-700 dark:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 focus-visible:ring-zinc-700',
      },
      {
        type: 'secondary',
        color: 'gray',
        selected: true,
        class:
          'border border-transparent bg-zinc-700 dark:bg-zinc-500 text-white dark:text-zinc-900 focus-visible:ring-zinc-700',
      },
      // Secondary - Green
      {
        type: 'secondary',
        color: 'green',
        selected: false,
        class:
          'bg-white dark:bg-zinc-900 text-green-700 dark:text-green-500 border border-green-700 dark:border-green-500 hover:bg-green-50 dark:hover:bg-green-900 focus-visible:ring-green-700',
      },
      {
        type: 'secondary',
        color: 'green',
        selected: true,
        class:
          'border border-transparent bg-green-700 dark:bg-green-500 text-white dark:text-zinc-900 focus-visible:ring-green-700',
      },
      //secondary red
      {
        type: 'secondary',
        color: 'red',
        selected: false,
        class:
          'text-red-600 border dark:hover:bg-red-900 hover:bg-red-50 border-red-600 focus-visible:ring-red-600 hover:text-red-700 dark:hover:text-red-300',
      },
      {
        type: 'secondary',
        color: 'red',
        selected: true,
        class: 'bg-red-800 text-white focus-visible:ring-red-600',
      },
    ],
    defaultVariants: {
      type: 'primary',
      color: 'blue',
      size: 'md',
      shape: 'rounded',
      selected: false,
      disabled: false,
    },
  }
);

const paddingMap: Record<string, string> = {
  'avatar-rounded-dismissable-sm': 'pl-0.5 pr-1 py-0.5 gap-1',
  'avatar-rounded-dismissable-md': 'px-1 py-0.5 gap-1.5',
  'avatar-rounded-dismissable-lg': 'px-2 py-1.5 gap-1.5',
  'avatar-squared-dismissable-sm': 'pl-1.5 pr-1 py-0.5 gap-1',
  'avatar-squared-dismissable-md': 'pl-2 pr-1 py-0.5 gap-1.5',
  'avatar-squared-dismissable-lg': 'pl-2 pr-1 py-1.5 gap-1.5',
  'avatar-rounded-sm': 'pl-0.5 pr-2 py-0.5 gap-1',
  'avatar-rounded-md': 'pl-1 pr-2 py-0.5 gap-1.5',
  'avatar-rounded-lg': 'pl-2 pr-3 py-1.5 gap-1.5',
  'avatar-squared-sm': 'px-1.5 py-0.5 gap-1',
  'avatar-squared-md': 'px-2 py-0.5 gap-1.5',
  'avatar-squared-lg': 'px-2 py-1.5 gap-1.5',
  'icon-rounded-sm': 'pl-1 pr-2 py-0.5 gap-0.5',
  'icon-rounded-md': 'pl-2 pr-3 py-0.5 gap-1',
  'icon-rounded-lg': 'pl-2 pr-3 py-1.5 gap-1',
  'icon-squared-sm': 'pl-1 pr-1.5 py-0.5 gap-0.5',
  'icon-squared-md': 'pl-1 pr-1.5 py-0.5 gap-0.5',
  'icon-squared-lg': 'pl-1 pr-2 py-1.5 gap-1',
  'dismissable-rounded-sm': 'pl-2 pr-1 py-0.5',
  'dismissable-rounded-md': 'pl-3 pr-2 py-0.5',
  'dismissable-rounded-lg': 'pl-3 pr-2 py-1.5',
  'dismissable-squared-sm': 'pl-1.5 pr-1 py-0.5',
  'dismissable-squared-md': 'pl-1.5 pr-1 py-0.5',
  'dismissable-squared-lg': 'pl-2 pr-1 py-1.5',
  'default-sm': 'px-2 py-0.5 gap-2',
  'default-md': 'px-3 py-0.5 gap-2',
  'default-lg': 'px-3 py-1.5 gap-2',
  'default-squared-sm': 'px-1.5 py-0.5 gap-2',
  'default-squared-md': 'px-1.5 py-0.5 gap-2',
  'default-squared-lg': 'px-2 py-1.5 gap-2',
};

const avatarSizeMap: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-5 h-5',
};

const getPadding = (size: string, isAvatar: boolean, hasIcon: boolean, dismissable?: boolean, shape?: string) => {
  let key = 'default';

  if (isAvatar) {
    key = `avatar-${shape}${dismissable ? '-dismissable' : ''}`;
  } else if (hasIcon) {
    key = `icon-${shape}`;
  } else if (dismissable) {
    key = `dismissable-${shape}`;
  } else if (shape === 'squared') {
    key = `default-squared`;
  }

  return paddingMap[`${key}-${size}`] || paddingMap[`default-${size}`];
};

const getAvatarSize = (size: string) => avatarSizeMap[size] || 'w-4 h-4';

export interface TagsProps extends VariantProps<typeof TagsVariants> {
  label: string;
  icon?: React.ReactNode;
  dismissable?: boolean;
  className?: string;
  onDismiss?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}

const Tags: React.FC<TagsProps> = ({
  label,
  icon,
  dismissable,
  className,
  onDismiss,
  onClick,
  size = 'md',
  disabled = false,
  selected = false,
  ...variantProps
}) => {
  const isAvatar = React.isValidElement(icon) && icon.type === Avatar;

  const hasIcon = React.isValidElement(icon);

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? (dismissable ? onDismiss : onClick) : undefined}
      className={clsx(
        className,
        TagsVariants({ ...variantProps, selected, disabled, size }),
        getPadding(size || 'md', isAvatar, hasIcon, dismissable, variantProps.shape || 'rounded'),
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      aria-label={label}
    >
      {icon && (
        <span className={clsx('flex items-center justify-center', isAvatar ? getAvatarSize(size || 'md') : 'h-4 w-4')}>
          {icon}
        </span>
      )}

      <div className={clsx('flex items-center text-center', size === 'lg' ? 'gap-1' : 'gap-0.5')}>
        <span className="truncate">{label}</span>

        {dismissable && (
          <span
            aria-label={intl.formatMessage(messages.buttonText)}
            className={clsx(
              'inline-flex items-center justify-center border-none bg-transparent p-1 outline-none hover:bg-transparent focus:outline-none active:bg-transparent',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
          >
            <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
          </span>
        )}
      </div>
    </button>
  );
};

export default Tags;
