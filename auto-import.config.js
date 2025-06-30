import AutoImport from 'unplugin-auto-import/rollup'
import Components from 'unplugin-vue-components/rollup'

export const createAutoImportConfig = () => {
  return [
    AutoImport({
      imports: [
        'vue',
        // 'vue-router', // 需要时安装
        // '@vueuse/core', // 需要时安装
        {
          '@hanglin/utils': [
            // 从 utils 包中自动导入常用工具函数
            'isFunction',
            'isObject',
            'isArray',
            'isString',
            'isNumber',
            'isBoolean',
            'isEmpty',
            'deepClone',
            'debounce',
            'throttle',
            'formatDate',
            'formatNumber',
            'formatCurrency'
          ],
          '@hanglin/core': [
            // 从 core 包中自动导入常用功能
            'request',
            'storage',
            'crypto'
          ]
        }
      ],
      dts: true, // 生成类型定义文件
      eslintrc: {
        enabled: true, // 生成 ESLint 配置
        filepath: './.eslintrc-auto-import.json'
      },
      dirs: [
        // 自动导入这些目录下的文件
        './src/composables',
        './src/utils',
        './src/hooks'
      ]
    }),
    Components({
      dirs: [
        // 自动导入这些目录下的组件
        './src/components'
      ],
      extensions: ['vue', 'tsx', 'ts'],
      dts: true, // 生成类型定义文件
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        // 可以添加其他 UI 库的解析器
        // ElementPlusResolver(),
        // AntDesignVueResolver()
      ]
    })
  ]
}

export default createAutoImportConfig
