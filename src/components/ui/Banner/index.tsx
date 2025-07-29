import { ReactNode } from 'react';

type TitleOrDescriptionRequired = { title: string; description?: string } | { title?: string; description: string };

export interface BannerBaseProps {
  icon?: ReactNode;
  className?: string;
  iconPosition?: 'left' | 'right';
}

export type BannerProps = TitleOrDescriptionRequired & BannerBaseProps;

export const Banner = ({
  title,
  description,
  icon,
  className = '',
  iconPosition = 'left',
}: BannerProps) => {

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
      className={`inline-flex w-full max-w-[584px] items-start justify-start gap-3 rounded-[8px] px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:items-center ${className}`}
    >
      {icon && iconPosition === 'left' && <span className="gap-2.5 sm:px-1 sm:py-2">{icon}</span>}
      <div className="inline-flex flex-1 flex-col items-start justify-center gap-1">
        {title && (
          <span className="text-center text-sm leading-tight font-medium sm:text-base sm:leading-normal">{title}</span>
        )}
        {description && (
          <span className="text-sm leading-tight font-normal sm:text-base sm:leading-normal">{description}</span>
        )}
      </div>
      {icon && iconPosition === 'right' && <span className="gap-2.5 sm:px-1 sm:py-2">{icon}</span>}
    </div>
  );
};
