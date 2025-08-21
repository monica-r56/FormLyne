import type { Meta, StoryObj } from '@storybook/react';
import HomePage from '.';
import { IntlProvider } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  decorators: [
    (Story) => {
      const flatMessages = Object.fromEntries(
        Object.entries(messages).map(([key, value]) => [key, value.defaultMessage])
      );

      return (
        <IntlProvider locale="en" messages={flatMessages}>
          <Story />
        </IntlProvider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
