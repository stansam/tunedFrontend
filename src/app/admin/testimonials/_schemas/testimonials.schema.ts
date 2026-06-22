import { z } from "zod";

export const AdminTestimonialUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string().nullable().optional(),
});

export const AdminTestimonialServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const AdminTestimonialResponseSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable().optional(),
  service_id: z.string().nullable().optional(),
  order_id: z.string().nullable().optional(),
  order_number: z.string().nullable().optional(),
  content: z.string(),
  rating: z.number().int().min(1).max(5),
  is_approved: z.boolean(),
  created_at: z.string().nullable().optional(),
  user: AdminTestimonialUserSchema.nullable().optional(),
  service: AdminTestimonialServiceSchema.nullable().optional(),
});

export const AdminTestimonialMutationSchema = z.object({
  content: z.string().min(1, "Content is required"),
  rating: z.number().int().min(1).max(5),
  is_approved: z.boolean().optional().default(false),
});

export const AdminTestimonialListResponseSchema = z.object({
  testimonials: z.array(AdminTestimonialResponseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
  sort: z.string().nullable().optional(),
  order: z.string().nullable().optional(),
});
