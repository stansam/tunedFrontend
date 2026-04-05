import { z } from "zod";
import { TagSchema } from "./tag.schema";

export const BlogPostSchema = z.object({
  id:               z.string().min(1, "Blog id is required"),
  title:            z.string().min(1, "Blog title is required"),
  content:          z.string().min(1, "Blog content is required"),
  author:           z.string().min(1, "Blog author is required"),
  category_id:      z.string().min(1, "category_id is required"),
  slug:             z.string().min(1, "Blog slug is required"),
  excerpt:          z.string().min(1, "Blog excerpt is required"),
  featured_image:   z.string().min(1, "featured_image is required"),
  meta_description: z.string().min(1, "meta_description is required"),
  is_published:     z.boolean(),
  is_featured:      z.boolean(),
  published_at:     z.string().min(1, "published_at is required"),
  tags:             z.array(TagSchema),
});

export const BlogCategorySchema = z.object({
  id: z.string().or(z.number()).transform(v => String(v)),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export const BlogListItemSchema = z.object({
  id: z.string().or(z.number()).transform(v => String(v)),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  author: z.string(),
  category_id: z.string().or(z.number()).transform(v => String(v)),
  featured_image: z.string().nullable(),
  is_featured: z.boolean().default(false),
  published_at: z.string().nullable(),
  tags: z.array(TagSchema).optional().default([]),
  category: BlogCategorySchema.nullable().optional(),
});

export const BlogPaginationSchema = z.object({
  page:        z.number(),
  per_page:    z.number(),
  total:       z.number(),
  total_pages: z.number(),
  has_next:    z.boolean(),
  has_prev:    z.boolean(),
});

export const BlogsPageResponseSchema = z.object({
  data:       z.array(BlogListItemSchema),
  pagination: BlogPaginationSchema,
});