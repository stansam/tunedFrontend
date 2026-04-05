import { z } from "zod";

export const TagSchema = z.object({
  id:          z.string().min(1, "Tag id is required"),
  name:        z.string().min(1, "Tag name is required"),
  description: z.string().nullable().optional(),
  slug:        z.string().min(1, "Tag slug is required"),
  usage_count: z.number().int().nonnegative("usage_count must be a non-negative integer"),
});
