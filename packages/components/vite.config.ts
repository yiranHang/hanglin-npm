import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import progress from 'vite-plugin-progress'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HanglinComponents',
      fileName: (format: string) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', '@hanglin/utils', '@hanglin/core', 'mitt', 'nprogress', '@vueuse/core', 'echarts'],
      output: {
        globals: {
          vue: 'Vue',
          '@hanglin/utils': 'HanglinUtils',
          '@hanglin/core': 'HanglinCore',
          mitt: 'mitt',
          nprogress: 'NProgress',
          '@vueuse/core': 'VueUse',
          echarts: 'echarts'
        },
        // 启用压缩
        compact: true
      }
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
    // 启用代码压缩
    minify: 'terser'
  },
  plugins: [
    progress(),
    vue(),
    dts({
      outDir: 'dist',
      include: ['src/**/*'],
      exclude: ['**/*.spec.ts', '**/*.test.ts']
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../packages')
    }
  }
})
