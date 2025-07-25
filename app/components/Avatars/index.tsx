import React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';

type ImageLoadingStatus = Parameters<NonNullable<RadixAvatar.AvatarImageProps['onLoadingStatusChange']>>[0];

export interface AvatarProps {
  size?: '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'blue' | 'purple';
  src?: string;
  label?: string;
  delayMs?: number;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
  className?: string;
}

const SIZE_STYLES = {
  '4xs': { size: 'w-4 h-4', text: 'text-[8px]/[12px]', iconSize: '10px', textPadding: 'py-0.5' },
  '3xs': { size: 'w-[18px] h-[18px]', text: 'text-[10px]/[15px]', iconSize: '12px', textPadding: ' pb-[1px] pt-0.5' },
  '2xs': { size: 'w-5 h-5', text: 'text-[10px]/[15px]', iconSize: '12px', textPadding: 'pt-[7px] pb-1.5' },
  xs: { size: 'w-6 h-6', text: 'text-xs leading-[18px]', iconSize: '16px', textPadding: 'pt-1 pb-0.5' },
  sm: { size: 'w-8 h-8', text: 'text-sm', iconSize: '20px', textPadding: 'py-1.5' },
  md: { size: 'w-10 h-10', text: 'text-base', iconSize: '24px', textPadding: 'py-2' },
  lg: { size: 'w-12 h-12', text: 'text-lg', iconSize: '28px', textPadding: 'py-2.5' },
  xl: { size: 'w-14 h-14', text: 'text-xl leading-[30px]', iconSize: '32px', textPadding: 'py-[13px]' },
  '2xl': { size: 'w-16 h-16', text: 'text-2xl', iconSize: '32px', textPadding: 'p-4' },
  '3xl': { size: 'w-24 h-24', text: 'text-3xl leading-[45px]', iconSize: '48px', textPadding: 'pt-[26px] pb-[25px]' },
  '4xl': { size: 'w-36 h-36', text: 'text-[52px] leading-[78px]', iconSize: '72px', textPadding: 'py-[33px]' },
};

const COLOR_STYLES = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  color = 'blue',
  src,
  label,
  delayMs,
  onLoadingStatusChange,
  className,
}) => {
  const handleLoadingStatusChange = (status: ImageLoadingStatus) => {
    onLoadingStatusChange?.(status);
  };

  const getInitials = (fullLabel: string) => {
    try {
      if (!fullLabel) return '';

      const trimmedLabel = fullLabel.trim();
      if (!trimmedLabel) return '';

      const plusDigitsMatch = trimmedLabel.match(/^\+(\d{1,2})$/);
      if (plusDigitsMatch) return `+${plusDigitsMatch[1]}`;

      const cleanedLabel = trimmedLabel.replace(/[^a-zA-Z\s]/g, '').trim();
      if (!cleanedLabel) return '';

      return cleanedLabel
        .split(/\s+/)
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    } catch {
      return '';
    }
  };

  const renderFallbackContent = () => {
    const initials = label ? getInitials(label) : '';

    if (initials) {
      return <div className={`${SIZE_STYLES[size].text} ${SIZE_STYLES[size].textPadding}`}>{initials}</div>;
    }

    return (
      <div className="flex" data-testid="Placeholder-Wrapper">
        <FontAwesomeIcon
          icon={faUser}
          style={{
            height: SIZE_STYLES[size].iconSize,
            width: SIZE_STYLES[size].iconSize,
          }}
          className={color === 'purple' ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300'}
        />
      </div>
    );
  };

  return (
    <RadixAvatar.Root
      className={classNames(
        'flex items-center justify-center rounded-full font-medium',
        SIZE_STYLES[size].size,
        COLOR_STYLES[color],
        className
      )}
    >
      {src && (
        <RadixAvatar.Image
          src={src}
          alt={label || 'Avatar'}
          className="h-full w-full rounded-full object-cover"
          onLoadingStatusChange={handleLoadingStatusChange}
        />
      )}
      <RadixAvatar.Fallback delayMs={delayMs}>{renderFallbackContent()}</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = 'Avatar';
export default Avatar;
