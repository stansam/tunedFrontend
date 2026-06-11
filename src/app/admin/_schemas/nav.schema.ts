import { z } from "zod";

export const AdminNavStatsSchema = z.object({
  active_orders: z.number().int().nonnegative(),
  payments: z.number().int().nonnegative(),
  chats: z.number().int().nonnegative(),
  testimonials: z.number().int().nonnegative(),
});

export type AdminNavStats = z.infer<typeof AdminNavStatsSchema>;
