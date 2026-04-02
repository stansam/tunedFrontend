import { z } from "zod";
import { LevelSchema } from "./common.schema";
import { isoUtcDatetime } from "@/lib/utils"

export const CategoryTabSchema = z.enum(["writing", "technical", "proofreading"]);

export const ServiceWithPricingCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1), // Service category name
  pricing_category: CategoryTabSchema, // Pricing category name
});

export const GetQuoteOptionsResponseSchema = z.object({
  levels: z.array(LevelSchema),
  services: z.array(ServiceWithPricingCategorySchema),
});

export const QuoteFormStateSchema = z.object({
  activeTab: CategoryTabSchema,
  serviceId: z.string().min(1).nullable(),
  levelId: z.string().min(1).nullable(),
  deadline: isoUtcDatetime.nullable(),
  pageCount: z.number().int().min(1),
});


