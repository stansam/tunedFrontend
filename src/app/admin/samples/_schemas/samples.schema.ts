import { z } from "zod";

export const AdminSampleTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export const AdminSampleServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const AdminSampleResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  service_id: z.string().nullable().optional(),
  word_count: z.number().int().nonnegative().optional().default(0),
  featured: z.boolean(),
  image: z.string().nullable().optional().default(""),
  tags: z.array(AdminSampleTagSchema).optional().default([]),
  service: AdminSampleServiceSchema.nullable().optional(),
  views_count: z.number().int().nonnegative().optional().default(0),
  downloads_count: z.number().int().nonnegative().optional().default(0),
});

export const AdminSampleMutationSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  service_id: z.string().nullable().optional(),
  excerpt: z.string().max(300).optional().default(""),
  word_count: z.number().int().nonnegative().optional().default(0),
  featured: z.boolean().optional().default(false),
  image: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
});

export const AdminSampleListResponseSchema = z.object({
  samples: z.array(AdminSampleResponseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
  sort: z.string().nullable().optional(),
  order: z.string().nullable().optional(),
});
