# @hanglin/core

Hanglin 核心工具库，包含多个实用模块。

## 安装

```bash
pnpm add @hanglin/core
```

## 模块

### request - HTTP 请求客户端

基于 Axios 的 HTTP 客户端，支持请求拦截、响应拦截、错误处理等。

```typescript
import { request, createHttpClient } from '@hanglin/core'

// 使用命名空间导入
const { HttpClient } = request
const client = new HttpClient({
  baseURL: 'https://api.example.com'
})

// 或使用工厂函数
const client2 = createHttpClient({
  baseURL: 'https://api.example.com'
})
```

### storage - 本地存储工具

安全的本地存储操作工具。

```typescript
import { storage } from '@hanglin/core'

// 使用命名空间导入
storage.setItem('key', 'value')
const value = storage.getItem('key')

// JSON 操作
storage.setJSON('user', { name: 'John' })
const user = storage.getJSON('user')
```

### crypto - 加密工具

基础的加密和编码工具。

```typescript
import { crypto } from '@hanglin/core'

// 生成随机字符串
const randomStr = crypto.generateRandomString(16)

// Base64 编码/解码
const encoded = crypto.base64Encode('hello world')
const decoded = crypto.base64Decode(encoded)

// 简单哈希
const hash = crypto.simpleHash('test string')
```

## 直接导入

你也可以直接导入所有功能：

```typescript
import { HttpClient, createHttpClient, getItem, setItem, generateUUID, base64Encode } from '@hanglin/core'
```

## License

MIT
