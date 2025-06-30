# 版本管理和发布指南

本项目使用 [Changesets](https://github.com/changesets/changesets) 来管理版本和发布流程。

## 工作流程

### 1. 添加变更记录

当你完成了一个功能或修复了一个 bug 后，需要添加变更记录：

```bash
pnpm changeset
```

这会启动一个交互式的工具，引导你：
- 选择哪些包需要更新版本
- 选择版本更新类型（major/minor/patch）
- 编写变更描述

### 2. 更新版本

当准备发布时，运行以下命令来更新所有包的版本：

```bash
pnpm version-packages
```

这会：
- 根据 changeset 文件更新包的版本号
- 生成或更新 CHANGELOG.md
- 删除已处理的 changeset 文件

### 3. 发布到 NPM

当所有版本都准备好后，运行发布命令：

```bash
pnpm release
```

这会：
- 构建所有包
- 发布到配置的 NPM 仓库（http://hanglin.site:4873/）

## 版本类型说明

- **patch** (1.0.0 → 1.0.1): 修复 bug，向后兼容
- **minor** (1.0.0 → 1.1.0): 新增功能，向后兼容
- **major** (1.0.0 → 2.0.0): 破坏性变更，不向后兼容

## 其他有用的命令

```bash
# 构建所有包
pnpm build

# 运行所有包的 lint 检查
pnpm lint

# 修复所有 lint 问题
pnpm lint:fix

# 类型检查
pnpm typecheck

# 格式化代码
pnpm format

# 清理构建产物
pnpm clean
```

## 发布前检查清单

- [ ] 所有测试通过
- [ ] 代码已通过 lint 检查
- [ ] 类型检查无错误
- [ ] 构建成功
- [ ] 已添加 changeset
- [ ] 版本号已更新
- [ ] CHANGELOG 已生成

## 注意事项

1. 每次添加新功能或修复 bug 都应该运行 `pnpm changeset`
2. 不要手动修改 package.json 中的 version 字段
3. 发布前确保所有依赖的包都已构建成功
4. 发布到私有仓库需要先配置正确的认证信息
