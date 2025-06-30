# @hanglin/components

Hanglin 组件库，提供多个实用模块。

## 安装

```bash
pnpm add @hanglin/components
```

## 模块

### utils - 组件工具

组件相关的工具函数。

```typescript
import { utils } from '@hanglin/components'

// 生成类名
const className = utils.generateClassName('h', 'button', 'primary')
// 结果: 'h-button--primary'

// 合并样式
const styles = utils.mergeStyles('btn', { active: true }, 'large')
// 结果: 'btn active large'

// 创建命名空间生成器
const createClass = utils.createNamespaceGenerator('my-app')
const buttonClass = createClass('button', 'text', 'primary')
// 结果: 'my-app-button__text--primary'
```

### composables - Vue 组合式函数

Vue 3 组合式 API 相关的可复用逻辑。

```typescript
import { composables } from '@hanglin/components'

// 使用本地存储
const { getValue, setValue } = composables.useLocalStorage('theme', 'light')

// 使用计数器
const { getValue: getCount, increment, decrement } = composables.useCounter(0)

// 使用切换状态
const { getValue: getToggle, toggle } = composables.useToggle(false)
```

### directives - Vue 指令

Vue 指令工厂函数。

```typescript
import { directives } from '@hanglin/components'

// 创建点击外部指令
const clickOutside = directives.createClickOutsideDirective()

// 创建防抖指令
const debounce = directives.createDebounceDirective()

// 创建长按指令
const longPress = directives.createLongPressDirective()
```

### hooks - 通用 Hooks

框架无关的可复用逻辑。

```typescript
import { hooks } from '@hanglin/components'

// 使用事件监听器
const { add, remove } = hooks.useEventListener(window, 'resize', handleResize)

// 使用异步状态
const { execute, getState } = hooks.useAsyncState(fetchData)

// 使用网络状态
const { getStatus, startListening } = hooks.useNetworkStatus()
```

## 直接导入

你也可以直接导入所有功能：

```typescript
import {
  generateClassName,
  useLocalStorage,
  createClickOutsideDirective,
  useEventListener
} from '@hanglin/components'
```

## 在 Vue 项目中使用

```vue
<template>
  <div :class="buttonClass">
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { generateClassName, useCounter } from '@hanglin/components'

const buttonClass = generateClassName('app', 'counter-button')
const { getValue: getCount, increment } = useCounter(0)
const count = getCount()
</script>
```

## License

MIT
