import { z } from "zod";

export const AdminBlogCategoryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
});

export const AdminBlogCategoryMutationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional().default(""),
});

export const AdminTagResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const AdminCommentReactionResponseSchema = z.object({
  id: z.string(),
  comment_id: z.string(),
  reaction_type: z.string(),
  user_id: z.string().nullable().optional(),
  ip_address: z.string().nullable().optional(),
});

export const AdminBlogCommentResponseSchema = z.object({
  id: z.string(),
  post_id: z.string(),
  content: z.string(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  user_id: z.string().nullable().optional(),
  approved: z.boolean(),
  reactions: z.array(AdminCommentReactionResponseSchema).optional().default([]),
  total_likes: z.number().int().nonnegative().optional().default(0),
  total_dislikes: z.number().int().nonnegative().optional().default(0),
});

export const AdminBlogPostResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  category_id: z.string().nullable().optional(),
  slug: z.string(),
  excerpt: z.string(),
  featured_image: z.string(),
  meta_description: z.string(),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  published_at: z.string(),
  comments: z.array(AdminBlogCommentResponseSchema).optional().default([]),
  tags: z.array(AdminTagResponseSchema).optional().default([]),
});

export const AdminBlogPostMutationSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author name is required").max(100),
  category_id: z.string().min(1, "Please select a category"),
  excerpt: z.string().max(300).optional().default(""),
  featured_image_id: z.string().nullable().optional(),
  meta_description: z.string().max(200).optional().default(""),
  is_published: z.boolean().optional().default(false),
  is_featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
});

export const AdminBlogPostListResponseSchema = z.object({
  blogs: z.array(AdminBlogPostResponseSchema),
  total: z.number().int().nonnegative(),
  sort: z.string().optional(),
  order: z.string().optional(),
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
});

export const AdminBlogStatsSchema = z.object({
  total_posts: z.number().int().nonnegative(),
  published_posts: z.number().int().nonnegative(),
  draft_posts: z.number().int().nonnegative(),
  total_comments: z.number().int().nonnegative(),
  pending_comments: z.number().int().nonnegative(),
});
