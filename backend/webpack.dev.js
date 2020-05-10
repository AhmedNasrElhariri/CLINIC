const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: __dirname + '/server-dist',
    publicPath: './src',
  },
  plugins: [new CleanWebpackPlugin()],
  externals: [nodeExternals()],
});
