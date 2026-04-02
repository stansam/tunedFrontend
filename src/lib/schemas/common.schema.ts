import { z } from "zod";

export const LevelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  order: z.number().int().positive(),
});

export const DeadlineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  hours: z.number().int().positive(),
  order: z.number().int().positive(),
});
