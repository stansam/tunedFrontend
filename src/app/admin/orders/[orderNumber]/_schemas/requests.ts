import { z } from "zod";
import { AdminOrderFileSchema } from "./order";

export const AdminOrderCommentSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  sender_id: z.string(),
  sender_name: z.string(),
  sender_role: z.string(),
  content: z.string(),
  created_at: z.string(),
  is_read: z.boolean(),
  attachments: z.array(AdminOrderFileSchema),
});

export const AdminDeliveryFileSchema = z.object({
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

export const AdminDeliverySchema = z.object({
  id: z.string(),
  order_id: z.string(),
  delivery_status: z.string(),
  status_color: z.string(),
  client_notified: z.boolean(),
  client_notified_at: z.string().nullable(),
  has_plagiarism_report: z.boolean(),
  delivery_files_count: z.number(),
  files: z.array(AdminDeliveryFileSchema),
  created_at: z.string(),
});

export const AdminRevisionRequestSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  delivery_id: z.string(),
  revision_notes: z.string(),
  internal_notes: z.string().nullable(),
  status: z.string(),
  status_color: z.string(),
  priority: z.string(),
  revision_count: z.number(),
  is_active: z.boolean(),
  requested_at: z.string(),
  reviewed_at: z.string().nullable(),
  resolved_at: z.string().nullable(),
  estimated_completion: z.string().nullable(),
  requester_name: z.string(),
  reviewer_name: z.string().nullable(),
});

export const AdminDeadlineExtensionSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  requested_hours: z.number(),
  reason: z.string(),
  client_notes: z.string().nullable(),
  status: z.string(),
  status_color: z.string(),
  priority: z.string(),
  original_due_date: z.string(),
  new_due_date: z.string().nullable(),
  hours_granted: z.number().nullable(),
  is_pending: z.boolean(),
  rejection_reason: z.string().nullable(),
  requested_at: z.string(),
  reviewed_at: z.string().nullable(),
  requester_name: z.string(),
  reviewer_name: z.string().nullable(),
});
