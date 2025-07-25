import { TabTrigger, TabVariant, TabsList } from './TabTrigger';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';

import React, { useState } from 'react';

type TabItem = {
  id: string | number;
  label: string;
  value: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
  content: React.ReactNode;
};

interface TabListProps {
  items: TabItem[];
  type?: TabVariant;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function TabList({ items, type = 'primary', defaultValue, value, onChange, className }: TabListProps) {
  const [selected, setSelected] = useState(value || defaultValue || items[0]?.value);

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <TabsPrimitive.Root value={selected} onValueChange={handleChange}>
      <TabsList type={type} className={className}>
        {items.map((tab) => (
          <TabTrigger
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={tab.icon}
            count={tab.count}
            disabled={tab.disabled}
          />
        ))}
      </TabsList>
      {items.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className={clsx(type === 'vertical' ? 'ml-2 inline-flex' : null)}
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
