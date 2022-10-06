const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    nodeEnv: false,
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
          from: '../frontend/build/',
          to: 'frontend',
        },
        // {
        //   from: '../patients-app/build/',
        //   to: 'patients-app',
        // },
        {
          from: './prisma/migrations/',
          to: 'migrations',
        },
        {
          from: './src/views/',
          to: 'views',
        },
      ],
    }),
  ],
});
