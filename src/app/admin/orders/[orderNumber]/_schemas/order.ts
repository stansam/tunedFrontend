import { z } from "zod";

export const AdminOrderFileSchema = z.object({
  id: z.string(),
  filename: z.string(),
  url: z.string(),
  size: z.number(),
  type: z.string(),
  created_at: z.string(),
});

export const AdminOrderDetailSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  client_id: z.string(),
  client_username: z.string(),
  status: z.string(),
  paid: z.boolean(),
  escalated: z.boolean(),
  extension_requested: z.boolean(),
  total_price: z.string().nullable(),
  service_id: z.string(),
  service_name: z.string().nullable(),
  academic_level_id: z.string(),
  academic_level_name: z.string().nullable(),
  deadline_id: z.string(),
  title: z.string().nullable(),
  instructions: z.string().nullable(),
  word_count: z.number().nullable(),
  page_count: z.string().nullable(),
  format_style: z.string().nullable(),
  sources: z.number().nullable(),
  line_spacing: z.string().nullable(),
  due_date: z.string().nullable(),
  report_type: z.string().nullable(),
  discount_amount: z.string().nullable(),
  created_at: z.string(),
  attachments: z.array(AdminOrderFileSchema),
});
