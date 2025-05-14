/** @type {import('vite').UserConfig} */
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://cn.vite.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有`VITE_` 前缀。
  const env = loadEnv(mode, process.cwd())

  return {
    // vite 配置
    base: env.VITE_BASE_URL,
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
  }
})
