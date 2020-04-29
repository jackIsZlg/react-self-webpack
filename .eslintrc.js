// eslint 只要语法有一句错误就不生效
// 官方地址：https://eslint.bootcss.com/docs/user-guide/getting-started
// 规则也继承于Airbnb JavaScript Style Guide  https://github.com/airbnb/javascript
const path = require('path');

module.exports = {
    // parser: '@typescript-eslint/parser',
    // 配置解析器
    parser: 'babel-eslint',
    // 可以被基础配置中的已启用的规则继承
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb"
    ],
    // 指定支持的 JavaScript 语言选项
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
      ecmaFeatures: {
        globalReturn: true, // 允许在全局作用域下使用 return 语句
        jsx: true, // 启用 JSX
      }
    },
    settings: {
      // eslint不识别webpack的路径别名，需要插件：eslint-import-resolver-webpack
      'import/resolver': {
          webpack: {
              config: path.resolve(__dirname, 'webpack.config.js'),
          },
      },
    },
    // 指定启用的环境
    env: {
      node: true,
      browser: true,
      commonjs: true,
      es6: true
    },
    plugins: [
      "@typescript-eslint",
      "react-hooks", // 可缩写eslint-plugin-react-hooks
      "eslint-plugin-react",
      "eslint-plugin-import",
      "eslint-plugin-jsx-a11y"
    ],
    globals: {
      // 这里填入你的项目需要的全局变量
      // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
      React: 'readonly',
      ReactDOM: 'readonly'
    },
    rules: {
      // 这里填入你的项目需要的个性化配置，比如：
      // 非严格相等(===, !==)也不警告
      eqeqeq: 1,
      // semi: ['error', 'never'], 禁止用语句强制分号结尾
      'no-console': 'off',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
          caughtErrors: 'none'
        }
      ],
      // 4空格缩进
      indent: [
          'error',
          4,
          {
              SwitchCase: 1,
          },
      ],
      // 取消import有始终需要扩展名
      'import/extensions': ['error', 'always', {
        'js': 'never',
        'ts': 'never',
        'vue': 'never'
      }],
      'max-nested-callbacks': 'off',
      'react/no-children-prop': 'off',
      'typescript/member-ordering': 'off',
      'typescript/member-delimiter-style': 'off',
      'react/jsx-indent-props': 'off',
      'react/no-did-update-set-state': 'off',
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      'no-case-declarations': 0,
      // 最多一个class每个文件
      'max-classes-per-file': 0,
      // 允许使用console
      'no-console': [1, { allow: ['warn', 'error'] }],
      // 仅允许数学运算, 逻辑运算可以混合
      'no-mixed-operators': [
          2,
          {
              groups: [
                  // ["+", "-", "*", "/", "%", "**"],
                  ['&', '|', '^', '~', '<<', '>>', '>>>'],
                  ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                  // ["&&", "||"],
                  ['in', 'instanceof'],
              ],
              allowSamePrecedence: true,
          },
      ],
      // // 最大长度
      'max-len': [
        0,
        {
            code: 140,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true
        },
      ],
      // 三元运算符嵌套仅报警告
      'no-nested-ternary': 1,
      // 对参数重新赋值仅报警告
      'no-param-reassign': 1,
      // 禁止使用(++, --)，仅允许循环语句中使用
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      // 允许空行的空格
      'no-trailing-spaces': [2, { skipBlankLines: true }],
      // 允许三元运算，允许a && a()
      'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
      // 关闭class method必须使用this
      'class-methods-use-this': 0,
      'react/button-has-type': 0,
      'react/no-unused-state': 2,
      // 允许使用.js作为jsx
      'react/jsx-filename-extension': 0,
      // jsx 4格缩进
      'react/jsx-indent': [2, 4],
      'react/jsx-indent-props': [2, 4],
      'react/jsx-no-undef': [2, { allowGlobals: true }],
      'react/jsx-one-expression-per-line': 1,
      // 用index做key仅报警告
      'react/no-array-index-key': 1,
      // 允许单个js声明多个component
      'react/no-multi-comp': 0,
      'react/prop-types': [2, { skipUndeclared: true }],
      'react/react-in-jsx-scope': 2,
      'react/prefer-es6-class': 1,
      'react/state-in-constructor': 0,
      'react/sort-comp': [
          2,
          {
              order: [
                  'type-annotations',
                  'static-methods',
                  'html',
                  'lifecycle',
                  'onPageShow',
                  'onPageHide',
                  'onWechatShare',
                  'onPopState',
                  'show', // 页面显示
                  'hide', // 页面隐藏
                  'everything-else',
                  'render',
              ],
          },
      ],
      // 静态属性不能写在class中
      'react/static-property-placement': 0,
      // 不用 prefer 纯函数组件
      'react/prefer-stateless-function': 0,
      'react/jsx-props-no-spreading': 1,
      'react/no-access-state-in-setstate': 1,
      // 允许下环线变量、方法
      'no-underscore-dangle': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/href-no-hash': 0,
      'jsx-a11y/media-has-caption': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'react/forbid-prop-types': 0,
      'arrow-parens': 0,
      'function-paren-newline': 0,
      'comma-dangle': [
          2,
          {
              arrays: 'only-multiline',
              objects: 'only-multiline',
              imports: 'never',
              exports: 'never',
              functions: 'ignore',
          },
      ],
      'prefer-destructuring': [
          2,
          {
              AssignmentExpression: {
                  array: true,
                  object: false,
              },
          },
      ],
      'import/no-named-as-default': 0,
      'import/prefer-default-export': 0,
    }
}
  