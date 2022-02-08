import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const BACKEND_URL = 'http://localhost:3030'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],

  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
