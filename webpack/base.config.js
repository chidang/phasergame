/** @format */

const Path = require('path');
const Webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Config = require('./variables');
const extractStyle = new ExtractTextPlugin({
  filename: 'styles/[name].css',
  allChunks: true,
});

let plugins;
let extensions = ['.html', '.json', '.js', '.jsx', '.css', '.scss'];
let rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
    ],
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: false,
          attrs: false,
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: extractStyle.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader?url=false',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [require('precss'), Autoprefixer('last 2 versions', 'ie 10')];
            },
          },
        },
      ],
    }),
  },
  {
    test: /\.scss$/,
    use: extractStyle.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader?url=false',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [
                // require('precss'),
                Autoprefixer('last 2 versions', 'ie 10'),
              ];
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules'],
          },
        },
      ],
    }),
  },
];

plugins = [
  NunjuckToHtml(),
  extractStyle,
  new Webpack.ProvidePlugin(Config.providePlugin),
  new CopyWebpackPlugin(Config.copyResource),
];

let output = {
  path: Config.path.build,
  filename: 'scripts/[name].js',
  chunkFilename: '[name].js',
  sourceMapFilename: '[name].map',
};

let optimization = {};

module.exports = function() {
  return {
    target: Config.target,
    entry: './src/scripts/index.js',
    externals: Config.externals,
    plugins: plugins,
    output: output,
    optimization: optimization,
    resolve: {
      modules: [Path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        Src: Config.path.src,
        Script: Config.path.script,
        Style: Config.path.style,
        Image: Config.path.image,
        Font: Config.path.font,
      },
      extensions: extensions,
    },

    module: {
      rules: rules,
    },
  };
};
/********************************
 * Extension Methods
 ********************************/
function NunjuckToHtml() {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    template: Config.path.src + 'index.html'
  });
}
