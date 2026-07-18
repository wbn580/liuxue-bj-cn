import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [sitemap()],
  site: 'https://liuxue.bj.cn',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  vite: {
    plugins: [tailwindcss()],
  },
});