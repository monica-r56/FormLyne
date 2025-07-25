/* eslint-disable @typescript-eslint/no-require-imports */
const webpackM = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { ids } = require('webpack');
const GenerateSW = require('workbox-webpack-plugin').GenerateSW;
const CompressionPlugin = require('compression-webpack-plugin');

const { HashedModuleIdsPlugin } = ids;

module.exports = webpackM.merge(webpackCommon, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
          compress: {
            comparisons: true,
            collapse_vars: true,
            reduce_vars: true,
            dead_code: true,
            passes: 2, // Increase the number of passes to allows Terser to go over the code twice for more efficient optimizations
          },
          parse: {},
          ie8: false,
          safari10: false,
          mangle: true,
          toplevel: true, // Optimize top-level variables and functions
        },
        parallel: true, // Use parallel processing for faster minification
        extractComments: false, // Avoid extracting comments to separate files
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: { context: string }): string {
            const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            return `npm.${match ? match[1].replace('@', '') : ''}`;
          },
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new htmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/assets/images/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      mode: 'production',
    }),
  ],

  performance: {
    assetFilter: (assetFilename: string) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
