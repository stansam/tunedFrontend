import { z } from "zod";

const OrderStatusSchema = z.enum([
  "draft",
  "pending",
  "in_progress",
  "completed",
  "overdue",
  "cancelled",
]);

const OrderAttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.string(),
  size: z.number().optional(),
  type: z.string().optional(),
});

export const OrderDetailResponseSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  client_id: z.string(),
  status: OrderStatusSchema,
  paid: z.boolean(),
  total_price: z.string(),
  service_id: z.string(),
  service_name: z.string().nullable().optional(),
  academic_level_id: z.string(),
  academic_level_name: z.string().nullable().optional(),
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
  created_at: z.string(),
  client_username: z.string().nullable().optional(),
  attachments: z.array(OrderAttachmentSchema).optional(),
});

export const OrderCommentSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  sender_id: z.string(),
  sender_name: z.string(),
  sender_role: z.enum(["client", "support", "admin"]),
  content: z.string(),
  created_at: z.string(),
  is_read: z.boolean().optional(),
});
