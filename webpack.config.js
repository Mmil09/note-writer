var path = require('path');
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  entry: [
    // 'webpack-dev-server/client?http://localhost:' + config.port,
    // 'webpack/hot/only-dev-server',
    './src/frontend/index'
  ],
  output: {
    path: path.join(__dirname, 'src', 'public', 'build'),
    filename: 'bundle.js',
    // publicPath: '/static/'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  }
};
