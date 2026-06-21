import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://liuxue.bj.cn',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});