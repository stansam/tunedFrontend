import { z } from "zod";
import { ServiceCategorySchema } from "./service.schema";
import { BlogPostSchema } from "./blog.schema";
import { TagSchema } from "./tag.schema";
// import { LevelSchema, DeadlineSchema } from "./common.schema";

export const SampleSchema = z.object({
  id:         z.string().min(1, "Sample id is required"),
  title:      z.string().min(1, "Sample title is required"),
  slug:       z.string().min(1, "Sample slug is required"),
  excerpt:    z.string().min(1, "Sample excerpt is required"),
  service_id: z.string().min(1, "Sample service_id is required"),
  word_count: z.number().int().positive("word_count must be a positive integer"),
  featured:   z.boolean(),
  image:      z.string().min(1, "Sample image is required"),
  tags:       z.array(TagSchema),
});

export const FeaturedContentResponseSchema = z.object({
  services: z.array(ServiceCategorySchema),
  samples:  z.array(SampleSchema),
  blogs:    z.array(BlogPostSchema),
});