import { z } from "zod";
import { ServiceSchema } from "./service.schema";
import { BlogPostSchema } from "./blog.schema";

export const TagSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    slug: z.string().min(1),
    usage_count: z.number().int().positive(),
});

export const LevelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  order: z.number().int().positive(),
});

export const DeadlineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  hours: z.number().int().positive(),
  order: z.number().int().positive(),
});

export const SampleSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().min(1),
    service_id: z.string().min(1),
    word_count: z.number().int().positive(),
    featured: z.boolean(),
    image: z.string().min(1),
    tags: z.array(TagSchema),
});


export const FeaturedContentResponseSchema = z.object({
    services: z.array(ServiceSchema),
    samples: z.array(SampleSchema),
    blogs: z.array(BlogPostSchema),
});

