const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const dev = require('./webpack.prod.js');

module.exports = merge(dev, {
  externals: [nodeExternals()],
});
