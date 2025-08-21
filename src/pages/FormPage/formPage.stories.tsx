import type { Meta, StoryObj } from '@storybook/react';
import FormPage from '.'; 
import { IntlProvider } from 'react-intl';
import messages from './messages';

const meta: Meta<typeof FormPage> = {
  title: 'Pages/FormPage',
  component: FormPage,
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

type Story = StoryObj<typeof FormPage>;

export const Default: Story = {};