import { useEffect, useState, useMemo, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import clsx from 'clsx';
import clamp from 'lodash/clamp';
import SliderTracks from './SliderTracks';

interface TimelineProps {
  value: number;
  max: number;
  bufferedEnd?: number;
  className?: string;
  onSeek?: (value: number) => void;
  min?: number;
  step?: number;
}

export interface TimelineRef {
  lastSeekedValue: number | null;
}

export const Timeline = forwardRef<TimelineRef, TimelineProps>(
  ({ value, max, bufferedEnd = 0, className, onSeek, min = 0, step = 1 }, ref) => {
    const [internalLastSeekedValue, setInternalLastSeekedValue] = useState<number | null>(null);
    const [sliderValue, setSliderValue] = useState<number[]>([value]);
    const [isInteracting, setIsInteracting] = useState(false);

    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      setSliderValue([value]);
    }, [value]);

    useEffect(() => {
      return () => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      };
    }, []);
    const safeBufferedEnd = useMemo(() => clamp(bufferedEnd, value, max), [bufferedEnd, value, max]);
    const handleValueChange = useCallback((newValue: number[]) => {
      setSliderValue(newValue);
      if (window.innerWidth < 768) {
        setIsInteracting(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = setTimeout(() => setIsInteracting(false), 1000);
      }
    }, []);

    const handleValueCommit = useCallback(
      (newValue: number[]) => {
        const committedValue = newValue[0];
        setInternalLastSeekedValue(committedValue);
        onSeek?.(committedValue);
      },
      [onSeek]
    );

    useImperativeHandle(
      ref,
      () => ({
        lastSeekedValue: internalLastSeekedValue,
      }),
      [internalLastSeekedValue]
    );

    const timelineTrackBaseClasses = clsx(
      'absolute left-0 rounded-full transition-all duration-300 ease-in-out',
      'h-0.5 md:h-1',
      'md:group-hover:h-2',
      'top-1/2 -translate-y-1/2'
    );

    const customThumbClasses = clsx(
      'block rounded-full shadow-sm',
      'bg-white dark:bg-white outline-none focus:outline-none ring-0 ring-transparent',
      'border-blue-600 dark:border-blue-600',
      'w-3.5 h-3.5 md:w-4 md:h-4',
      'border-4',
      'cursor-grab active:cursor-grabbing',
      {
        'opacity-0 group-hover:opacity-100': !isInteracting,
        'opacity-100': isInteracting,
      },
      'transition-opacity duration-300 ease-in-out'
    );

    return (
      <div
        className={clsx('group relative flex', 'h-12 md:h-12', 'py-4 md:py-2.5', 'px-4 md:px-5', className)}
        data-testid="timeline-group"
      >
        <SliderTracks
          sliderValue={sliderValue}
          max={max}
          safeBufferedEnd={safeBufferedEnd}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          timelineTrackBaseClasses={timelineTrackBaseClasses}
          customThumbClasses={customThumbClasses}
          min={min}
          step={step}
        />
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';
