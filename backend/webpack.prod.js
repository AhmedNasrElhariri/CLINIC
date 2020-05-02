const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.graphql', '.ts', '.js', '.json'],
  },
  node: {
    fs: 'empty',
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.gql'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  node: {
    __dirname: false,
  },
  mode: 'production',
};
