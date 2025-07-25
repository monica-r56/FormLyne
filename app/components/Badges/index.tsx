import React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import messages from './message';
import { createMsgGetter } from '@utils/createMsgGetter';

const msg = createMsgGetter(messages);

type BadgeColor = 'red' | 'blue' | 'green' | 'light-red' | 'yellow' | 'orange' | 'purple' | 'pink' | 'gray' | 'black';
type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type OverlayShape = 'rectangular' | 'circular';

export interface BadgeProps {
  id: string;
  color?: BadgeColor;
  content?: number | string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  position?: Position;
  overlay?: OverlayShape;
}

const colors: Record<BadgeColor, { bg: string; text: string }> = {
  red: { bg: 'bg-red-600', text: 'text-white' },
  blue: { bg: 'bg-blue-700', text: 'text-white' },
  green: { bg: 'bg-green-100 dark:bg-green-800', text: 'text-green-700 dark:text-green-200' },
  'light-red': { bg: 'bg-red-100 dark:bg-red-800', text: 'text-red-700 dark:text-red-300' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-500', text: 'text-yellow-900 dark:text-yellow-900' },
  orange: { bg: 'bg-orange-100 dark:bg-orange-800', text: 'text-orange-700 dark:text-orange-200' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-800', text: 'text-purple-700 dark:text-purple-200' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-800', text: 'text-pink-700 dark:text-pink-200' },
  gray: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-200' },
  black: { bg: 'bg-black', text: 'text-white' }, 
};

const badgeStyles = {
  icon: 'w-[18px] h-[18px] p-1.5 rounded-[36.54px] gap-1.5',
  text: 'px-1 py-0.5 rounded-lg gap-2.5 h-[18px]',
  dot: 'w-2 h-2  rounded-full',
};

const determineType = (content?: number | string | React.ReactNode): keyof typeof badgeStyles => {
  if (typeof content === 'number' || typeof content === 'string') return 'text';
  if (React.isValidElement(content)) return 'icon';
  return 'dot';
};

const getPositionClass = (overlay: OverlayShape, position: Position) => {
  const base = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }[position];

  const translate =
    overlay === 'circular'
      ? {
          'top-right': 'translate-x-1/4 -translate-y-1/4',
          'top-left': '-translate-x-1/4 -translate-y-1/4',
          'bottom-right': 'translate-x-1/4 translate-y-1/4',
          'bottom-left': '-translate-x-1/4 translate-y-1/4',
        }[position]
      : {
          'top-right': '-translate-y-1/2 translate-x-1/2',
          'top-left': '-translate-y-1/2 -translate-x-1/2',
          'bottom-right': 'translate-y-1/2 translate-x-1/2',
          'bottom-left': 'translate-y-1/2 -translate-x-1/2',
        }[position];

  return `${base} ${translate}`;
};

const Badge: React.FC<BadgeProps> = ({
  id,
  color = 'light-red',
  content,
  children,
  position = 'top-right',
  className,
  overlay = 'rectangular',
}) => {
  if (!children) {
    throw new Error('The `Badge` component requires a children prop.');
  }

  const type = determineType(content);
  const offsetClass = getPositionClass(overlay, position);

  const badgeElement = (
    <div
      id={id}
      role="status"
      className={clsx(
        'badge-inner-style',
        'inline-flex cursor-pointer items-center justify-center',
        badgeStyles[type],
        type === 'dot' && overlay === 'rectangular' ? 'mr-3' : 'mr-1',
        colors[color].bg,
        type !== 'dot' && colors[color].text
      )}
      aria-label={msg('badgeariaLabel')}
    >
      {type === 'icon' && <div className="flex h-2.5 w-2.5 items-center justify-center">{content}</div>}
      {type === 'text' && content && (
        <span className="font-roboto text-center text-xs leading-none font-normal">
          {typeof content === 'number' && content > 99 ? (
            <FormattedMessage {...messages.badgeContent99Plus} />
          ) : (
            content
          )}
        </span>
      )}
      {type === 'dot' && <div className="relative h-2 w-2" />}
    </div>
  );

  return (
    <div className={clsx('relative inline-block', className)}>
      {children}
      <span className={clsx('absolute', offsetClass)}>{badgeElement}</span>
    </div>
  );
};

export default Badge;
