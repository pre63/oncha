// webpack.config.js
const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    compose: './compose/index.js',
    curry: './curry/index.js',
    map: './map/index.js',
    either: './either/index.js',
    list: './list/index.js',
    fork: './fork/index.js',
    future: './future/index.js',
    id: './id/index.js',
    maybe: './maybe/index.js',
  },
  output: {
    path: path.join(__dirname, '/package'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'oncha',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve('./src')],
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve('src'), 'node_modules'],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
}
