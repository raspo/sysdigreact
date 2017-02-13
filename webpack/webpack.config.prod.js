const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '..', 'client', 'App')
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass!autoprefixer?browsers=last 2 version'
        )
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  sassLoaderConfig: {
    outputStyle: 'expanded',
    sourceMap: true,
    includePaths: [path.resolve(__dirname, './client/')]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/js', 'dist/css'], {
      root: path.join(__dirname, '../')
    }),
    new ExtractTextPlugin('css/style.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEVELOPMENT__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      sourceMap: false
    })
  ],
  resolve: {
    alias: {
      root: `${__dirname}/client`
    },
    modulesDirectories: [
      'client',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  progress: true,
  stats: {
    colors: true,
    modules: true,
    reasons: true
  }
};
