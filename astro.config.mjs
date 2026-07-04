import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  site: 'https://liuxue.bj.cn',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  }
});