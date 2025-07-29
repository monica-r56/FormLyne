import React from 'react';

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
  dashed?: boolean;
  text?: string;
  orientation?: 'left' | 'center' | 'right';
  textClassName?: string;
}
const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  dashed = false,
  text,
  orientation = 'left',
  textClassName = '',
}) => {
  const horizontalDashedClass =
    'h-px rounded-full bg-[repeating-linear-gradient(to_right,theme(colors.gray.300)_0_3px,transparent_3px_6px)]';
  const verticalDashedClass =
    'self-stretch inline-block w-px h-full min-h-4 bg-[repeating-linear-gradient(to_bottom,theme(colors.gray.300)_0_3px,transparent_3px_6px)] rounded-full';
  const solidHorizontalClass = 'border-b rounded-full border-zinc-200 dark:border-zinc-700';
  const solidVerticalClass = 'self-stretch w-0 border-l border-zinc-200 rounded-full dark:border-zinc-700';

  const hasValidText = typeof text === 'string' ? text.trim() !== '' : !!text;

  if (type === 'vertical') {
    return <div className={dashed ? verticalDashedClass : solidVerticalClass} />;
  }

  if (!hasValidText) {
    return <div className={`w-full ${dashed ? horizontalDashedClass : solidHorizontalClass}`} />;
  }

  const orientationClasses = {
    left: { before: 'w-8', after: 'flex-1' },
    right: { before: 'flex-1', after: 'w-8' },
    center: { before: 'flex-1', after: 'flex-1' },
  };
  const { before: beforeFlexClass, after: afterFlexClass } = orientationClasses[orientation];

  const dividerLineClass = dashed ? horizontalDashedClass : solidHorizontalClass;

  return (
    <div className="flex w-full items-center">
      {/* Left divider */}
      <div className={beforeFlexClass}>
        <div className={`w-full ${dividerLineClass}`} />
      </div>

      {/* Text container */}
      <div className="max-w-[40%] flex-shrink-0 overflow-hidden">
        <span
          className={`block truncate px-3 text-xs leading-[18px] text-zinc-900 dark:text-zinc-100 ${textClassName}`}
        >
          {text}
        </span>
      </div>

      {/* Right divider */}
      <div className={afterFlexClass}>
        <div className={`w-full ${dividerLineClass}`} />
      </div>
    </div>
  );
};

export default Divider;
