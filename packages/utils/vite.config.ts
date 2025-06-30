import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import progress from 'vite-plugin-progress'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HanglinUtils',
      fileName: (format: string) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
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
