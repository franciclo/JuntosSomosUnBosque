var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    guest: './src/entry/guest.js',
    user: './src/entry/user.js'
  },
  output: {
    path: './public/',
    filename: '[name].js'
  },
  resolve: {
    root: path.resolve('./src/core'),
    alias: {
      'section': path.resolve('./src/content/sections'),
      'component': path.resolve('./src/content/components'),
      'icon': path.resolve('./src/content/assets/svg')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
        presets: ['es2015']
      }
    }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        exclude: /\/(node_modules)\//,
        loader: 'autopolyfiller',
        query: { browsers: [ 'last 2 versions', 'ie >= 9' ] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
