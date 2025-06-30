# @hanglin/utils

Hanglin 通用工具库，提供多个实用模块。

## 安装

```bash
pnpm add @hanglin/utils
```

## 模块

### typeGuards - 类型守卫

类型检查和守卫函数。

```typescript
import { typeGuards } from '@hanglin/utils'

// 使用命名空间导入
if (typeGuards.isArray(value)) {
  // value 的类型被缩窄为 unknown[]
}

// 或直接导入
import { isArray, isObject, isEmpty } from '@hanglin/utils'
```

### functions - 函数工具

实用的函数工具。

```typescript
import { functions } from '@hanglin/utils'

// 深拷贝
const copied = functions.deepClone(original)

// 防抖和节流
const debouncedFn = functions.debounce(fn, 300)
const throttledFn = functions.throttle(fn, 300)

// 函数组合
const composed = functions.compose(fn1, fn2, fn3)
```

### validators - 验证器

常用的验证函数。

```typescript
import { validators } from '@hanglin/utils'

// 验证邮箱
const isValid = validators.isValidEmail('test@example.com')

// 验证手机号
const isValidPhone = validators.isValidPhone('13800138000')

// 验证密码强度
const isStrong = validators.isStrongPassword('MyPassword123!')
```

### formatters - 格式化器

数据格式化工具。

```typescript
import { formatters } from '@hanglin/utils'

// 格式化文件大小
const size = formatters.formatFileSize(1024000) // "1000 KB"

// 格式化货币
const price = formatters.formatCurrency(1234.56) // "¥1,234.56"

// 格式化日期
const date = formatters.formatDate(new Date()) // "2023-12-01 10:30:00"

// 脱敏处理
const masked = formatters.maskPhoneNumber('13800138000') // "138****8000"
```

## 直接导入

你也可以直接导入所有功能：

```typescript
import { 
  isArray, 
  deepClone, 
  debounce,
  isValidEmail,
  formatFileSize
} from '@hanglin/utils'
```

## License

MIT
