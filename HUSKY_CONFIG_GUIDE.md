# Husky & Lint-Staged 配置说明

本项目已配置 Husky 和 Lint-Staged 来自动化代码质量检查流程。

## 🔧 配置文件

### 1. Husky 钩子

#### Pre-commit 钩子 (`.husky/pre-commit`)

在每次提交前自动运行 lint-staged：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run lint:lint-staged
```

#### Commit-msg 钩子 (`.husky/commit-msg`)

验证提交消息格式是否符合 conventional commits 规范：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

### 2. Lint-Staged 配置 (`.lintstagedrc.json`)

对不同类型的文件应用相应的检查和格式化：

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.vue": ["eslint --fix", "stylelint --fix", "prettier --write"],
  "*.{css,scss,less,postcss}": ["stylelint --fix", "prettier --write"],
  "*.{md,json,yml,yaml}": ["prettier --write"]
}
```

## 📝 Package.json 脚本

新增的相关脚本：

```json
{
  "scripts": {
    "lint:lint-staged": "lint-staged",
    "prepare": "husky install"
  }
}
```

## 🚀 工作流程

### 自动化流程

1. **暂存文件**: `git add .`
2. **提交代码**: `git commit -m "feat: 新功能"`
3. **自动触发**:
   - Pre-commit 钩子运行 lint-staged
   - 对暂存的文件执行 ESLint、Stylelint、Prettier
   - 如果有错误，提交会被阻止
   - Commit-msg 钩子验证提交消息格式

### 处理的文件类型

- **JavaScript/TypeScript**: ESLint 修复 + Prettier 格式化
- **Vue 文件**: ESLint + Stylelint + Prettier
- **样式文件**: Stylelint 修复 + Prettier 格式化
- **配置文件**: Prettier 格式化
- **Markdown**: Prettier 格式化

## ⚙️ 依赖版本

- **husky**: ^9.1.6 (最新版本)
- **lint-staged**: ^15.2.10 (最新版本)
- **@commitlint/cli**: ^19.6.0
- **@commitlint/config-conventional**: ^19.6.0

## 🔍 提交消息规范

支持的提交类型：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建过程或辅助工具的变动
- `build`: 构建系统相关
- `ci`: 持续集成相关
- `revert`: 回退
- `wip`: 开发中
- `workflow`: 工作流
- `types`: 类型定义
- `release`: 发布

### 提交消息格式

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

示例：

```
feat(components): 添加新的按钮组件

添加了具有多种样式的按钮组件，支持不同尺寸和状态

Closes #123
```

## 🛠️ 手动命令

如果需要手动运行相关命令：

```bash
# 运行 lint-staged（检查暂存文件）
pnpm run lint:lint-staged

# 手动运行完整检查
pnpm run check

# 手动修复代码格式
pnpm run lint:fix
pnpm run format

# 手动修复样式
pnpm run stylelint
```

## 🚨 故障排除

### 1. 钩子不生效

确保 `.husky` 目录中的文件有执行权限：

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### 2. ESLint/Stylelint 错误

如果遇到错误，先手动修复：

```bash
pnpm run lint:fix
pnpm run stylelint
```

### 3. 跳过钩子（不推荐）

如果紧急情况需要跳过钩子：

```bash
git commit --no-verify -m "紧急修复"
```

这套配置确保了代码质量的一致性，并强制执行项目的编码规范！
