const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '..', 'client', 'App')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/js/'
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
        loaders: [
          'style',
          'css?sourceMap&root=../css&importLoaders=2',
          'sass?config=sassLoaderConfig',
          'autoprefixer?browsers=last 2 version'
        ]
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true
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
  },
  devtool: 'inline-source-map'
};
