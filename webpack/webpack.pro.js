const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = require('./webpack.base');
const { assetsPath } = require('./utils');

const prodConfig = {
    mode: 'production',
    devtool: 'nosources-source-map', // source-map 是完整的不过体积大很多
    optimization: {
        minimizer: [
            // 用来压缩 js 代码
            new TerserPlugin({
                cache: true,
                // parallel: true,
                terserOptions: {
                    compress: {
                        warnings: true,
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'] // 移除console
                    }
                },
                // 只有在sourceMap的时候再启用，cheap-source-map options don't work with this plugin.
                sourceMap: true
            }),
            // 用来压缩css代码
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    reduceIdents: false,
                    autoprefixer: false,
                    safe: true,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash:8].css'),
            chunkFilename: assetsPath('css/[name].[id].[contenthash:8].css')
        })
    ]
};

module.exports = merge(baseConfig, prodConfig);
