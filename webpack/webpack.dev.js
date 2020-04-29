const merge = require('webpack-merge');

const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    devtool: 'source-map', // source-map 是完整的不过体积大很多
    devServer: {
        port: '3000', // 默认是8080
        quiet: false, // 默认不启用
        inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: 'errors-only', // 终端仅打印 error
        overlay: false, // 默认不启用
        clientLogLevel: 'silent', // 日志等级
        compress: true // 是否启用 gzip 压缩
    },
};

module.exports = merge(baseConfig, devConfig);
