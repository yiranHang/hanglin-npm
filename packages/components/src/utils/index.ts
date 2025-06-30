// 组件工具函数

/**
 * 检查值是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 生成组件 class 名称
 */
export function generateClassName(prefix: string, name: string, modifier?: string): string {
  const base = `${prefix}-${name}`
  return modifier ? `${base}--${modifier}` : base
}

/**
 * 处理组件 props
 */
export function normalizeProps(props: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {}

  Object.keys(props).forEach(key => {
    const value = props[key]
    if (value !== undefined && value !== null) {
      normalized[key] = value
    }
  })

  return normalized
}

/**
 * 合并组件样式
 */
export function mergeStyles(...styles: (string | Record<string, unknown> | undefined)[]): string {
  const result: string[] = []

  styles.forEach(style => {
    if (isString(style)) {
      result.push(style)
    } else if (style && typeof style === 'object') {
      Object.keys(style).forEach(key => {
        if (style[key]) {
          result.push(key)
        }
      })
    }
  })

  return result.join(' ')
}

/**
 * 创建命名空间类名生成器
 */
export function createNamespaceGenerator(namespace: string) {
  return (block: string, element?: string, modifier?: string): string => {
    let className = `${namespace}-${block}`

    if (element) {
      className += `__${element}`
    }

    if (modifier) {
      className += `--${modifier}`
    }

    return className
  }
}

/**
 * 处理事件修饰符
 */
export function withModifiers<T extends Event>(
  handler: (event: T) => void,
  modifiers: string[] = []
): (event: T) => void {
  return (event: T) => {
    if (modifiers.includes('prevent')) {
      event.preventDefault()
    }

    if (modifiers.includes('stop')) {
      event.stopPropagation()
    }

    if (modifiers.includes('once')) {
      // 这里需要在实际使用时处理
    }

    handler(event)
  }
}
