/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteMockPlugin from './plugin/mock'
import postcssPresetEnv from 'postcss-preset-env'
import styleImport from 'vite-plugin-style-import'
import GvaPosition from './plugin/gvaPosition'
// import GvaPositionServer from './plugin/GvaPositionServer'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // GvaPositionServer(),
    GvaPosition(),
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
        },
      ],
    }),
    viteMockPlugin(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/common.scss";', // 全局公共样式
      },
    },
    postcss: {
      plugins: [
        postcssPresetEnv(),
      ],
    },
  },
  server: {
    port: 8088,
    hmr: {
      host: 'localhost',
      port: 8088,
    },
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
})
