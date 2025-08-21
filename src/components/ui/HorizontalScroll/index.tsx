import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  title?: string;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className,
  showControls = true,
  title,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [children]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className={cn('mb-2', className)}>
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {showControls && (
            <div className="flex items-center space-x-2 ml-auto">
              <Button onClick={scrollLeft} disabled={!canScrollLeft}>
                <i className="fas fa-chevron-left" />
              </Button>
              <Button onClick={scrollRight} disabled={!canScrollRight}>
                <i className="fas fa-chevron-right" />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {showControls && !title && (
          <div className="absolute right-0 top-0 flex items-center space-x-2 z-10 bg-transparent">
            <Button onClick={scrollLeft} disabled={!canScrollLeft}>
              <i className="fas fa-chevron-left" />
            </Button>
            <Button onClick={scrollRight} disabled={!canScrollRight}>
              <i className="fas fa-chevron-right" />
            </Button>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
