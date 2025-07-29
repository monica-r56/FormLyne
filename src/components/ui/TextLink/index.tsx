import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';

type Type = 'primary' | 'secondary' | 'success' | 'warning' | 'critical' | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

export interface TextLinkProps {
  type: Type;
  size?: Size;
  icon?: ReactNode;
  visited?: boolean;
  leading?: boolean;
  disabled?: boolean;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

const variantMap: Record<Type, { default: string; visited: string; disabled: string }> = {
  primary: {
    default: 'text-blue-700 dark:text-blue-300',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-blue-700 dark:text-blue-300',
  },
  secondary: {
    default: 'text-zinc-800 dark:text-zinc-300',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-zinc-800 dark:text-zinc-300',
  },
  success: {
    default: 'text-green-700 dark:text-green-500',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-green-700 dark:text-green-500',
  },
  warning: {
    default: 'text-orange-700 dark:text-orange-500',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-orange-700 dark:text-orange-500',
  },
  critical: {
    default: 'text-red-700 dark:text-red-400',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-red-700 dark:text-red-400',
  },
  tertiary: {
    default: 'text-zinc-600 dark:text-zinc-400',
    visited: 'visited:text-purple-700 dark:visited:text-purple-400',
    disabled: 'text-zinc-600 dark:text-zinc-400',
  },
};

const sizeMap: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export default function TextLink({
  type,
  size = 'sm',
  icon,
  leading = false,
  visited = false,
  disabled = false,
  text,
  onClick,
  className,
}: TextLinkProps) {
  const {
    default: defaultColor,
    visited: visitedColor,
    disabled: disabledColor,
  } = useMemo(() => variantMap[type], [type]);
  const sizeClasses = useMemo(() => sizeMap[size], [size]);

  const baseClasses = 'inline-flex items-center font-medium relative cursor-pointer';
  const focusClasses =
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0';
  const disabledClasses = `opacity-50 pointer-events-none cursor-not-allowed ${disabledColor}`;
  const linkStyles = 'underline hover:no-underline';
  const linkColorClass = disabled
    ? disabledColor
    : visited
      ? visitedColor.replace('visited:', '') // remove 'visited:' prefix because it's a class modifier, we want just color classes
      : defaultColor;

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses,
    focusClasses,
    disabled ? `${disabledClasses} no-underline` : `${linkColorClass} ${linkStyles}`,
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  const renderIcon = (position: 'leading' | 'trailing') => {
    const isLeading = position === 'leading';
    if ((isLeading && !leading) || (!isLeading && leading)) return null;

    return (
      <span className="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center">
        {typeof icon === 'string' ? (
          <img src={icon} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="flex max-h-full max-w-full items-center justify-center">{icon}</span>
        )}
      </span>
    );
  };

  return (
    <span
      role="link"
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={disabled ? -1 : 0}
      className={combinedClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="flex flex-wrap items-center gap-1 outline-none md:gap-1">
        {icon && renderIcon('leading')}
        <span className="break-words whitespace-normal md:whitespace-nowrap">{text}</span>
        {icon && renderIcon('trailing')}
      </span>
    </span>
  );
}
