var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    main: './client/index.js'
  },
  output: {
    path: './public/',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'components': path.resolve('./client/components')
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
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
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
    postcss: [ autoprefixer({ browsers: ['> 1%', 'last 3 versions'] }) ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
