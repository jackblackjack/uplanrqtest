import Vue from '@vitejs/plugin-vue'
import type { ConfigEnv, LogLevel, UserConfig } from 'vite'
import { loadEnv } from 'vite'
const root = process.cwd()

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root)

  return {
    define: {
      'process.env': process.env
    },
    base: env.VITE_BASE_PATH || '/',
    root: root,
    logLevel: (env.VITE_LOG_LEVEL || 'info') as LogLevel,
    server: {
      https: false,
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 8080,
      host: '0.0.0.0',
      strictPort: true,
      open: env.VITE_OPEN === 'true',
      proxy: {
        ['/api']: {
          target: env.VITE_BACKEND_API_RESOLVE,
          ws: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
        }
      }
    },
    plugins: [
      Vue(),
    ]
  }
}
