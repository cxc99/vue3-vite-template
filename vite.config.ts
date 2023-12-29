import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite' //自动导入依赖插件
import { resolve } from 'path' // 主要用于alias文件路径别名

import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@/api/callApi': ['callApi'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts', // 依赖表
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': pathResolve('./src'),
    },
  },
  server: {
    open: '/',
    cors: true,
    port: 8090,

    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:3000/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
