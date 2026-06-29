import { z } from "zod";

export const AdminCategoryMutationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional().default(""),
  order: z.number().int().nonnegative().optional().default(0),
});

export const AdminServiceMutationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(1000, "Description is too long").optional().default(""),
  category_id: z.string().uuid("Invalid category selected"),
  pricing_category_id: z.string().uuid("Invalid pricing category selected"),
  featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and dashes")
    .optional(),
  tags: z.array(z.string()).optional().default([]),
});
