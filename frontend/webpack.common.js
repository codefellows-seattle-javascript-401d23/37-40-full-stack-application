'use strict';

require('dotenv').config();
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

const production = process.env.NODE_ENV === 'production';
const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HTMLWebpackPlugin({
    title: 'My Podcasts',
  }),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
  }),
];

if (production) {
  webpackConfig.plugins.push(new MiniCssPlugin({
    filename: '[name].[hash].css',
  }));
}

const finalLoader = production ? MiniCssPlugin.loader : 'style-loader';

webpackConfig.module = {};
webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source'],
        cacheDirectory: true,
      },
    },
  },
  {
    test: /\.scss$/,
    use: [
      finalLoader,
      'css-loader',
      'sass-loader',
    ],
  },
];
