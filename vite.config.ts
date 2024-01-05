/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  test: {
    globals: true,
    name: 'jsdom',
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
})
