/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|csv)$/i,
                type: 'asset/resource',
            },
        ],
    },
};