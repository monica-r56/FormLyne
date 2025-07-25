import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import type { Preview } from '@storybook/react-webpack5';
import { withThemeByClassName } from '@storybook/addon-themes';
import { reactIntl } from './reactIntl';
import '../app/index.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    reactIntl, // Passing internationalization config to the Storybook parameters
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i, // Automatically match color props for controls
        date: /Date$/i, // Automatically match date props for controls
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { locale = reactIntl.defaultLocale } = context.globals;
      // Ensure locale is a valid key in messages
      const validLocale = locale in reactIntl.messages ? locale : reactIntl.defaultLocale;
      const l = reactIntl.messages.find((e) => e.locale === validLocale);
      return (
        <MemoryRouter>
          <IntlProvider locale={locale} defaultLocale={reactIntl.defaultLocale} messages={l?.messages}>
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

  tags: ['autodocs'], // Tag for auto-generating docs in Storybook
  initialGlobals: {
    locale: reactIntl.defaultLocale, // Default locale for Storybook
    locales: {
      en: 'English',
      es: 'Spanish',
    },
    theme: 'light',
  },
};

export default preview;
