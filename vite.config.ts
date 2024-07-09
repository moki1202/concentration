import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: 'toast-11',
      project: 'ginrummy_web',
    }),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
})
