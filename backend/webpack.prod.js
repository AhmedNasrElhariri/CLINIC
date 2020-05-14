const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
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
    new CopyPlugin([
      { from: 'node_modules/.prisma/client/schema.prisma', to: '' },
      { from: 'node_modules/.prisma/client/index.js', to: '' },
      {
        from: 'node_modules/.prisma/client/query-engine-debian-openssl-1.1.x',
        to: '',
      },
    ]),
    // new CopyPlugin([
    //   { from: 'node_modules/@prisma/client/index.js', to: 'dist' },
    //   { from: 'node_modules/@prisma/schema.prisma', to: 'dist' },
    //   {
    //     from: 'node_modules/@prisma/query-engine-debian-openssl-1.1.x',
    //     to: 'dist',
    //   },
    // ]),
  ],
});
