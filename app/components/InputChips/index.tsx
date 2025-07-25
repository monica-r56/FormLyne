import React, { useEffect } from 'react';
import { Input, type InputProps } from '@components/Input';
import messages from '@components/Input/message';
import { ChipContent } from './ChipContent';

type ChipOrTag =
  | string
  | {
      label: string;
      chipProps?: Partial<import('@components/Chips').ChipProps>;
      tagProps?: Partial<import('@components/Tags').TagsProps>;
    };

export type InputChipsProps = InputProps & {
  chips?: ChipOrTag[];
  variant?: 'chips' | 'tags';
  onChange?: (updatedChips: ChipOrTag[]) => void;
};

export const InputChips = React.forwardRef<HTMLInputElement, InputChipsProps>(
  ({ chips = [], variant = 'chips', onChange, children, ...rest }, ref) => {
    const [localChips, setLocalChips] = React.useState(chips);

    useEffect(() => {
      setLocalChips(chips);
    }, [chips]);

    const handleDismiss = (index: number) => {
      const updated = localChips.filter((_, i) => i !== index);
      setLocalChips(updated);
      onChange?.(updated);
    };

    return (
      <Input {...rest} ref={ref} readOnly={localChips.length > 0} aria-label={messages.ariaLabel.defaultMessage}>
        {!!localChips.length && (
          <div className="flex items-center gap-2 overflow-x-auto px-2 whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {localChips.map((item, index) => (
              <ChipContent
                key={index}
                item={item}
                index={index}
                variant={variant}
                onDismiss={handleDismiss}
                disabled={rest.disabled}
              />
            ))}
          </div>
        )}
        {children}
      </Input>
    );
  }
);

InputChips.displayName = 'InputChips';
