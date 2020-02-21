const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    countdown: './src/countdown.ts',
  },
  devtool: 'inline-source-map',
  plugins: [new CleanWebpackPlugin(), new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(nb)$/)],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/src/init-test.ts'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
  },
};
