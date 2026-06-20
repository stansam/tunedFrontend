import { z } from "zod";

export const AdminOrderStatusSchema = z.enum([
  "draft",
  "pending",
  "active",
  "completed pending review",
  "completed",
  "overdue",
  "canceled",
  "revision",
]);

export const AdminOrderSchema = z.object({
  id: z.string().uuid(),
  order_number: z.string(),
  client_id: z.string().uuid(),
  client_name: z.string(),
  status: AdminOrderStatusSchema,
  paid: z.boolean(),
  total_price: z.string(),
  service_id: z.string().uuid(),
  service_name: z.string(),
  due_date: z.string().nullable(),
  escalated: z.boolean(),
});

export const AdminOrdersStatsSchema = z.object({
  all: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  in_progress: z.number().int().nonnegative(),
  revision: z.number().int().nonnegative(),
  completed: z.number().int().nonnegative(),
  overdue: z.number().int().nonnegative(),
});

export const BottleneckStatsSchema = z.object({
  pending_activation: z.number().int().nonnegative(),
  under_review: z.number().int().nonnegative(),
  awaiting_payment: z.number().int().nonnegative(),
});

export const ServiceLoadSchema = z.object({
  id: z.string(),
  name: z.string(),
  orders_count: z.number().int().nonnegative(),
  status: z.enum(["Busy", "OK", "Free"]),
});

export const AdminOrdersStatsResponseSchema = z.object({
  stats: AdminOrdersStatsSchema,
  bottlenecks: BottleneckStatsSchema,
  service_load: z.array(ServiceLoadSchema),
});

export const AdminOrdersListResponseSchema = z.object({
  orders: z.array(AdminOrderSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  per_page: z.number().int().min(1),
  sort: z.string().nullable(),
  order: z.string().nullable(),
});
