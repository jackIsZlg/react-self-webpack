const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'; 
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map', //开发环境下使用
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: '[name].[hash].js',
        // publicPath: '/' //通常是CDN地址
    },
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
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
                    {
                        loader: 'style-loader',
                        options: {
                            // hmr: dev, // 是否为热更新样式（最新版本已经没有了）
                        }
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
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
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
          name: "manifest"
        },
        splitChunks: {
          chunks: "all", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
        //   minSize: 30000, // 形成一个新代码块最小的体积
          cacheGroups: {
            vendors: { // 项目基本框架等
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|mobx|mobx-react|mobx-react-dom|antd|@ant-design)/,
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
                minChunks: 2, // 最少引入2次的才放入
                name: 'commons',
                priority: 80,
            },
            codeMirror: {
                test: /[\\/]node_modules[\\/](react-codemirror|codemirror)/,
                minChunks: 1,
                priority: 2,
                name: "codemirror"
            },
          }
        }
    },
    plugins: [
        //不需要传参数喔，它可以找到 outputPath
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            config: {
                name: 'react'
            }
            // hash: true //是否加上hash，默认是 false
        })
    ]      
}