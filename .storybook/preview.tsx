import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { withThemeByClassName } from '@storybook/addon-themes';
import { reactIntl } from './reactIntl';
import '../src/index.css';

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: reactIntl.defaultLocale,
      toolbar: {
        icon: 'globe',
        items: reactIntl.messages.map((m) => ({
          value: m.locale,
          title: m.locale.toUpperCase(),
        })),
      },
    },
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light Mode' },
          { value: 'dark', title: 'Dark Mode' },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: { test: 'todo' },
    tags: ['autodocs'],
  },

  decorators: [
    (Story, context) => {
      const { locale = reactIntl.defaultLocale } = context.globals;
      const currentLocale = reactIntl.messages.find((m) => m.locale === locale) ?? reactIntl.messages[0];

      return (
        <MemoryRouter>
          <IntlProvider
            locale={locale}
            defaultLocale={reactIntl.defaultLocale}
            messages={currentLocale.messages as Record<string, string>}
          >
            <Story />
          </IntlProvider>
        </MemoryRouter>
      );
    },
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
