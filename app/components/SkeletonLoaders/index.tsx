import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const typeSizeMap = {
  circle: {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-24 w-24',
  },
  square: {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-24 w-24',
  },
  rectangle: {
    xs: 'h-4 w-16',
    sm: 'h-[24px] w-[80px]',
    md: 'h-[32px] w-[96px]',
    lg: 'h-[48px] w-[120px]',
  },
  pill: {
    xs: 'h-[16px] w-[64px] rounded-[8px]',
    sm: 'h-[24px] w-[80px] rounded-[12px]',
    md: 'h-[32px] w-[96px] rounded-[16px]',
    lg: 'h-[48px] w-[120px] rounded-[24px]',
  },
  text: {
    default: 'h-2 w-full',
  },
  heading: {
    xs: 'h-[8px] my-[5px]',
    sm: 'h-[10px] my-[5px]',
    md: 'h-[13px] my-[6px]',
    lg: 'h-[15px] my-[8px]',
    xl: 'h-[18px] my-[10px]',
    '2xl': 'h-[23px] my-[9px]',
  },
} as const;

const skeletonBase = cva('bg-zinc-200 dark:bg-zinc-700 relative overflow-hidden', {
  variants: {
    type: {
      circle: 'rounded-full',
      square: 'rounded-[4px]',
      rectangle: 'rounded-[4px]',
      pill: '',
      text: 'rounded-[2px]',
      heading: 'rounded-[4px] w-full',
      paragraph: 'rounded-[2px]',
    },
  },
  defaultVariants: {
    type: 'text',
  },
});

type Type = keyof typeof typeSizeMap | 'paragraph';
type Size = string;
interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonBase> {
  size?: Size;
  lines?: number;
}

const getSizeClass = (type: Type, size?: Size): string => {
  if (type === 'text') return typeSizeMap.text.default;
  if (type === 'paragraph') return 'h-2';
  const sizeMap = typeSizeMap[type as keyof typeof typeSizeMap] as Record<string, string>;
  return size ? (sizeMap[size] ?? '') : '';
};

const getParagraphLineWidth = (index: number, lines: number): string => {
  if (lines === 2) {
    return index === 0 ? 'w-2/3' : 'w-full';
  }
  if (lines === 3) {
    switch (index) {
      case 0:
        return 'w-2/3';
      case 2:
        return 'w-5/6';
      default:
        return 'w-full';
    }
  }
  if (lines > 3) {
    if (index === 0) return 'w-2/3';
    if (index === lines - 1) return 'w-5/6';
  }
  return 'w-full';
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'text',
  size = 'md',
  lines = 3,
  className,
  ...props
}) => {
  const safeType: Type = (type ?? 'text') as Type;
  const waveClasses = 'absolute inset-0 bg-wave-gradient animate-wave';

  if (safeType === 'paragraph') {
    return (
      <div className="space-y-[12px]" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            aria-hidden="true"
            key={i}
            className={clsx(
              'relative h-2 overflow-hidden rounded-[2px] bg-zinc-200 dark:bg-zinc-700',
              getParagraphLineWidth(i, lines),
              className
            )}
          >
            <div className={waveClasses} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative overflow-hidden bg-zinc-200 dark:bg-zinc-700',
        skeletonBase({ type }),
        getSizeClass(safeType, size),
        className
      )}
      {...props}
    >
      <div className={waveClasses} />
    </div>
  );
};

export default SkeletonLoader;
