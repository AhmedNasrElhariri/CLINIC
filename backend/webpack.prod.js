const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = env => {
  const envKeys = Object.keys(env || {}).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()],
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'node_modules/.prisma/client/schema.prisma', to: '' },
          { from: 'node_modules/.prisma/client/index.js', to: '' },
          {
            from:
              'node_modules/.prisma/client/query-engine-debian-openssl-1.1.x',
            to: '',
          },
          {
            from: '../frontend/build/',
            to: 'build',
          },
          {
            from: './prisma/migrations/',
            to: 'migrations',
          },
          {
            from: './.env',
            to: '',
          },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  });
};
