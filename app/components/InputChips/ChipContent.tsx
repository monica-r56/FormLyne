import * as React from 'react';
import Chips, { type ChipProps } from '@components/Chips';
import Tags, { type TagsProps } from '@components/Tags';

type ChipOrTag =
  | string
  | {
      label: string;
      chipProps?: Partial<ChipProps>;
      tagProps?: Partial<TagsProps>;
    };

export interface ChipContentProps {
  item: ChipOrTag;
  index: number;
  variant?: 'chips' | 'tags';
  onDismiss?: (index: number) => void;
  disabled?: boolean;
}

export const ChipContent: React.FC<ChipContentProps> = ({
  item,
  index,
  variant = 'chips',
  onDismiss,
  disabled = false,
}) => {
  const label = typeof item === 'string' ? item : item.label;
  const chipCustomProps = typeof item === 'object' ? item.chipProps : {};
  const tagCustomProps = typeof item === 'object' ? item.tagProps : {};

  return variant === 'tags' ? (
    <Tags
      key={`InputTags-${index}`}
      label={label}
      size="sm"
      shape="squared"
      dismissable
      onDismiss={() => onDismiss?.(index)}
      disabled={disabled}
      {...tagCustomProps}
    />
  ) : (
    <Chips key={`InputChips-${index}`} label={label} size="small" shape="squared" {...chipCustomProps} />
  );
};
