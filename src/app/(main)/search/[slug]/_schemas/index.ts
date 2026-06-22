import { z } from "zod";

export const SearchParamsSchema = z.object({
  type: z.enum(['all', 'service', 'sample', 'blog', 'faq', 'tag']).default('all'),
  page: z.coerce.number().int().positive().default(1),
  per_page: z.coerce.number().int().min(1).max(100).default(20),
});

export const SearchParamsInputSchema = z.object({
  slug: z.string().min(1),
});
