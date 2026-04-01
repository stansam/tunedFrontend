import { z } from "zod";
import { TagSchema } from "./tag.schema";

export const SampleServiceSchema = z.object({
  id: z.string().or(z.number()).transform(v => String(v)),
  name: z.string(),
  slug: z.string(),
});

export const SampleListItemSchema = z.object({
  id: z.string().or(z.number()).transform(v => String(v)),
  title: z.string(),
  excerpt: z.string(),
  slug: z.string(),
  word_count: z.number(),
  featured: z.boolean(),
  image: z.string().nullable(),
  created_at: z.string().nullable(),
  service: SampleServiceSchema.nullable(),
  tags: z.array(TagSchema).optional().default([]),
});

export const PaginationSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total: z.number(),
  total_pages: z.number(),
  has_next: z.boolean(),
  has_prev: z.boolean(),
});

export const SamplesPageResponseSchema = z.object({
  data: z.array(SampleListItemSchema),
  pagination: PaginationSchema,
});
