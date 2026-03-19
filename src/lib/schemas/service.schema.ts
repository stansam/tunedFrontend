import { z } from "zod";
import { TagSchema } from "./tag.schema";

// export const ServiceSchema = z.object({
//   id: z.string().min(1),
//   name: z.string().min(1),
//   description: z.string().min(1),
//   category_id: z.string().min(1),
//   featured: z.boolean(),
//   pricing_category_id: z.string().min(1),
//   slug: z.string().min(1),
//   is_active: z.boolean(),
//   tags: z.array(TagSchema),
// });
export const ServiceSchema = z.object({
  id:                  z.string().min(1, "Service id is required"),
  name:                z.string().min(1, "Service name is required"),
  description:         z.string().min(1, "Service description is required"),
  category_id:         z.string().min(1, "category_id is required"),
  featured:            z.boolean(),
  pricing_category_id: z.string().min(1, "pricing_category_id is required"),
  slug:                z.string().min(1, "Service slug is required"),
  is_active:           z.boolean(),
  tags:                z.array(TagSchema),
});

export const ServiceCategorySchema = z.object({
  id:                  z.string().min(1, "Service category id is required"),
  name:                z.string().min(1, "Service category name is required"),
  description:         z.string().min(1, "Service category description is required"),
  order:               z.number().int().positive("Order must be a positive integer"),
});

export const GetServicesResponseSchema = z.object({
  services: z.array(ServiceSchema),
});
