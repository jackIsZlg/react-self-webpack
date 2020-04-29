const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'), // 必须是绝对路径
        filename: 'js/[name].[hash].js',
        // publicPath: '/' //通常是CDN地址
    },
    resolve: {
        alias: {
            '@': path.resolve('./src'),
            '@components': path.resolve('./src/components'),
            '@img': path.resolve('./src/image')
        },
        unsafeCache: true,
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                }],
                exclude: /node_modules/,
            },
            // 以.m.less为结尾的默认使用css modules
            {
                test: /\.m\.less/,
                use: [
                    isDev ? {
                        loader: 'style-loader',
                        options: {
                            // hmr: dev, // 是否为热更新样式（最新版本已经没有了）
                        }
                    }
                        : {
                            loader: MiniCssExtractPlugin.loader,
                        },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            // onlyLocals: '[local]--[hash:base64:5]',（新版本已废弃）
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: { modifyVars: true, javascriptEnabled: true },
                    },
                ],
            },
            // 以.less/.css为结尾的配置使用(排出使用.m.less)
            {
                test: /((?!m).).(le|c)ss$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, // 10K
                            esModule: false,
                            name: '[name]_[hash:6].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // 处理 html 中的本地图片
            // {
            //     test: /.html$/,
            //     use: 'html-withimg-loader'
            // }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all', // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            // minSize: 30000, // 默认值，新 chunk 产生的最小限制 整数类型（以字节为单位）
            // maxSize: 0, // 默认值，新 chunk 产生的最大限制，0为无限 整数类型（以字节为单位）
            // minChunks: 1, // 默认值，新 chunk 被引用的最少次数
            // maxAsyncRequests: 5, // 默认值，按需加载的 chunk，最大数量
            // maxInitialRequests: 3, // 默认值，初始加载的 chunk，最大数量
            // name: true, // 默认值，控制 chunk 的命名
            cacheGroups: {
                vendors: { // 项目基本框架等
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|redux|react-redux|axios)/,
                    priority: 100, // 优先级
                    minChunks: 1, // 最少引入的次数
                    name: 'vendors',
                },
                asyncCommons: { // 异步加载公共包、组件等
                    chunks: 'async',
                    minChunks: 2, //
                    name: 'asyncCommons',
                    priority: 90,
                },
                commons: { // 其他同步加载公共包
                // chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1, // 最少引入1次的才放入
                    name: 'commons',
                    priority: 80,
                },
                codeMirror: {
                    test: /[\\/]node_modules[\\/](react-codemirror|codemirror)/,
                    minChunks: 1,
                    priority: 2,
                    name: 'codemirror'
                },
            }
        }
    },
    plugins: [
        // 不需要传参数喔，它可以找到 outputPath
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', // 打包后的文件名
            minify: {
                removeAttributeQuotes: false, // 是否删除属性的双引号
                collapseWhitespace: false, // 是否折叠空白
            },
            config: {
                name: 'react'
            }
            // hash: true //是否加上hash，默认是 false
        })
    ]
};
