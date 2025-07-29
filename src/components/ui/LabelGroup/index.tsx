import React, { isValidElement, ReactNode } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

const ALLOWED_COMPONENTS = ['RadioGroupItem', 'RadioGroup', 'Checkbox', 'Toggle', 'Avatar'];

interface LabelGroupProps {
  component?: ReactNode;
  label?: string;
  description?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  className?: string;
  componentPosition?: 'left' | 'right';
  disabled?: boolean;
  selected?: boolean;
  labelFor?: string;
}

type ComponentWithDisplayName = {
  displayName?: string;
};

const avatarSizeTextClassMap: Record<string, { label: string; description: string; gap: string }> = {
  sm: {
    label: 'text-sm font-semibold',
    description: 'text-xs leading-[18px]',
    gap: '8px',
  },
  md: {
    label: 'text-sm font-semibold',
    description: 'text-sm',
    gap: '8px',
  },
  lg: {
    label: 'text-base font-semibold',
    description: 'text-base',
    gap: '12px',
  },
  xl: {
    label: 'text-lg font-semibold',
    description: 'text-base',
    gap: '12px',
  },
};

const LabelGroup: React.FC<LabelGroupProps> = ({
  component,
  label = '',
  description = '',
  labelClassName,
  descriptionClassName,
  className = '',
  componentPosition = 'left',
  disabled = false,
  selected = false,
  labelFor,
}) => {
  let componentType = '';
  const isValidComponent =
    isValidElement(component) &&
    typeof component.type !== 'string' &&
    ((componentType = (component.type as ComponentWithDisplayName).displayName || ''),
    ALLOWED_COMPONENTS.includes(componentType));

  let dynamicLabelClassName = 'font-medium text-sm text-zinc-700 dark:text-zinc-400 break-all';
  let dynamicDescriptionClassName = 'font-normal text-sm text-zinc-600 dark:text-zinc-400 break-all';
  let dynamicGap = '8px';

  let isAvatarSm;
  if (isValidComponent && componentType === 'Avatar') {
    const avatarProps = component.props as { size?: string };
    isAvatarSm = componentType === 'Avatar' && avatarProps.size === 'sm';
    const avatarSize = avatarProps.size || 'md';

    const dynamicClasses = avatarSizeTextClassMap[avatarSize] || avatarSizeTextClassMap['md'];
    const dynamicStyles = avatarSizeTextClassMap[avatarSize] || avatarSizeTextClassMap['md'];

    dynamicLabelClassName = `font-medium ${dynamicClasses.label} text-zinc-700 dark:text-zinc-400 break-all`;
    dynamicDescriptionClassName = `font-normal ${dynamicClasses.description} text-zinc-600 dark:text-zinc-400 break-all`;
    dynamicGap = dynamicStyles.gap;
  }

  if (selected) {
    dynamicLabelClassName = dynamicLabelClassName
      .replace(/text-zinc-700/g, 'text-zinc-900')
      .replace(/dark:text-zinc-400/g, 'dark:text-zinc-100');

    dynamicDescriptionClassName = dynamicDescriptionClassName
      .replace(/text-zinc-600/g, 'text-zinc-900')
      .replace(/dark:text-zinc-400/g, 'dark:text-zinc-100');
  }

  const ComponentBlock = isValidComponent ? (
    <div
      className={`component-container ${
        componentType !== 'Avatar' ? 'translate-y-[2px]' : isAvatarSm ? 'translate-y-[3px]' : ''
      }`}
    >
      {component}
    </div>
  ) : null;

  const LabelTextBlock = (
    <div
      className={`label-description-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {label && (
        <LabelPrimitive.Root htmlFor={labelFor} className={labelClassName ?? dynamicLabelClassName}>
          {label}
        </LabelPrimitive.Root>
      )}
      {description && <p className={descriptionClassName ?? dynamicDescriptionClassName}>{description}</p>}
    </div>
  );

  return (
    <div
      className={`label-group ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: dynamicGap,
      }}
    >
      {componentPosition === 'left' ? (
        <>
          {ComponentBlock}
          {LabelTextBlock}
        </>
      ) : (
        <>
          {LabelTextBlock}
          {ComponentBlock}
        </>
      )}
    </div>
  );
};

LabelGroup.displayName = 'LabelGroup';

export default LabelGroup;
