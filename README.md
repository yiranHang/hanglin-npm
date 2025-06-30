# Hanglin Workspace

Hanglin 工具库集合 - 一个包含核心功能、通用工具和组件的 Monorepo。

## 包结构

### [@hanglin/core](./packages/core)
核心工具库，包含 HTTP 请求客户端等核心功能。

- HTTP 客户端（基于 Axios）
- 请求取消器
- 状态检查工具

### [@hanglin/utils](./packages/utils)
通用工具库，提供常用的工具函数。

- 类型检查函数
- 深拷贝工具
- 防抖和节流函数

### [@hanglin/components](./packages/components)
组件库，提供常用的 Vue 组件。

- 基础 Vue 组件
- 组件工具函数
- 样式合并工具

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
# 构建所有包
pnpm build

# 开发模式（监听文件变化）
pnpm dev
```

### 代码质量

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 代码格式化
pnpm format

# 类型检查
pnpm typecheck
```

### 发布

```bash
# 添加变更记录
pnpm changeset

# 更新版本
pnpm version-packages

# 发布
pnpm release
```

## 技术栈

- **TypeScript** - 静态类型检查
- **Rollup** - 打包工具
- **pnpm** - 包管理器
- **Changesets** - 版本管理
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Stylelint** - 样式检查

## License

MIT
