import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '.';
import { Tooltip } from '@/components/ui/Tooltip';
import { IconButton } from '@/components/ui/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Navbar> = {
  title: 'components/Layout/Navbar',
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar
      left={
        <button className="text-sm font-medium text-primary-foreground px-4 py-2 bg-primary rounded-md">
          Basic Button
        </button>
      }
      right={<div />} // Empty right section
    />
  ),
};

export const WithTooltips: Story = {
  render: () => (
    <Navbar
      left={
        <div className="flex items-center gap-2">
          <button className="text-sm font-medium text-primary-foreground px-4 py-2 bg-primary rounded-md">
            Basic Button
          </button>
        </div>
      }
      right={
        <div className="flex items-center gap-2">
          <Tooltip label="Search forms" position="bottom-center">
            <IconButton icon={<FontAwesomeIcon icon={faSearch} />} size="md" />
          </Tooltip>
          <Tooltip label="Your profile" position="bottom-center">
            <IconButton icon={<FontAwesomeIcon icon={faUser} />} size="md" />
          </Tooltip>
        </div>
      }
    />
  ),
};
