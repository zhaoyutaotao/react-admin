// ESLint Flat Config 配置文件（适用于 ESLint v9+）
// 官方文档：https://eslint.org/docs/latest/use/configure/flat-config
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // JS 推荐规则（Flat Config 写法，等同于 'eslint:recommended'）
  js.configs.recommended,
  // TypeScript 推荐规则（包含基础 TS 规则）
  // 注意：recommended 是一个数组（含多个规则块），需用扩展符展开
  ...tseslint.configs.recommended,
  // React 推荐规则（支持 JSX、hooks 等）
  pluginReact.configs.flat.recommended,
  // 自定义规则 + 设置语言环境 + 类型检查配置
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // 匹配所有项目中可能包含的 JS/TS 文件
    languageOptions: {
      parser: tseslint.parser, // 使用 typescript-eslint 提供的解析器
      parserOptions: {
        ecmaVersion: 2020, // 使用 ECMAScript 2020 标准
        sourceType: 'module', // 支持 ES 模块
        project: './tsconfig.json' // 启用 Type-aware lint（需包含目标文件）
      },
      globals: {
        ...globals.browser, // 注入浏览器全局变量（如 window、document）
        ...globals.node // 注入 Node 全局变量（如 process、__dirname）
      }
    },
    settings: {
      react: {
        version: 'detect' // 自动检测 package.json 中的 React 版本
      }
    },
    rules: {
      'no-var': 'error', // 禁用 var，强制使用 let/const
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any（可按需开启）
      'react/prop-types': 'off', // 不使用 prop-types（TS 项目不需要）
      'react/react-in-jsx-scope': 'off' // React 17+ 不再需要 import React
    }
  },
  // 忽略不需要 ESLint 检查的文件（配置文件、构建产物等）
  {
    ignores: [
      '**/*.config.js', // 各类 .config.js 文件
      '**/*.config.ts', // 各类 .config.ts 文件
      '.prettierrc.js', // Prettier 配置文件
      'dist' // 构建目录
    ]
  }
]
