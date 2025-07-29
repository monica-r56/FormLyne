// src/components/layout/Navbar.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '.';
import { Tooltip } from '@/components/ui/Tooltip';
import { IconButton } from '@/components/ui/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar>
      <button className="text-sm font-medium text-primary-foreground px-4 py-2 bg-primary rounded-md">
        Basic Button
      </button>
    </Navbar>
  ),
};

export const WithTooltips: Story = {
  render: () => (
    <Navbar>
      <Tooltip label="Search forms" position="bottom-center">
        <IconButton icon={<FontAwesomeIcon icon={faSearch} />}  size="md" />
      </Tooltip>
      <Tooltip label="Your profile" position="bottom-center">
        <IconButton icon={<FontAwesomeIcon icon={faUser} />}  size="md" />
      </Tooltip>
    </Navbar>
  ),
};
