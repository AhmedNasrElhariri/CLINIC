const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: __dirname + '/server-dist',
    publicPath: './src',
  },
  externals: [nodeExternals()],
});
