import { z } from "zod";

export const OrderStatusSchema = z.enum([
  "draft",
  "pending",
  "active",
  "completed",
  "overdue",
  "cancelled",
]);

export const OrderResponseSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  client_id: z.string(),
  status: OrderStatusSchema,
  paid: z.boolean(),
  total_price: z.string(),
  service_id: z.string(),
  academic_level_id: z.string(),
  deadline_id: z.string(),
  title: z.string(),
  instructions: z.string(),
  word_count: z.number(),
  page_count: z.string(),
  format_style: z.string(),
  sources: z.number(),
  line_spacing: z.string(),
  due_date: z.string().nullable().optional(),
  report_type: z.string().nullable().optional(),
  discount_amount: z.string().nullable().optional(),
});

export const OrderListResponseSchema = z.object({
  orders: z.array(OrderResponseSchema),
  total: z.number(),
  page: z.number(),
  per_page: z.number(),
  sort: z.string().nullable().optional(),
  order: z.string().nullable().optional(),
});

export const OrderListRequestSchema = z.object({
  status: z.string().nullable().optional(),
  q: z.string().nullable().optional(),
  sort: z.string().nullable().optional(),
  order: z.enum(["asc", "desc"]).nullable().optional(),
  page: z.number().int().min(1).optional(),
  per_page: z.number().int().min(1).max(100).optional(),
  service_id: z.string().nullable().optional(),
  academic_level_id: z.string().nullable().optional(),
});

export type ValidatedOrderListResponse = z.infer<typeof OrderListResponseSchema>;
export type ValidatedOrderListRequest = z.infer<typeof OrderListRequestSchema>;
