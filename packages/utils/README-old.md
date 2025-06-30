# @hanglin/utils

Hanglin 通用工具库，提供常用的工具函数。

## 安装

```bash
pnpm add @hanglin/utils
```

## 使用

```typescript
import {
  isArray,
  isObject,
  isEmpty,
  deepClone,
  debounce,
  throttle
} from '@hanglin/utils'

// 类型检查
console.log(isArray([1, 2, 3])) // true
console.log(isObject({ a: 1 })) // true
console.log(isEmpty('')) // true

// 深拷贝
const original = { a: { b: 1 } }
const copied = deepClone(original)

// 防抖和节流
const debouncedFn = debounce(() => console.log('debounced'), 300)
const throttledFn = throttle(() => console.log('throttled'), 300)
```

## API

### 类型检查

- `isArray(value)` - 检查是否为数组
- `isObject(value)` - 检查是否为对象
- `isString(value)` - 检查是否为字符串
- `isNumber(value)` - 检查是否为数字
- `isBoolean(value)` - 检查是否为布尔值
- `isEmpty(value)` - 检查是否为空

### 工具函数

- `deepClone(obj)` - 深拷贝对象
- `debounce(func, wait)` - 防抖函数
- `throttle(func, limit)` - 节流函数

## License

MIT
