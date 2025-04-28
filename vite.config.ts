import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/salad-admin',
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      src: path.resolve('src')
    }
  },
  server: {
    port: 8787,
  }
})
