# 依赖更新报告

本次更新已将项目的所有 lint 工具、格式化工具和相关依赖升级到最新稳定版本，并添加了自动导入功能。

## 🔄 主要更新内容

### 1. ESLint 更新 (8.57.1 → 9.30.0)
- 升级到 ESLint 9.x，使用新的扁平化配置格式 (`eslint.config.js`)
- 更新 `@typescript-eslint/eslint-plugin` 和 `@typescript-eslint/parser` 到 8.35.0
- 更新 `eslint-config-prettier` 到 10.1.5
- 更新 `eslint-plugin-prettier` 到 5.5.1

### 2. Stylelint 更新
- 升级 `stylelint` 到 16.21.0
- 升级 `stylelint-config-standard` 到 38.0.0
- 替换 `stylelint-config-prettier` 为 `stylelint-prettier` 5.0.3 (更好的兼容性)
- 创建新的 `stylelint.config.js` 配置文件

### 3. Prettier 更新
- 升级 `prettier` 到 3.6.2

### 4. 新增 Git Commit 规范
- 添加 `@commitlint/cli` 19.6.0
- 添加 `@commitlint/config-conventional` 19.6.0
- 配置文件: `commitlint.config.js`

### 5. 新增自动导入功能
- 添加 `unplugin-auto-import` 19.2.0
- 添加 `unplugin-vue-components` 28.5.0
- 创建 `auto-import.config.js` 配置文件
- 支持自动导入 Vue 组合式 API、组件和工具函数

### 6. 其他依赖更新
- 升级 `@changesets/cli` 到 2.29.5
- 添加 `globals` 15.13.0 (ESLint 9.x 需要)

## 🆕 新增功能

### 自动导入配置
项目现在支持以下自动导入：

1. **Vue 相关**
   - Vue 组合式 API (ref, reactive, computed 等)
   - Vue 组件

2. **工具函数**
   - 从 `@hanglin/utils` 自动导入常用工具函数
   - 从 `@hanglin/core` 自动导入核心功能

3. **组件自动导入**
   - 自动导入 `src/components` 目录下的组件
   - 支持 Vue、TSX 文件

### 新增脚本命令
```json
{
  "stylelint": "stylelint \"**/*.{css,scss,vue}\" --fix",
  "commit": "git-cz",
  "check": "pnpm typecheck && pnpm lint && pnpm stylelint"
}
```

## 📝 配置文件说明

### ESLint 配置 (`eslint.config.js`)
- 使用 ESLint 9.x 的新扁平化配置格式
- 支持 TypeScript、Vue、Prettier 集成
- 自定义规则配置

### Stylelint 配置 (`stylelint.config.js`)
- 支持 CSS、SCSS、Vue 文件
- 集成 Prettier 格式化
- 支持 Tailwind CSS 和常见 CSS 预处理器语法

### Commitlint 配置 (`commitlint.config.js`)
- 基于 conventional commits 规范
- 支持多种提交类型 (feat, fix, docs, style, refactor 等)

### 自动导入配置 (`auto-import.config.js`)
- 支持 Vue 生态系统
- 自动导入项目内部工具函数
- 生成类型定义文件

## ⚠️ 注意事项

1. **ESLint 配置迁移**
   - 从 `.eslintrc.*` 格式迁移到 `eslint.config.js`
   - 删除了旧的配置文件以避免冲突

2. **Stylelint 配置**
   - 使用 `stylelint-prettier` 替代 `stylelint-config-prettier` 以获得更好的兼容性

3. **自动导入**
   - 在 components 包中启用，其他包可根据需要配置
   - 会生成 `.d.ts` 类型定义文件和 ESLint 配置文件

## 🚀 使用方法

### 运行检查
```bash
# 完整检查 (类型检查 + ESLint + Stylelint)
pnpm check

# 单独运行
pnpm typecheck
pnpm lint
pnpm stylelint
```

### 代码格式化
```bash
# 自动修复 ESLint 问题
pnpm lint:fix

# Stylelint 自动修复
pnpm stylelint

# Prettier 格式化
pnpm format
```

### Git 提交
```bash
# 使用 commitizen 进行规范化提交
pnpm commit
```

所有工具现在都使用最新稳定版本，确保更好的性能和功能支持！
