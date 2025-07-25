import React from 'react';
import { Root as SliderRoot, Thumb as SliderThumb } from '@radix-ui/react-slider';
import clsx from 'clsx';
import messages from './messages';
import intl from '@utils/intl';

interface SliderContentProps {
  sliderValue: number[];
  max: number;
  safeBufferedEnd: number;
  onValueChange: (val: number[]) => void;
  onValueCommit: (val: number[]) => void;
  timelineTrackBaseClasses: string;
  customThumbClasses: string;
  min?: number;
  step?: number;
}

const SliderContent: React.FC<SliderContentProps> = ({
  sliderValue,
  max,
  safeBufferedEnd,
  onValueChange,
  onValueCommit,
  timelineTrackBaseClasses,
  customThumbClasses,
  min = 0,
  step = 1,
}) => {
  return (
    <SliderRoot
      className={clsx(
        'slider-root relative flex w-full touch-none items-center rounded-md outline-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-600 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-zinc-600',
        'absolute top-1/2 -translate-y-1/2',
        'z-10'
      )}
      value={sliderValue}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      min={min}
      max={max}
      step={step}
      tabIndex={0}
      data-testid="timeline-slider-root"
    >
      <div
        className={clsx(timelineTrackBaseClasses, 'right-0 bg-zinc-600 dark:bg-zinc-600')}
        data-testid="timeline-background-track"
      />
      {safeBufferedEnd > 0 && (
        <div
          className={clsx(timelineTrackBaseClasses, 'bg-zinc-400 dark:bg-zinc-400')}
          style={{ width: `${(safeBufferedEnd / max) * 100}%` }}
          data-testid="timeline-buffered-track"
        />
      )}
      <div
        className={clsx(timelineTrackBaseClasses, 'bg-blue-600 transition-none dark:bg-blue-600')}
        style={{ width: `${(sliderValue[0] / max) * 100}%` }}
        data-testid="timeline-played-track"
      />
      <SliderThumb className={customThumbClasses} aria-label={intl.formatMessage(messages.thumbLabel)} />
    </SliderRoot>
  );
};

export default SliderContent;
