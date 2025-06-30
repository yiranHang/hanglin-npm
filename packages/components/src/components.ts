// 基础组件导出

// 暂时导出一个示例组件
export const Button = {
  name: 'HButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup() {
    // 组件逻辑
    return {}
  }
}

// 更多组件可以在这里添加
export const components = {
  Button
}
