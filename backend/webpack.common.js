const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
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
    extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    contentBase: './server-dist',
  },
  node: {
    __dirname: false,
  },
  plugins: [new NodemonPlugin()],
  mode: 'development',
};
