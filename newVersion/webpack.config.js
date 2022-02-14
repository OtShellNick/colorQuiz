const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IsDev = process.env.NODE_ENV === 'development';

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    return loaders
}
const filename = ext => IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`


const plugins = () => {
    return [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ]
}

const cssLoaders = extra => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}


module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: ['@babel/polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            '@components': path.resolve(__dirname, './src/app/components'),
            '@': path.resolve(__dirname, './src/app'),
        }
    },
    devServer: {
        port: 4200,
        hot: true,
        static: './build'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    }
                ]
            },
        ]
    },
    plugins: plugins()
}