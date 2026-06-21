import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishDate: z.string(),
    readingTime: z.number().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
