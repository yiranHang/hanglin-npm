## 发布流程
```bash
# 1. 创建 changeset
pnpm changeset

# 2. 更新版本
pnpm version-packages

# 3. 检查发布前状态
pnpm check-registry

# 4. 如果需要，登录到 registry
npm login --registry http://hanglin.site:4873/

# 5. 执行发布
pnpm release
```
## 发布前检查
如果认证失败：
1. 运行 `npm login --registry http://hanglin.site:4873/`
2. 输入正确的用户名和密码
3. 确认已有权限发布 `@hanglin` scope 的包
