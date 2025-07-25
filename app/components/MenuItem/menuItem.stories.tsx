import { ReactNode, useState } from 'react';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/pro-regular-svg-icons';
import Avatar from '@components/Avatars';
import Chip from '@components/Chips';
import MenuItem from '.';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

type MenuItemStoryProps = {
  label: string;
  description?: string;
  secondaryLabel?: string;
  type: 'base' | 'secondary';
  disabled: boolean;
  selected: boolean;
  spaced: boolean;
  iconConfiguration: 'none' | 'left' | 'right' | 'both';
  withAvatar: boolean;
  withChip: boolean;
  children: ReactNode;
};

const getIcons = (iconConfiguration: string, spaced: boolean) => {
  const iconSize = spaced ? 'sm' : 'xs';
  const icons: { leftIcon: React.ReactNode; rightIcon: React.ReactNode } = {
    leftIcon: undefined,
    rightIcon: undefined,
  };
  if (iconConfiguration === 'left' || iconConfiguration === 'both') {
    icons.leftIcon = <FontAwesomeIcon icon={faCalendar} size={iconSize} />;
  }
  if (iconConfiguration === 'right' || iconConfiguration === 'both') {
    icons.rightIcon = <FontAwesomeIcon icon={faCalendar} size={iconSize} />;
  }
  return icons;
};

const meta: Meta<MenuItemStoryProps> = {
  title: 'components/molecules/MenuItem',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Menu Item' },
    description: { control: 'text' },
    secondaryLabel: { control: 'text' },
    type: { control: 'inline-radio', options: ['base', 'secondary'] },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    spaced: { control: 'boolean' },
    iconConfiguration: { control: 'inline-radio', options: ['none', 'left', 'right', 'both'] },
    withAvatar: { control: 'boolean' },
    withChip: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<MenuItemStoryProps>;

const Template = (args: MenuItemStoryProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isSelected = selected === 'template-item';
  const { leftIcon, rightIcon } = getIcons(args.iconConfiguration, args.spaced);

  return (
    <div className="inline-flex" role="menu">
      <MenuItem
        id="template-item"
        label={args.label}
        description={args.description}
        secondaryLabel={args.secondaryLabel}
        type={args.type}
        disabled={args.disabled}
        selected={args.selected !== undefined ? args.selected : isSelected}
        spaced={args.spaced}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        avatar={args.withAvatar ? <Avatar src="/assets/images/olivia-rhye.jpeg" /> : undefined}
        chips={args.withChip ? <Chip label="1" size="small" color="gray" /> : undefined}
        onClick={setSelected}
      />
    </div>
  );
};

const FixedWidthTemplate = (args: MenuItemStoryProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const isSelected = selected === 'fixed-width-item';
  const { leftIcon, rightIcon } = getIcons(args.iconConfiguration, args.spaced);

  return (
    <div className="w-[240px]" role="menu">
      <MenuItem
        id="fixed-width-item"
        label={args.label}
        description={args.description}
        secondaryLabel={args.secondaryLabel}
        type={args.type}
        disabled={args.disabled}
        selected={args.selected !== undefined ? args.selected : isSelected}
        spaced={args.spaced}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        avatar={args.withAvatar ? <Avatar src="/assets/images/olivia-rhye.jpeg" /> : undefined}
        chips={args.withChip ? <Chip label="1" size="small" color="gray" /> : undefined}
        onClick={setSelected}
      />
    </div>
  );
};

export const DefaultBase: Story = {
  render: Template,
  args: {
    label: 'Menu Item',
    type: 'base',
    disabled: false,
    selected: false,
    iconConfiguration: 'none',
    withAvatar: false,
  },
};

export const MenuWithChip: Story = {
  render: Template,
  args: {
    label: 'List Item',
    iconConfiguration: 'none',
    withChip: true,
  },
};

export const SecondaryType: Story = {
  render: Template,
  args: {
    ...DefaultBase.args,
    label: 'List item',
    secondaryLabel: '34',
    type: 'secondary',
    iconConfiguration: 'left',
  },
};

export const WithAvatar: Story = {
  render: Template,
  args: {
    ...SecondaryType.args,
    label: 'Olivia Rhye',
    description: 'olivia@exampleui.com',
    iconConfiguration: 'both',
    withAvatar: true,
  },
};

export const Disabled: Story = {
  render: FixedWidthTemplate,
  args: {
    ...DefaultBase.args,
    label: 'Disabled Item',
    description: 'This item is disabled',
    disabled: true,
    iconConfiguration: 'left',
  },
};

export const FixedWidthContainer: Story = {
  render: FixedWidthTemplate,
  args: {
    ...DefaultBase.args,
    label: 'Menu Item',
    description: 'fixed width container',
    iconConfiguration: 'both',
  },
};

export const HoverInteractionTest: Story = {
  render: Template,
  args: {
    ...DefaultBase.args,
    label: 'Hover Test Item',
    description: 'Tests hover and unhover interactions',
    iconConfiguration: 'left',
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const menuItem = canvas.getByRole('menuitem');
    await step('Test hover interaction', async () => {
      await userEvent.hover(menuItem);
      await waitFor(() => {
        expect(menuItem).toHaveClass('bg-zinc-100');
      });
    });
    await step('Test unhover interaction', async () => {
      await userEvent.unhover(menuItem);
      await waitFor(() => {
        expect(menuItem).toHaveClass('bg-white');
      });
    });
  },
};

export const FocusInteractionTest: Story = {
  render: Template,
  args: {
    ...DefaultBase.args,
    label: 'Focus Test Item',
    description: 'Tests keyboard focus interactions',
    iconConfiguration: 'left',
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const menuItem = canvas.getByRole('menuitem');
    await step('Test tab focus', async () => {
      menuItem.focus();
      await waitFor(() => {
        expect(menuItem).toHaveFocus();
        expect(menuItem).toHaveClass('bg-zinc-100');
      });
    });
    await step('Test focus ring visibility', async () => {
      await waitFor(() => {
        expect(menuItem).toHaveClass('outline-none');
      });
    });
  },
};

export const SelectionInteractionTest: Story = {
  render: Template,
  args: {
    ...DefaultBase.args,
    label: 'Selection Test Item',
    description: 'Tests click and keyboard selection interactions',
    iconConfiguration: 'left',
  },
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const menuItem = canvas.getByRole('menuitem');
    await step('Test click interaction', async () => {
      await userEvent.click(menuItem);
      await waitFor(() => {
        expect(menuItem).toHaveClass('bg-zinc-100');
      });
    });
    await step('Test keyboard selection (Enter)', async () => {
      await userEvent.click(document.body);
      menuItem.focus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(menuItem).toHaveClass('bg-zinc-100');
      });
    });
    await step('Test keyboard selection (Space)', async () => {
      await userEvent.click(document.body);
      menuItem.focus();
      await userEvent.keyboard(' ');
      await waitFor(() => {
        expect(menuItem).toHaveClass('bg-zinc-100');
      });
    });
  },
};
