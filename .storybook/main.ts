import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    {
      // Custom styling addon for processing CSS
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/, // Test for .css files
            use: [
              'style-loader', // Inject styles into the DOM
              {
                loader: 'css-loader', // Handle CSS imports
                options: { importLoaders: 1 }, // Handle @import rules
              },
              {
                loader: 'postcss-loader', // Handle PostCSS transformations
                options: { implementation: require.resolve('postcss') },
              },
            ],
          },
        ],
      },
    },
    // For adding extra functionality with Storybook Webpack
    '@storybook/addon-webpack5-compiler-swc',
    // Addons for visual testing and internationalization
    '@chromatic-com/storybook',
    'storybook-react-intl',
  ],

  // Framework setup for React with Webpack 5
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        name: '@storybook/builder-webpack5',
        options: {
          fsCache: true, // Enable File System Cache
          lazyCompilation: true, // Enable Lazy Compilation
        },
      },
    },
  },

  // docs: {},
  env: (config) => ({
    ...config,
    STORYBOOK_APP_ENV: process.env.STORYBOOK_APP_ENV || 'default',
  }),

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  webpackFinal: async (config) => {
    // Adding the TsconfigPathsPlugin to handle TypeScript path aliases
    if (config.resolve) {
      config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()];
    }

    // Adding custom Webpack rule for handling TypeScript/JSX files
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.(tsx?|js)$/, // Target TypeScript and JavaScript files
        exclude: /node_modules/, // Exclude node_modules for optimization
        use: [
          {
            loader: 'swc-loader', // Use SWC for JSX transformation (automatic React import)
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript', // Enable TypeScript parsing
                  jsx: true, // Enable JSX support
                },
                transform: {
                  react: {
                    runtime: 'automatic', // Use React 17+ JSX Transform (automatic)
                  },
                },
              },
            },
          },
        ],
      });
    }

    // if (config.plugins) {
    //   config.plugins.push(new BundleAnalyzerPlugin());
    // }

    return config;
  },

  // Adding staticDirs property to serve assets from the public directory
  staticDirs: ['../public'],
};
export default config;
