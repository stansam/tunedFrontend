// import { 
//     ServiceResponseSchema, AcademicLevelResponseSchema,
// } from "./content.schema";
// import { PricingCategoryResponseSchema } from "./price.schema"; 

// export type QuoteOptionsResponseSchema = {
//     services: Record<string, ServiceResponseSchema[]>;
//     academic_levels: AcademicLevelResponseSchema[];
//     pricing_categories: PricingCategoryResponseSchema[];
// }

import { z } from "zod";

// ─── Domain Schemas ───────────────────────────────────────────────────────────

export const CategoryTabSchema = z.enum(["writing", "technical", "proofreading"]);

export const ServiceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: CategoryTabSchema,
  description: z.string().optional(),
});

export const LevelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
});

export const FeaturedServiceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  iconUrl: z.string().url().optional(),
  iconEmoji: z.string().optional(),
});

// ─── API Response Schemas ─────────────────────────────────────────────────────

export const FetchServicesResponseSchema = z.object({
  services: z.array(ServiceSchema),
});

export const FetchLevelsResponseSchema = z.object({
  levels: z.array(LevelSchema),
});

export const FetchFeaturedServicesResponseSchema = z.object({
  featured_services: z.array(FeaturedServiceSchema),
});

export const CalculatePriceResponseSchema = z.object({
  price: z.number().nonnegative(),
  currency: z.string().min(1),
  formatted: z.string().min(1),
});

// ─── Request Schemas ──────────────────────────────────────────────────────────

/** ISO-8601 UTC datetime regex */
const isoUtcDatetime = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/,
    "Must be a timezone-aware ISO 8601 datetime string ending in Z"
  );

export const CalculatePriceRequestSchema = z.object({
  service_id: z.string().min(1, "Service is required"),
  level_id: z.string().min(1, "Level is required"),
  deadline: isoUtcDatetime,
  page_count: z.number().int().min(1, "Page count must be at least 1"),
  word_count: z.number().int().positive(),
});

// ─── Form State Schema ────────────────────────────────────────────────────────

export const QuoteFormStateSchema = z.object({
  activeTab: CategoryTabSchema,
  serviceId: z.string().min(1).nullable(),
  levelId: z.string().min(1).nullable(),
  deadline: isoUtcDatetime.nullable(),
  pageCount: z.number().int().min(1),
});

// ─── Inferred Types (re-exported for convenience) ─────────────────────────────

export type ServiceSchema = z.infer<typeof ServiceSchema>;
export type LevelSchema = z.infer<typeof LevelSchema>;
export type FeaturedServiceSchema = z.infer<typeof FeaturedServiceSchema>;
export type CalculatePriceRequestSchema = z.infer<typeof CalculatePriceRequestSchema>;
export type CalculatePriceResponseSchema = z.infer<typeof CalculatePriceResponseSchema>;
