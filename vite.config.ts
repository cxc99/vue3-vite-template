import { defineConfig, loadEnv } from 'vite'

import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, './')

  return {
    plugins: [
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ['vue', 'pinia', { '@/network/request': ['callApi'] }],
        dts: './auto-imports.d.ts',
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
