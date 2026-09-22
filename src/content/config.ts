import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  // Astro 5 起 src/content/ 下的集合必须显式声明 loader；
  // 旧的 `type: 'content'` 隐式扫描已移除，会让集合静默变空。
  // 2026-07-31 实测：本站升 Astro 5 后 articles 变空集合，
  // 34 条根路径 URL 与全部 category 页因此从线上消失（构建只打印一行 warning，退出码仍为 0）。
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishDate: z.string(),
    readingTime: z.number().optional(),
    ogImage: z.string().optional(),
    hideFromHome: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    pubDatetime: z.string(),
    modDatetime: z.string().optional(),
    ogImage: z.string().optional(),
    hideFromHome: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    // 8 目的国栏目铺栏（R330，2026-09-22）：可选字段，不破坏既有约 340 篇不带
    // category 的文章——旧文章解析后该字段为 undefined，不受影响。
    category: z.string().optional(),
  }),
});

export const collections = { articles, blog };
