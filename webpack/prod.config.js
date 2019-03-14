/** @format */

const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const BaseConfig = require('./base.config.js');

module.exports = function(env) {
  return WebpackMerge(BaseConfig(), {
    mode: 'production',
    devtool: 'source-map',
    performance: {
      hints: 'error',
    },
    optimization: {
      flagIncludedChunks: true,
      occurrenceOrder: true,
      minimizer: [
        new UglifyJsPlugin({
          exclude: /\/node_modules/,
          cache: '.cache',
          parallel: 4,
          sourceMap: false,
          uglifyOptions: {
            mangle: false,
            ie8: false,
            output: {
              comments: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new Webpack.DefinePlugin({
        global: {},
        process: {
          env: {
            NODE_ENV: JSON.stringify('production'),
          },
        },
      }),
    ],
  });
};
