const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    dev: './src/dev/index.ts',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Countdown lib - Development',
    }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(nb)$/),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/src/dev/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};