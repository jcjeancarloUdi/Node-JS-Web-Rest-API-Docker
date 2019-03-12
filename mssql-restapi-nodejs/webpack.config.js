const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: {
      index: 'index.js',
      configClass: 'ConfigClass.js'
    },
    devServer: {
        contentBase: './',
        port: 9000
      }
    };          