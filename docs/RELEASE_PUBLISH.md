# 发布指南

这是一个基于 Changeset 的 Monorepo 发布流程指南。

## 什么是 Changeset

Changeset 是一个用于管理多包仓库版本控制和发布的工具。它通过创建变更记录文件来跟踪每个包的变更，并自动生成版本号和变更日志。

### 主要特性

- **版本管理**：自动根据变更类型计算版本号
- **变更日志**：自动生成 CHANGELOG.md
- **依赖管理**：自动处理包之间的依赖关系
- **多包支持**：支持 Monorepo 中的多个包同时发布

## 发布流程

### 1. 创建 Changeset

当你完成了功能开发或修复后，需要创建一个 changeset 来记录变更：

```bash
pnpm changeset
```

运行后会出现交互式界面：

```
🦋  Which packages would you like to include?
┌─ Changed packages
│  ◯ @hanglin/components
│  ◯ @hanglin/core
│  ◯ @hanglin/utils
└─
```

选择需要发布的包，然后选择变更类型：

- **patch** (修复) - 向后兼容的 bug 修复
- **minor** (新功能) - 向后兼容的新功能
- **major** (破坏性变更) - 不向后兼容的重大变更

### 2. 变更类型说明

#### Patch 版本 (1.0.0 → 1.0.1)
- Bug 修复
- 性能优化
- 文档更新
- 依赖更新（非破坏性）

```
🦋  What kind of change is this for @hanglin/core?
┌─ patch
│  Bug fixes or other changes that don't affect the API
└─
```

#### Minor 版本 (1.0.0 → 1.1.0)
- 新增功能
- 新增 API
- 废弃功能（保持向后兼容）

```
🦋  What kind of change is this for @hanglin/core?
┌─ minor
│  New features or functionality
└─
```

#### Major 版本 (1.0.0 → 2.0.0)
- 删除 API
- 修改现有 API 的行为
- 破坏性变更

```
🦋  What kind of change is this for @hanglin/core?
┌─ major
│  Breaking changes
└─
```

### 3. 更新版本

创建 changeset 后，使用以下命令更新包版本：

```bash
pnpm version-packages
```

这个命令会：
- 读取所有 changeset 文件
- 计算新的版本号
- 更新 package.json 中的版本
- 生成或更新 CHANGELOG.md
- 删除已处理的 changeset 文件

### 4. 发布前检查

在发布前，确保本地环境正确配置：

```bash
pnpm check-registry
```

这个脚本会检查：
- 当前 registry 配置
- 认证状态
- 包的发布权限

### 5. 认证登录

如果需要认证，请登录到私有 registry：

```bash
npm login --registry http://hanglin.site:4873/
```

输入用户名、密码和邮箱。

### 6. 执行发布

```bash
pnpm release
```

这个命令会：
1. 运行 `pnpm check-registry` 检查环境
2. 执行 `pnpm build` 构建所有包
3. 执行 `changeset publish` 发布包

## 高级用法

### 多包联合发布

当一个包依赖另一个包时，Changeset 会自动处理依赖关系：

```bash
# 如果 @hanglin/components 依赖 @hanglin/core
# 更新 @hanglin/core 会自动更新 @hanglin/components 的依赖版本
```

### 预发布版本

创建预发布版本（alpha、beta、rc）：

```bash
# 进入预发布模式
pnpm changeset pre enter alpha

# 创建 changeset
pnpm changeset

# 更新版本（会生成如 1.0.0-alpha.0）
pnpm version-packages

# 发布预发布版本
pnpm release --tag alpha

# 退出预发布模式
pnpm changeset pre exit
```

### 快照发布

创建快照版本用于测试：

```bash
pnpm changeset version --snapshot
pnpm changeset publish --snapshot
```

## 工作流示例

### 日常开发流程

```bash
# 1. 创建功能分支
git checkout -b feature/new-component

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "feat: add new component"

# 4. 创建 changeset
pnpm changeset
# 选择包: @hanglin/components
# 选择类型: minor
# 输入描述: "Add new component"

# 5. 提交 changeset
git add .
git commit -m "chore: add changeset for new component"

# 6. 合并到主分支
git checkout main
git merge feature/new-component
```

### 发布流程

```bash
# 1. 更新版本
pnpm version-packages

# 2. 提交版本更新
git add .
git commit -m "chore: release packages"

# 3. 推送到远程
git push origin main

# 4. 发布
pnpm release

# 5. 推送标签（如果需要）
git push origin --tags
```

## 常见问题

### Q: 如何撤销已创建的 changeset？
A: 删除 `.changeset` 目录下对应的 changeset 文件即可。

### Q: 如何跳过某个包的发布？
A: 在 `.changeset/config.json` 的 `ignore` 数组中添加包名。

### Q: 如何固定多个包的版本？
A: 在 `.changeset/config.json` 的 `fixed` 数组中添加包名数组。

### Q: 发布失败了怎么办？
A: 检查网络连接、认证状态和包权限，然后重新运行 `pnpm release`。

## 配置文件说明

### .changeset/config.json

```json
{
  "changelog": "@changesets/cli/changelog",  // 变更日志生成器
  "commit": false,                          // 是否自动提交
  "access": "restricted",                   // 发布访问权限
  "baseBranch": "main",                    // 基础分支
  "updateInternalDependencies": "patch",    // 内部依赖更新策略
  "ignore": [],                            // 忽略的包
  "fixed": [],                             // 固定版本的包组
  "linked": []                             // 链接的包组
}
```

## 最佳实践

1. **及时创建 changeset**：每次重要变更后立即创建
2. **清晰的变更描述**：写明变更的具体内容和影响
3. **合理的版本类型**：严格按照语义化版本规范选择
4. **定期发布**：避免积累过多变更
5. **测试后发布**：确保所有测试通过后再发布

## 故障排除

### 认证问题
如果遇到认证失败：
1. 确认 registry 配置正确
2. 重新登录：`npm login --registry http://hanglin.site:4873/`
3. 检查是否有 `@hanglin` scope 的发布权限

### 依赖问题
如果遇到依赖冲突：
1. 清理 node_modules：`pnpm clean`
2. 重新安装依赖：`pnpm install`
3. 重新构建：`pnpm build`

### 版本冲突
如果遇到版本冲突：
1. 检查远程仓库是否有更新
2. 拉取最新代码：`git pull`
3. 重新运行版本更新：`pnpm version-packages`
