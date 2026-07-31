import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  type: 'content',
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
  }),
});

export const collections = { articles, blog };
