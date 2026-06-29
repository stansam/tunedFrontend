import { z } from "zod";

const OrderStatusSchema = z.enum([
  "draft",
  "pending",
  "active",
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

export const CommentAttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.string(),
  size: z.number().optional(),
  type: z.string().optional(),
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
  attachments: z.array(CommentAttachmentSchema).optional(),
});

export const OrderDeliveryFileSchema = z.object({
  id: z.string(),
  delivery_id: z.string(),
  filename: z.string(),
  original_filename: z.string(),
  file_path: z.string(),
  file_type: z.string(),
  file_format: z.string(),
  description: z.string().nullable(),
  file_size: z.number(),
  is_plagiarism_report: z.boolean(),
  file_icon: z.string(),
  created_at: z.string(),
});

export const OrderDeliverySchema = z.object({
  id: z.string(),
  order_id: z.string(),
  delivery_status: z.enum(["delivered", "revised", "redelivered"]),
  status_color: z.string(),
  client_notified: z.boolean(),
  client_notified_at: z.string().nullable(),
  has_plagiarism_report: z.boolean(),
  delivery_files_count: z.number(),
  files: z.array(OrderDeliveryFileSchema),
  created_at: z.string(),
});