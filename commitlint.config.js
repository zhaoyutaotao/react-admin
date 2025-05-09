export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能（feature）
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能）
        'refactor', // 重构（非新增功能或修复）
        'test', // 添加或修改测试
        'chore', // 构建过程或辅助工具的变动
        'revert' // 回滚到上一个版本
      ]
    ]
  }
}
