import { z } from "zod";
import { TagSchema } from "./content.schema";

export const BlogPostSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    author: z.string().min(1),
    category_id: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().min(1),
    featured_image: z.string().min(1),
    meta_description: z.string().min(1),
    is_published: z.boolean(),
    is_featured: z.boolean(),
    published_at: z.string().min(1),
    tags: z.array(TagSchema),
});

export const BlogCategorySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
});

export const BlogCommentSchema = z.object({
    id: z.string().min(1),
    post_id: z.string().min(1),
    content: z.string().min(1),
    name: z.string().min(1),
    email: z.string().min(1),
    user_id: z.string().min(1),
    approved: z.boolean(),
});

export const CommentReactionSchema = z.object({
    id: z.string().min(1),
    comment_id: z.string().min(1),
    reaction_type: z.string().min(1),
    user_id: z.string().min(1),
    ip_address: z.string().min(1),
});