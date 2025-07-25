import { useEffect, useState, useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { Toggle } from '@components/Toggle';
import { ProgressIndicator } from '@components/ProgressIndicator';

import RecordIcon from './assets/record.svg';
import message from './message';

type TimerType = 'primary' | 'secondary' | 'hideable';
type TimerSize = 'sm' | 'lg';
type TimerFormat = 'mm:ss' | 'hh:mm:ss';

export interface TimerHandle {
  getTime: () => number;
  reset: () => void;
  setTime: (value: number) => void;
}

interface TimerProps {
  type?: TimerType;
  size?: TimerSize;
  format?: TimerFormat;
  live?: boolean;
  progress?: boolean;
  maxtime?: number;
  isRunning?: boolean;
  countdown?: boolean;
  onComplete?: () => void;
  progressColor?: 'blue' | 'green' | 'red' | 'yellow';
  progressSize?: 'sm' | 'md';
  toggleSize?: 'sm' | 'md';
  isHidden?: boolean;
  onToggleHiddenChange?: (val: boolean) => void;
  onTimeChange?: (time: number) => void;
}

const formatTime = (seconds: number, format: TimerFormat) => {
  try {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (format === 'hh:mm:ss') {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return '00:00';
  }
};

const timerVariants = cva('font-normal tracking-[0.5px]', {
  variants: {
    type: {
      primary: 'text-zinc-900 dark:text-zinc-100',
      secondary: '',
      hideable: 'text-black',
    },
    size: {
      sm: 'text-base h-[27px] p-1',
      lg: 'text-2xl h-[36px] p-1',
    },
  },
  defaultVariants: {
    type: 'primary',
    size: 'sm',
  },
});

const Timer = forwardRef<TimerHandle, TimerProps>(
  (
    {
      type = 'primary',
      size = 'sm',
      format: initialFormat = 'mm:ss',
      live = false,
      progress = false,
      maxtime = 120,
      isRunning = false,
      countdown = false,
      onComplete,
      progressColor = 'blue',
      progressSize,
      toggleSize,
      isHidden = false,
      onToggleHiddenChange,
      onTimeChange,
    },
    ref
  ) => {
    const format = type === 'hideable' ? 'hh:mm:ss' : initialFormat;
    const [elapsed, setElapsed] = useState(0);
    const [hidden, isTimerHidden] = useState(isHidden);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        getTime: () => elapsed,
        reset: () => {
          setElapsed(countdown ? maxtime : 0);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          if (onTimeChange) onTimeChange(countdown ? maxtime : 0);
        },
        setTime: (value: number) => {
          setElapsed(value);
          if (onTimeChange) onTimeChange(value);
        },
      }),
      [elapsed, onTimeChange, countdown, maxtime]
    );

    useEffect(() => {
      if (isRunning && !intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setElapsed((prev) => {
            let next;

            if (countdown) {
              // Countdown mode: decrement time
              next = Math.max(0, prev - 1);
              if (onTimeChange) onTimeChange(next);

              // Complete when countdown reaches 0
              if (next <= 0) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                onComplete?.();
                return 0;
              }
            } else {
              next = prev + 1;
              if (onTimeChange) onTimeChange(next);

              if (!live && next >= maxtime) {
                clearInterval(intervalRef.current!);
                intervalRef.current = null;
                onComplete?.();
                return maxtime;
              }
            }

            return next;
          });
        }, 1000);
      } else if (!isRunning && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [isRunning, live, maxtime, countdown, onComplete, onTimeChange]);

    const timerDisplay = useMemo(() => formatTime(elapsed, format), [elapsed, format]);
    const maxDisplay = useMemo(() => formatTime(maxtime, format), [maxtime, format]);

    const progressValue = useMemo(() => {
      if (countdown) {
        return ((maxtime - elapsed) / maxtime) * 100;
      } else {
        return (elapsed / maxtime) * 100;
      }
    }, [elapsed, maxtime, countdown]);

    if (type === 'hideable') {
      return (
        <span className="inline-flex h-[29px] items-center justify-center gap-2 font-normal sm:h-[40px]">
          <Toggle
            onChange={() =>
              isTimerHidden((prev) => {
                const next = !prev;
                onToggleHiddenChange?.(next);
                return next;
              })
            }
            size={toggleSize}
          />
          <span className="min-w-[64px] text-xs text-zinc-900 sm:min-w-[85px] sm:text-base dark:text-zinc-100">
            {hidden ? <FormattedMessage {...message.hide} /> : <FormattedMessage {...message.show} />}
          </span>
          <span className="max-w-[105px] min-w-[74px]">
            <span>
              <ProgressIndicator value={progressValue} color={progressColor} size={progressSize} />
            </span>
            <div
              className={clsx(
                'overflow-hidden transition-all duration-400 ease-in-out',
                hidden ? 'max-h-[36px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <span className="flex max-h-[36px] min-h-[27px] max-w-[105px] min-w-[74px] items-center justify-center p-1 text-base sm:text-2xl">
                {timerDisplay}
              </span>
            </div>
          </span>
        </span>
      );
    }

    return (
      <div className={clsx(timerVariants({ type, size }), 'inline-flex items-center gap-3')}>
        {live && <img src={RecordIcon} alt={message.recordIcon.defaultMessage} />}
        {progress && !live ? (
          <span>
            <span>
              {timerDisplay}
              <span className="mx-1">
                <FormattedMessage id="molecules.Timer.separator" defaultMessage="/" />
              </span>
            </span>
            <span className={clsx(type === 'secondary' && 'text-zinc-500 dark:text-zinc-400')}>{maxDisplay}</span>
          </span>
        ) : (
          <span>{timerDisplay}</span>
        )}
      </div>
    );
  }
);

Timer.displayName = 'Timer';
export default Timer;
