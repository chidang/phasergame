/** @format */

// require('browser-sync');
const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BaseConfig = require('./base.config.js');
const Config = require('./variables.js');

module.exports = function(env) {
  return WebpackMerge(BaseConfig(), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    performance: {
      hints: 'warning',
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new Webpack.DefinePlugin({
        global: {},
        process: {
          env: {
            NODE_ENV: JSON.stringify('development'),
          },
        }
      }),
      BrowserSync(),
    ],
  });

  function BrowserSync() {
    return new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: Config.port,
      notify: false,
      ghostMode: true,
      server: {
        baseDir: ['build'],
      },
    });
  }
};
