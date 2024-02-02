module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // 继承另一个配置文件的所有特性
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime' // 'React' must be in scope when using JSX 解决页面不引用React报错问题
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // 配置插件,可以定义规则，环境或配置的第三方模块
  plugins: ['@typescript-eslint', 'react'],
  /**
   * 规则配置
   * off 关闭
   * warn 警告（不影响代码执行）
   * error 错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint http://eslint.cn/docs/rules
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    "react/prop-types": "off",
    // typeScript https://typescript-eslint.io/rules
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
  }
}
