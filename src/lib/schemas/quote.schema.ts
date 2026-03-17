import { z } from "zod";
import { LevelSchema } from "./content.schema";
import { PricingCategorySchema } from "./price.schema";
import { isoUtcDatetime } from "@/lib/utils"

export const CategoryTabSchema = z.enum(["writing", "technical", "proofreading"]);

export const ServiceWithPricingCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1), // Service category name
  pricing_category: CategoryTabSchema, // Pricing category name
});

export const GetQuoteOptionsResponseSchema = z.object({
  services: z.array(ServiceWithPricingCategorySchema),
  academic_levels: z.array(LevelSchema),
  pricing_categories: z.array(PricingCategorySchema),
});

export const QuoteFormStateSchema = z.object({
  activeTab: CategoryTabSchema,
  serviceId: z.string().min(1).nullable(),
  levelId: z.string().min(1).nullable(),
  deadline: isoUtcDatetime.nullable(),
  pageCount: z.number().int().min(1),
});


