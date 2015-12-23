'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('es6-promise').polyfill();

module.exports = {
    devtool: false,
    entry: [path.resolve(__dirname, 'public/js/main.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main-[hash].js'
    },
    cache: false,
    debug: false,
    plugins: [
      new HtmlWebpackPlugin({
          template: 'public/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      }]
    }
};