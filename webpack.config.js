/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'GlitchyLand!',
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|csv)$/i,
                type: 'asset/resource',
            },
        ],
    },
};