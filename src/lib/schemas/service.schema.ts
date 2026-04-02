import { z } from "zod";
import { TagSchema } from "./tag.schema";
import { SampleListItemSchema } from "./samples.schema";
import { PricingCategorySchema } from "./price.schema";

export const ServiceSchema = z.object({
  id:                  z.string().min(1),
  name:                z.string().min(1),
  description:         z.string(),
  category_id:         z.string().min(1),
  featured:            z.boolean().default(false),
  pricing_category_id: z.string().or(z.number()).transform(v => String(v)),
  slug:                z.string().min(1),
  is_active:           z.boolean().default(true),
  tags:                z.array(TagSchema).optional().default([]),
});

export const ServiceCategorySchema = z.object({
  id:          z.string().min(1),
  name:        z.string().min(1),
  description: z.string().optional().default(""),
  order:       z.number().int().default(0),
  services:    z.array(ServiceSchema).optional(),
});

export const ServiceDetailsSchema = ServiceSchema.extend({
  // content:          z.string().min(1),
  // meta_description: z.string().nullable().optional(),
  // category_name:    z.string().optional(),
  pricing_category: PricingCategorySchema,
  category: ServiceCategorySchema,
});

export const RelatedContentResponseSchema = z.object({
  services: z.array(ServiceSchema),
  samples:  z.array(SampleListItemSchema),
});

export const AcademicLevelSchema = z.object({
  id:    z.string().min(1),
  name:  z.string().min(1),
  order: z.number().int().default(0),
});

export const GetServicesResponseSchema = z.object({
  services: z.array(ServiceSchema),
});
