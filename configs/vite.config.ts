import { fileURLToPath, URL } from 'node:url'
import aliases from './vite-utils/aliases'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: aliases,
  },
})
