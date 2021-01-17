const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const tsRule = {
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  use: 'ts-loader',
}

const plugins = [
  new HTMLWebpackPlugin({
    template: 'src/Popup/popup.html',
    filename: 'popup.html',
    chunks: ['popup'],
    apiKeys: {
      GEOCODER: process.env.REACT_APP_GEOCODER_API_KEY
    }
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: "public", to: "." }
    ],
  }),
  new CleanWebpackPlugin(),
];

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: {
    popup: './src/Popup/index.tsx',
    content: './src/content.ts',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [tsRule],
  },
  plugins,
}