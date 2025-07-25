import React from 'react';
import classNames from 'classnames';
import Avatar, { AvatarProps } from '@components/Avatars';
import Badge, { BadgeProps } from '@components/Badges';

export interface AvatarWithBadge extends AvatarProps {
  badge?: BadgeProps;
}

type DisplayType = 'single' | 'spaced' | 'stacked';

interface AvatarGroupProps {
  avatars: AvatarWithBadge[];
  maxCount?: number;
  size?: AvatarProps['size'];
  color?: AvatarProps['color'];
  type?: DisplayType;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  maxCount = avatars.length,
  size,
  color = 'blue',
  type = 'stacked',
}) => {
  const visibleAvatars = avatars.slice(0, maxCount);
  const hiddenCount = avatars.length - maxCount;
  const displayType: DisplayType = avatars.some((a) => a.badge) ? 'spaced' : type;

  const getStackedMargin = (currentSize?: AvatarProps['size']) => {
    const s = currentSize || size;
    switch (s) {
      case 'xs':
        return '-ml-1';
      case 'sm':
        return '-ml-2';
      case 'md':
        return '-ml-3';
      default:
        return '-ml-2';
    }
  };

  const getAvatarMarginClass = (index: number, displayType: DisplayType, overlapClass: string): string => {
    if (index === 0) return '';
    if (displayType === 'stacked') {
      return overlapClass;
    } else if (displayType === 'spaced') {
      return 'ml-[2px]';
    } else if (displayType === 'single') {
      return index === 1 || index === 2 ? 'ml-[4px]' : overlapClass;
    }
    return '';
  };

  const renderHiddenAvatar = (
    hiddenCount: number,
    hiddenIndex: number,
    displayType: DisplayType,
    size?: AvatarProps['size'],
    color?: AvatarProps['color']
  ) => {
    const overlapClass = getStackedMargin(size);
    const marginClass = getAvatarMarginClass(hiddenIndex, displayType, overlapClass);

    return (
      <div className={classNames(marginClass)}>
        <Avatar size={size} color={color} label={`+${hiddenCount}`} className="relative" />
      </div>
    );
  };

  return (
    <div className="inline-flex items-center">
      {visibleAvatars.map((avatar, index) => {
        const avatarSize = avatar.size || size;
        const overlapClass = getStackedMargin(avatarSize);
        const avatarElement = <Avatar {...avatar} size={avatarSize} color={avatar.color || color} />;
        const wrappedAvatar = avatar.badge ? (
          <Badge
            overlay="circular"
            position="top-right"
            {...avatar.badge}
            className="align-middle [&_.badge-inner-style]:translate-x-1/3"
          >
            {avatarElement}
          </Badge>
        ) : (
          avatarElement
        );
        const marginClass = getAvatarMarginClass(index, displayType, overlapClass);

        return (
          <div key={index} className={classNames(marginClass)}>
            {wrappedAvatar}
          </div>
        );
      })}
      {hiddenCount > 0 && renderHiddenAvatar(hiddenCount, visibleAvatars.length, displayType, size, color)}
    </div>
  );
};
export default AvatarGroup;
