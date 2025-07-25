// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginFormat from 'eslint-plugin-formatjs';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

// Utility to ensure compatibility of older rule configurations
import { fixupConfigRules } from '@eslint/compat';

export default [// 'ignores' property configuration for ESLint
{
  ignores: ['node_modules', 'public', 'build', 'dist', '.gitignore', 'internals', 'coverage'],
}, // Base configuration
{
  // Define global variables for various environments
  languageOptions: {
    globals: {
      ...globals.browser, // Browser environment globals (e.g., window, document)
      module: 'readonly', // `module` global (read-only)
      ...globals.serviceworker, // Service Worker environment globals
      ...globals.jest, // Jest testing framework globals (e.g., test, expect)
      ...globals.node, // Node.js environment globals (e.g., process, global)
    },
  },
  // Enable plugins for additional rule sets
  plugins: {
    formatjs: eslintPluginFormat, // Linting for FormatJS i18n
    'jsx-a11y': jsxA11y, // Accessibility checks for JSX
    import: importPlugin, // Import/export rules
  },
}, // Include recommended JavaScript rules
pluginJs.configs.recommended, // Include recommended TypeScript rules
...tseslint.configs.recommended, // Include recommended React rules with compatibility adjustments
...fixupConfigRules({
  ...pluginReactConfig,
  settings: {
    react: {
      version: 'detect', // Automatically detect React version from dependencies
    },
  },
}), // Custom rule configurations
{
  rules: {
    // Disable React-specific rule for requiring React in scope (unnecessary in modern setups)
    'react/react-in-jsx-scope': 'off',

    // Enforce no raw string literals in JSX (use translations instead)
    'formatjs/no-literal-string-in-jsx': 'error',

    // Prevent multiple whitespaces in FormatJS messages
    'formatjs/no-multiple-whitespaces': 'error',

    // Include all recommended accessibility rules for JSX
    ...jsxA11y.configs.recommended.rules,

    // Warn if a React component is missing a display name (useful for debugging)
    'react/display-name': 'warn',

    // Disallow unused variables but ignore those prefixed with `_`
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all', // Check all function arguments
        argsIgnorePattern: '^_', // Ignore arguments starting with `_`
        varsIgnorePattern: '^_', // Ignore variables starting with `_`
        caughtErrorsIgnorePattern: '^_', // Ignore caught errors starting with `_`
      },
    ],

    // Disable rule that disallows positive `tabIndex` values
    'jsx-a11y/tabindex-no-positive': 'off',

    // Allow using `require` statements in TypeScript
    '@typescript-eslint/no-var-requires': 'off',

    // Enforce organized imports
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin', // Node.js built-in modules (e.g., fs, path)
    //       'external', // Third-party packages (e.g., react, lodash)
    //       'internal', // Internal modules (e.g., project-specific aliases)
    //       ['parent', 'sibling', 'index'], // Relative imports (e.g., ../, ./)
    //       'type', // Type-only imports
    //     ],
    //     'newlines-between': 'always', // Require blank lines between groups
    //     alphabetize: {
    //       // Sort imports alphabetically
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //   },
    // ],

    /* Commented out to disable consistent use of type imports:
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports', // Always use `import type` for TypeScript types
      },
    ],
    */

    /* Commented out to disable restrictions on imports:
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'some-library', // Example of restricting a library
            message: 'Please import only specific modules instead of the whole library.',
          },
        ],
        patterns: ['!type:*'], // Allow only type imports
      },
    ],
    */
  },
}, ...storybook.configs["flat/recommended"]];
