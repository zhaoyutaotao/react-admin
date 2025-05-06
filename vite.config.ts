import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/salad-admin',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: path.resolve('src')
    }
  },
  server: {
    port: 8787,
    proxy: {
      '/api': {
        target: 'https://m1.apifoxmock.com/m1/6336970-6032439-default',
        changeOrigin: true
      }
    }
  }
})
