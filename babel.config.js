module.exports = function babelConfig(api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                // modules: false, // 将 ES6 module 转换为其他模块规范，可选 "adm" | "umd" | "systemjs" | "commonjs" | "cjs" | false，默认为 false
                targets: {
                    browsers: ['safari >= 7', 'ie >= 9'],
                },
            },
        ],
        '@babel/preset-react'
    ];

    const plugins = [
        '@babel/plugin-transform-runtime',
    ];
    
    return {
        presets,
        plugins
    };
};
