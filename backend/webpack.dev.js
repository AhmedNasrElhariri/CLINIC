const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
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
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'server.js',
  },
  devServer: {
    contentBase: './dist',
  },
  node: {
    __dirname: false,
  },
  plugins: [new NodemonPlugin()],
  externals: [nodeExternals()],
  mode: 'development',
};
