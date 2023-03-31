import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite' //自动导入依赖插件
import { resolve } from 'path' // 主要用于alias文件路径别名
import vue from '@vitejs/plugin-vue'
function pathResolve(dir) {
  return resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@/api/newAxios': ['callApi'],
        },
      ],
      dts: 'src/types/auto-imports.d.ts', // 依赖表
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
    hot: true,
    proxy: {},
  },
})
