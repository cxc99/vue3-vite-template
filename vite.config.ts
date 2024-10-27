import { defineConfig, loadEnv } from 'vite'

import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './')

  return {
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ['vue', 'pinia', { '@/network/request': ['callApi'] }],
        dts: './auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },

    server: {
      proxy: {
        '/api': {
          target: config.VITE_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
