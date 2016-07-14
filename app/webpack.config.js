var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    guest: './src/entry/guest.js',
    user: './src/entry/user.js',
    reset: './src/entry/reset.js'
  },
  output: {
    path: './public/',
    filename: '[name].js'
  },
  resolve: {
    root: path.resolve('./src/core'),
    alias: {
      'pages': path.resolve('./src/content/pages'),
      'components': path.resolve('./src/content/components'),
      'icons': path.resolve('./src/content/assets/svg'),

      'eventEmitter/EventEmitter': 'wolfy87-eventemitter/EventEmitter',
      'get-style-property': 'desandro-get-style-property',
      'matches-selector': 'desandro-matches-selector',
      'classie': 'desandro-classie'

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
        test: /\.jpg$/,
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
