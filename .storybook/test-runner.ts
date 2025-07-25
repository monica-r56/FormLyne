import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page, _context) {
    await injectAxe(page);
  },
  async postVisit(page, _context) {
    await checkA11y(page, '#storybook-root', {
      axeOptions: {
        rules: {
          'button-name': { enabled: false },
          'color-contrast': { enabled: false },
          'nested-interactive': { enabled: false },
        },
      },
      detailedReport: true,
    });
  },
};

export default config;
