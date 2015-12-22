'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('es6-promise').polyfill();

module.exports = {
  devtool: '#inline-source-map',
  entry: [

    // 'webpack-hot-middleware/client?reload=true',
    //'webpack-hot-middleware/client?http://localhost:3000',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve(__dirname, 'public/js/main.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  cache: true,
  debug: true,
  plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.tpl.html',
        inject: 'body',
        filename: 'index.html',
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }, {
        test: /\.json?$/,
        loader: 'json',
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }]
    }
}
