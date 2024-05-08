import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'npm',
  hash: true,
  outputPath: 'dist',
  history: { type: 'hash' },
  model: {},
  title: '小明影视',
  favicons: [
    '/logo.ico'
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8001',
      // target: 'http://127.0.0.1:10001',
      changeOrigin: true,
    },
  },
});