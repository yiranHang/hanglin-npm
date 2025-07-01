# @hanglin/core

Hanglin 核心工具库，包含多个实用模块。

## 安装

```bash
pnpm add @hanglin/core
```

## 模块

### request - HTTP 请求客户端

基于 Axios 的 HTTP 客户端，提供完整的请求拦截、响应拦截、错误处理、Token 管理、URL 映射等功能。

#### 基本使用

```typescript
import { HttpClient, createHttpClient } from '@hanglin/core'

// 方式1：直接实例化
const client = new HttpClient({
  baseURL: 'https://api.example.com',
  timeout: 10000
})

// 方式2：使用工厂函数
const client2 = createHttpClient({
  baseURL: 'https://api.example.com'
})

// 基本请求
const data = await client.get('/users', { page: 1, size: 10 })
const result = await client.post('/users', { name: 'John', age: 25 })
```

#### 完整配置选项

```typescript
const client = new HttpClient({
  // 基础配置
  baseURL: 'https://api.example.com',
  timeout: 30000,
  withCredentials: true,

  // Token 配置
  tokenConfig: {
    key: 'Authorization', // Header 中的键名
    getToken: () => localStorage.getItem('token'), // 获取 Token 的函数
    prefix: 'Bearer ' // Token 前缀
  },

  // URL 映射（用于多环境/多服务）
  urlMapping: {
    api: 'https://api.example.com',
    user: 'https://user.example.com',
    file: 'https://file.example.com'
  },

  // 路由配置
  loginUrl: '/login',
  routerConfig: {
    push: path => router.push(path),
    replace: path => router.replace(path)
  },

  // 加载状态配置
  loadingConfig: {
    showLoading: () => showGlobalLoading(),
    hideLoading: () => hideGlobalLoading()
  },

  // 消息提示配置
  messageConfig: {
    showError: msg => ElMessage.error(msg),
    showSuccess: msg => ElMessage.success(msg)
  },

  // 错误日志配置
  errorLogConfig: {
    addErrorLog: error => console.error('HTTP Error:', error)
  },

  // 用户状态配置
  userConfig: {
    logout: () => store.dispatch('user/logout')
  },

  // 状态码配置
  successCode: 200,
  overdueCode: 401
})
```

#### HTTP 方法

```typescript
// GET 请求
const users = await client.get<User[]>('/users', { page: 1 })

// POST 请求
const newUser = await client.post<User>('/users', {
  name: 'John',
  email: 'john@example.com'
})

// PUT 请求
const updatedUser = await client.put<User>('/users/1', {
  name: 'John Updated'
})

// DELETE 请求
await client.delete('/users/1')

// 文件下载
const blob = await client.download('/files/report.pdf')

// 自定义请求
const response = await client.request<CustomResponse>({
  method: 'patch',
  url: '/users/1',
  data: { status: 'active' }
})
```

#### 请求配置扩展

```typescript
// 控制加载状态
await client.post('/api/data', data, {
  loading: false // 禁用全局加载
})

// 控制请求取消
await client.get('/api/data', params, {
  cancel: false // 禁用自动取消重复请求
})

// 处理不同的 Content-Type
await client.post('/api/form', data, {
  params: { _type: 'form' } // application/x-www-form-urlencoded
})

await client.post('/api/upload', formData, {
  params: { _type: 'file' } // multipart/form-data
})

await client.post('/api/json', data, {
  params: { _type: 'json' } // application/json
})
```

#### URL 映射使用

```typescript
// 配置 URL 映射
const client = new HttpClient({
  baseURL: 'https://main.example.com',
  urlMapping: {
    user: 'https://user-service.com',
    file: 'https://file-service.com'
  }
})

// 使用映射前缀，会自动路由到对应服务
await client.get('/user/profile') // 实际请求: https://user-service.com/profile
await client.get('/file/upload') // 实际请求: https://file-service.com/upload
await client.get('/api/data') // 实际请求: https://main.example.com/api/data

// 启用映射需要在 headers 中添加 mapping: true
await client.get(
  '/user/profile',
  {},
  {
    headers: { mapping: true }
  }
)
```

#### 高级功能

```typescript
// 动态更新配置
client.updateConfig({
  baseURL: 'https://new-api.example.com',
  tokenConfig: {
    getToken: () => newTokenProvider()
  }
})

// 获取原始 Axios 实例
const axiosInstance = client.getInstance()

// 取消所有进行中的请求
client.cancelAllRequests()

// 处理数组参数
await client.post('/api/search', data, {
  params: {
    tags: ['tag1', 'tag2'],
    _type: 'multi'
  }
})
// 会转换为: /api/search?tags=tag1&tags=tag2
```

#### 错误处理

客户端内置了完整的错误处理机制：

- **HTTP 状态码错误**：自动处理 4xx、5xx 错误
- **业务错误**：根据响应中的 `code` 字段判断业务逻辑错误
- **网络错误**：处理超时、网络不可用等情况
- **登录过期**：自动检测 401 状态，执行登出和跳转
- **错误日志**：自动记录详细的错误信息

```typescript
try {
  const data = await client.get('/api/data')
} catch (error) {
  // 错误已经通过 messageConfig.showError 显示
  // 错误详情已经通过 errorLogConfig.addErrorLog 记录
  console.error('请求失败:', error)
}
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

## 使用示例

### Vue 3 项目集成

```typescript
// api/http.ts
import { createHttpClient } from '@hanglin/core'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'

let loadingInstance: any = null

export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,

  tokenConfig: {
    key: 'Authorization',
    getToken: () => localStorage.getItem('access_token'),
    prefix: 'Bearer '
  },

  loadingConfig: {
    showLoading: () => {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    hideLoading: () => {
      loadingInstance?.close()
    }
  },

  messageConfig: {
    showError: message => ElMessage.error(message),
    showSuccess: message => ElMessage.success(message)
  },

  routerConfig: {
    push: path => router.push(path),
    replace: path => router.replace(path)
  },

  userConfig: {
    logout: () => {
      const userStore = useUserStore()
      userStore.logout()
    }
  }
})

// api/user.ts
export const userApi = {
  // 获取用户列表
  getUsers: (params: UserQuery) => http.get<PageResult<User>>('/users', params),

  // 创建用户
  createUser: (data: CreateUserDto) => http.post<User>('/users', data),

  // 更新用户
  updateUser: (id: number, data: UpdateUserDto) => http.put<User>(`/users/${id}`, data),

  // 删除用户
  deleteUser: (id: number) => http.delete(`/users/${id}`),

  // 上传头像
  uploadAvatar: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return http.post<{ url: string }>('/users/avatar', formData, {
      params: { _type: 'file' }
    })
  }
}
```

### React 项目集成

```typescript
// services/http.ts
import { createHttpClient } from '@hanglin/core'
import { message } from 'antd'
import { history } from '@/utils/history'

export const http = createHttpClient({
  baseURL: process.env.REACT_APP_API_BASE_URL,

  tokenConfig: {
    key: 'Authorization',
    getToken: () => localStorage.getItem('token'),
    prefix: 'Bearer '
  },

  messageConfig: {
    showError: msg => message.error(msg),
    showSuccess: msg => message.success(msg)
  },

  routerConfig: {
    push: path => history.push(path),
    replace: path => history.replace(path)
  }
})

// hooks/useApi.ts
import { useState, useEffect } from 'react'
import { http } from '@/services/http'

export function useApi<T>(url: string, params?: any) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await http.get<T>(url, params)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, JSON.stringify(params)])

  return { data, loading, error }
}
```

## 最佳实践

1. **统一错误处理**：配置全局的错误处理函数
2. **Token 管理**：使用 `tokenConfig` 自动处理认证
3. **环境配置**：使用 `urlMapping` 处理不同环境的 API 地址
4. **类型安全**：为 API 响应定义 TypeScript 类型
5. **请求取消**：利用内置的请求取消功能避免重复请求

## License

MIT
