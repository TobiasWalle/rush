let webpack = require('webpack');
let fs = require('fs');
let path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

let rootDir = path.resolve(__dirname, '..');

// Create a list of node_modules, so there are not bundled
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

module.exports = {
  target: 'node',
  entry: {
    app: [
      './src/server.tsx',
    ]
  },
  output: {
    filename: 'server.js',
    path: rootDir + '/dist/server/',
  },

  devtool: 'source-maps',

  resolve: {
    extensions: [
      '.webpack.js', '.web.js', '.ts', '.tsx', '.js'
    ]
  },

  module: {
    rules: [
      {test: /\.tsx?$/, loaders: ['awesome-typescript-loader']},
      {test: /\.scss?$/, loaders: [
        'isomorphic-style-loader',
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap'
      ]}
    ]
  },

  externals: nodeModules,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CheckerPlugin(),
  ]
};
