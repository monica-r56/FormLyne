interface BrowserProcess {
  env: {
    NODE_ENV?: string;
    TEST?: string;
  };
}
declare global {
  interface Window {
    process?: BrowserProcess;
  }
}
if (typeof window.process === 'undefined') {
  window.process = {
    env: {
      NODE_ENV: 'development',
      TEST: undefined,
    },
  };
}

import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { SidePanel } from '.';
import messages from './messages';
import { Button } from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';

type SidePanelStoryArgs = {
  size: 'sm' | 'md' | 'lg';
  dismissable: boolean;
};

export default {
  title: 'Components/Layout/SidePanel',
  component: SidePanel,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: React.FC) => (
      <IntlProvider locale="en" messages={{}}>
        <div className="relative h-screen w-screen p-4">
          <Story />
        </div>
      </IntlProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the side panel',
    },
    dismissable: {
      control: 'boolean',
      description: 'Whether the panel can be dismissed by clicking outside',
    },
  },
  args: {
    size: 'md',
    dismissable: true,
  },
};

export const WithFooter = (args: SidePanelStoryArgs) => (
  <SidePanel size={args.size} dismissable={args.dismissable}>
    <SidePanel.Trigger>
      <Button label="Open 'With Footer' Panel" color="blue" />
    </SidePanel.Trigger>
    <SidePanel.Header className="bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold">
        <FormattedMessage {...messages.documentDetails} />
      </h2>
      <p className="text-gray-700 dark:text-gray-200">
        <FormattedMessage {...messages.contentOverview} />
      </p>
    </SidePanel.Header>
    <SidePanel.Body className="flex items-center justify-center bg-zinc-100 py-4 dark:bg-zinc-700">
      <p className="p-4">
        <FormattedMessage {...messages.mainContent} />
      </p>
    </SidePanel.Body>
    <SidePanel.Footer className="bg-white dark:bg-zinc-800">
      <Button label="Cancel"  color="gray" onClick={() => console.log('Cancel clicked')} />
      <Button label="Save"  color="blue" onClick={() => console.log('Save clicked')} />
    </SidePanel.Footer>
  </SidePanel>
);

export const LongContent = (args: SidePanelStoryArgs) => (
  <SidePanel size={args.size} dismissable={args.dismissable}>
    <SidePanel.Trigger>
      <Button label="Open 'Long Content' Panel"  color="blue" />
    </SidePanel.Trigger>
    <SidePanel.Header className="bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold">
        <FormattedMessage {...messages.documentDetails} />
      </h2>
      <p className="text-gray-700 dark:text-gray-200">
        <FormattedMessage {...messages.contentOverview} />
      </p>
    </SidePanel.Header>
    <SidePanel.Body className="bg-zinc-100 dark:bg-zinc-700">
      <div className="space-y-2 py-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <p key={i} className="px-5">
            <FormattedMessage
              id="sidePanel.lineNumber"
              defaultMessage="This is line number {lineNumber}"
              values={{ lineNumber: i + 1 }}
            />
          </p>
        ))}
      </div>
    </SidePanel.Body>
    <SidePanel.Footer className="flex h-18 items-center justify-center bg-white dark:bg-zinc-800">
      <TextLink type="primary" size="md" text="Click here for more information" />
    </SidePanel.Footer>
  </SidePanel>
);

export const NoFooter = (args: SidePanelStoryArgs) => (
  <SidePanel size={args.size} dismissable={args.dismissable}>
    <SidePanel.Trigger>
      <Button label="Open 'No Footer' Panel"  color="blue" />
    </SidePanel.Trigger>
    <SidePanel.Header className="bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold">
        <FormattedMessage {...messages.documentDetails} />
      </h2>
    </SidePanel.Header>
    <SidePanel.Body className="bg-zinc-100 dark:bg-zinc-700">
      <p className="flex justify-center py-22">
        <FormattedMessage {...messages.mainContent} />
      </p>
    </SidePanel.Body>
  </SidePanel>
);
