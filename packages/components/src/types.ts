// 组件类型定义

export interface ComponentProps {
  [key: string]: unknown
}

export interface ComponentEmits {
  [key: string]: (...args: unknown[]) => void
}

// 基础组件接口
export interface BaseComponent {
  name: string
  props?: ComponentProps
  emits?: ComponentEmits
}
