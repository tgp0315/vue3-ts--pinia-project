/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import postcssPresetEnv from 'postcss-preset-env'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
         additionalData: '@import "./src/assets/scss/common.scss";' // 全局公共样式
      },  
    }, 
    // postcss: {
    //   plugins: [
    //     postcssPresetEnv({
    //       importFrom: path.resolve(__dirname, './src/styles/index.css') // 就是让postcss知道有一些全局变量需要记录下来 ，包含postcss-custom-properties用于处理css变量
    //     })
    //   ]
    // },
  },
  server: {
    port: 8088,
    hmr: {
      host: 'localhost',
      port: 8088
    },
    proxy: {
      '/api': {
        target: 'your https address',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
