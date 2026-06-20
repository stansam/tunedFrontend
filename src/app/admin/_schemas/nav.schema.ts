import { z } from "zod";

export const AdminNavStatsSchema = z.object({
  active_orders_count: z.number().int().nonnegative(),
  payments_count: z.number().int().nonnegative(),
  chat_count: z.number().int().nonnegative(),
  testimonials_count: z.number().int().nonnegative(),
});

export type AdminNavStats = z.infer<typeof AdminNavStatsSchema>;
