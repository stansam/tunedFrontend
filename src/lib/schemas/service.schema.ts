import { z } from "zod";
import { TagSchema } from "./content.schema";

export const ServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category_id: z.string().min(1),
  featured: z.boolean(),
  pricing_category_id: z.string().min(1),
  slug: z.string().min(1),
  is_active: z.boolean(),
  tags: z.array(TagSchema),
});

export const GetServicesResponseSchema = z.object({
  services: z.array(ServiceSchema),
});
