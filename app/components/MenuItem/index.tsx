import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import LabelGroup from '@components/LabelGroup';
import { AvatarProps } from '@components/Avatars';

export type MenuItemProps = {
  id: string;
  type?: 'base' | 'secondary';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  secondaryLabel?: string;
  label?: string;
  description?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  avatar?: ReactNode;
  onClick?: (id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  dataActive?: boolean;
  tabIndex?: number;
  chips?: ReactNode;
  spaced?: boolean;
  className?: string;
};
const NUMERIC_ONLY_REGEX = /^\d+$/;
export const processSecondaryLabel = (secondaryLabel?: string) => {
  if (!secondaryLabel) return '';
  const trimmed = secondaryLabel.trim();
  if (!trimmed || !NUMERIC_ONLY_REGEX.test(trimmed)) return '';
  return trimmed.substring(0, 4);
};
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      id,
      type = 'base',
      leftIcon,
      rightIcon,
      disabled = false,
      selected = false,
      secondaryLabel,
      label,
      description,
      labelClassName,
      descriptionClassName,
      avatar,
      onClick,
      onFocus,
      onBlur,
      dataActive: dataActive,
      tabIndex,
      chips,
      spaced = false,
      className,
    },
    ref
  ) => {
    if (avatar && (!label || !description)) {
      return null;
    }

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isActive = !disabled && selected;
    const showRightIcon = type === 'base' && rightIcon;
    const isHighlighted = (isHovered || isFocused) && !disabled;
    const isMinimal = !spaced && !description;
    const processedSecondaryLabel = processSecondaryLabel(secondaryLabel);
    const hasRightContent = showRightIcon || (type === 'secondary' && processedSecondaryLabel);

    const activeStyles = 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100';
    const inactiveStyles = 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400';
    const textColor = isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-400';
    const iconClasses = classNames(
      textColor,
      avatar || !leftIcon || (!avatar && !description) ? 'self-center' : 'self-start'
    );
    const defaultLabelClassName = classNames(
      'text-zinc-900 dark:text-zinc-100',
      isMinimal && !leftIcon && !hasRightContent ? 'text-sm/4.5' : isMinimal ? 'text-xs/4.5' : 'text-sm',
      avatar ? 'font-semibold' : isActive ? 'font-medium' : 'font-normal'
    );
    const finalLabelClassName = labelClassName || defaultLabelClassName;
    const defaultDescriptionClassName = !avatar ? classNames('font-normal text-xs/4.5', textColor) : undefined;
    const finalDescriptionClassName = descriptionClassName || defaultDescriptionClassName;

    const paddingClasses = spaced ? 'px-3 py-2' : 'px-2 py-1.5';
    const containerClasses = classNames(
      'menu-item flex w-full rounded-[4px] outline-none justify-between',
      paddingClasses,
      { 'cursor-pointer': !disabled, 'pointer-events-none opacity-50': disabled },
      isActive || isHighlighted ? activeStyles : inactiveStyles,
      className
    );
    const adjustedAvatar =
      avatar && React.isValidElement<AvatarProps>(avatar)
        ? React.cloneElement(avatar as React.ReactElement<AvatarProps>, {
            size: 'sm',
          })
        : avatar;

    const shouldLeftIconAddPadding = Boolean(
      (avatar && rightIcon && selected) ||
        (avatar && type === 'secondary') ||
        (!avatar && description && (!rightIcon || type === 'secondary')) ||
        (!avatar && description && rightIcon && selected) ||
        (!rightIcon && description)
    );
    const iconBoxClass = isMinimal ? 'h-3.5 w-3.5' : 'h-4 w-4';
    const iconMarginClass = isMinimal ? 'mr-1.5' : 'mr-2';
    const rightIconMarginClass = isMinimal ? 'ml-1.5' : 'ml-2';

    const shouldRenderChipsOutside =
      chips &&
      !description &&
      ((type !== 'secondary' && !(leftIcon || rightIcon)) || (!spaced && !hasRightContent && leftIcon));

    const handleClick = () => {
      if (!disabled) onClick?.(id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(id);
      }
    };
    const handleFocus = () => {
      if (!disabled) {
        setIsFocused(true);
        onFocus?.();
      }
    };
    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <div
        ref={ref}
        id={id}
        className={containerClasses}
        data-testid={id}
        data-active={dataActive}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="menuitem"
        tabIndex={tabIndex ?? (disabled ? -1 : 0)}
        aria-disabled={disabled}
      >
        {leftIcon && (
          <span
            data-testid="menu-item-left-icon"
            className={classNames(
              'box-content flex flex-shrink-0 items-center justify-center [&>*]:max-h-full [&>*]:max-w-full',
              iconBoxClass,
              iconMarginClass,
              shouldLeftIconAddPadding ? 'pt-[1px]' : 'pt-0',
              iconClasses
            )}
          >
            {leftIcon}
          </span>
        )}

        <div
          className={classNames(
            'flex flex-grow items-center justify-between',
            isMinimal && shouldRenderChipsOutside ? (leftIcon ? 'gap-0' : 'gap-1.5') : 'gap-1'
          )}
        >
          <div className="flex items-center">
            <LabelGroup
              component={adjustedAvatar}
              label={label}
              labelClassName={finalLabelClassName}
              description={description}
              selected={isActive}
              descriptionClassName={finalDescriptionClassName}
              componentPosition="left"
              disabled={disabled}
            />
            {!description && !shouldRenderChipsOutside && <div className="inside ml-1 flex items-center">{chips}</div>}
          </div>

          {!description && shouldRenderChipsOutside && (
            <div
              className={classNames(
                'outside flex items-center',
                !leftIcon && !hasRightContent ? 'ml-0' : spaced ? 'ml-1' : 'ml-1.5'
              )}
            >
              {chips}
            </div>
          )}
        </div>

        {type === 'secondary' && processedSecondaryLabel ? (
          <div
            className={classNames(
              'flex flex-shrink-0 self-center',
              isMinimal ? (!!chips || leftIcon ? 'pl-1.5' : 'pl-1') : 'pl-2',
              spaced ? 'text-base/5' : description ? 'text-sm/5' : 'text-xs/4.5',
              isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'
            )}
          >
            {processedSecondaryLabel}
          </div>
        ) : (
          showRightIcon && (
            <span
              data-testid="menu-item-right-icon"
              className={classNames(
                'box-content flex flex-shrink-0 items-center justify-center [&>*]:max-h-full [&>*]:max-w-full',
                iconBoxClass,
                rightIconMarginClass,
                iconClasses,
                { 'pt-[1px]': !!description }
              )}
            >
              {rightIcon}
            </span>
          )
        )}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';
export default MenuItem;
