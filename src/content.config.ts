import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
    tech: z.array(z.string()),
    images: z.array(z.string()),
    imageAlt: z.string().optional(),
    demoUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    repoUrl2: z.url().optional(),
    repoLabel2: z.string().optional(),
  }),
});

export const collections = { projects };
