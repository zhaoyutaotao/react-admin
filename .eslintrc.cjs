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
    "plugin:react/jsx-runtime" // 'React' must be in scope when using JSX 解决页面不引用React报错问题
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
  // 规则配置
  rules: {}
}
