import { z } from "zod";
import { TagSchema } from "@/lib/schemas/tag.schema";
import { BlogCategorySchema } from "@/lib/schemas/blog.schema";

export const CommentReactionSchema = z.object({
  id: z.string().or(z.number()).transform((v) => String(v)),
  comment_id: z.string().or(z.number()).transform((v) => String(v)),
  reaction_type: z.enum(["like", "dislike"]),
  user_id: z
    .string()
    .or(z.number())
    .transform((v) => String(v))
    .nullable()
    .optional()
    .default(null),
  ip_address: z.string().nullable().optional().default(null),
});

export const BlogCommentSchema = z.object({
  id: z.string().or(z.number()).transform((v) => String(v)),
  post_id: z.string().or(z.number()).transform((v) => String(v)),
  content: z.string(),
  name: z.string().default(""),
  email: z.string().default(""),
  user_id: z
    .string()
    .or(z.number())
    .transform((v) => String(v))
    .nullable()
    .optional()
    .default(null),
  approved: z.boolean().default(false),
  reactions: z.array(CommentReactionSchema).default([]),
  total_likes: z.number().default(0),
  total_dislikes: z.number().default(0),
});

export const BlogPostSchema = z.object({
  id: z.string().or(z.number()).transform((v) => String(v)),
  title: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  category_id: z.string().or(z.number()).transform((v) => String(v)),
  slug: z.string().min(1),
  excerpt: z.string().default(""),
  featured_image: z.string().default(""),
  meta_description: z.string().default(""),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  published_at: z.string().default(""),
  comments: z.array(BlogCommentSchema).default([]),
  tags: z.array(TagSchema).default([]),
  category: BlogCategorySchema.nullable().optional(),
});

export const RelatedBlogsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string().or(z.number()).transform((v) => String(v)),
      title: z.string(),
      slug: z.string(),
      excerpt: z.string().default(""),
      author: z.string(),
      category_id: z.string().or(z.number()).transform((v) => String(v)),
      featured_image: z.string().nullable().default(null),
      is_featured: z.boolean().default(false),
      published_at: z.string().nullable().default(null),
      tags: z.array(TagSchema).default([]),
      category: BlogCategorySchema.nullable().optional(),
    })
  ),
});

export const CommentFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  content: z
    .string()
    .min(10, "Comment must be at least 10 characters")
    .max(2000, "Comment must not exceed 2000 characters"),
});

export type CommentFormValues = z.infer<typeof CommentFormSchema>;