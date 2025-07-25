import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FormattedMessage } from 'react-intl';
import Overlay from './index';
import { overlayMessages } from './messages';

const meta: Meta<typeof Overlay> = {
  title: 'components/Atoms/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen bg-white dark:bg-gray-900">
      <Overlay />
    </div>
  ),
};

export const WithComponent: Story = {
  render: () => (
    <div className="relative h-screen bg-white dark:bg-gray-900">
      <Overlay>
        <div className="w-96 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            <FormattedMessage {...overlayMessages.loginFormTitle} />
          </h2>
          <form>
            <div className="mb-4">
              <label className="mb-2 block text-gray-900 dark:text-gray-100" htmlFor="username">
                <FormattedMessage {...overlayMessages.usernameLabel} />
              </label>
              <input
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                id="username"
                type="text"
                placeholder={overlayMessages.usernamePlaceholder.defaultMessage}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-gray-900 dark:text-gray-100" htmlFor="password">
                <FormattedMessage {...overlayMessages.passwordLabel} />
              </label>
              <input
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                id="password"
                type="password"
                placeholder={overlayMessages.passwordPlaceholder.defaultMessage}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="submit"
              >
                <FormattedMessage {...overlayMessages.loginButton} />
              </button>
              <button
                className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                type="button"
              >
                <FormattedMessage {...overlayMessages.cancelButton} />
              </button>
            </div>
          </form>
        </div>
      </Overlay>
    </div>
  ),
};

export const WithLoadingSpinner: Story = {
  render: () => (
    <div className="relative h-screen bg-white dark:bg-gray-900">
      <Overlay>
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="font-medium text-gray-100 dark:text-gray-100">
            <FormattedMessage {...overlayMessages.loadingText} />
          </p>
        </div>
      </Overlay>
    </div>
  ),
};
