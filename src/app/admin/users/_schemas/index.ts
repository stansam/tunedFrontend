import { z } from "zod";

export const CLVStatusSchema = z.enum(["high", "medium", "low", "normal"]);
export const UserStatusSchema = z.enum(["active", "dormant"]);

export const AdminUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string().nullable().optional(),
  orders_count: z.number().int().nonnegative(),
  total_spent: z.string(),
  clv_status: CLVStatusSchema,
  last_order_at: z.string().nullable().optional(),
  status: UserStatusSchema,
});

export const AdminUserListResponseSchema = z.object({
  users: z.array(AdminUserResponseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
});

export const AdminUserStatsResponseSchema = z.object({
  total_clients: z.number().int().nonnegative(),
  total_clients_growth_this_month: z.number().int(),
  returning_clients_percentage: z.number().min(0).max(100),
  returning_clients_growth_vs_last_month: z.number(),
  dormant_clients_count: z.number().int().nonnegative(),
  high_value_clients_count: z.number().int().nonnegative(),
  client_retention_rate: z.number().min(0).max(100),
});

export const GeographicDistributionSchema = z.object({
  country_code: z.string().min(2).max(3),
  country_name: z.string(),
  percentage: z.number().min(0).max(100),
});
export const GeographicDistributionListSchema = z.array(GeographicDistributionSchema);
export const AdminUserRegisteredSchema = z.object({
  user_id: z.string(),
  created_at: z.string(),
});

export type ValidatedAdminUserList = z.infer<typeof AdminUserListResponseSchema>;
export type ValidatedAdminUserStats = z.infer<typeof AdminUserStatsResponseSchema>;
