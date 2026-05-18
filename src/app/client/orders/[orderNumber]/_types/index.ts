import type { OrderStatus } from "../../_types";

export type { OrderStatus };
export type OrderTab = "details" | "activity" | "delivery";
export type TrackingStepStatus = "completed" | "active" | "pending";

export interface OrderAttachmentDTO {
  id: string;
  filename: string;
  url: string;
  size?: number;
  type?: string;
}

export interface OrderDetailResponseDTO {
  id: string;
  order_number: string;
  client_id: string;
  status: OrderStatus;
  paid: boolean;
  total_price: string;
  service_id: string;
  service_name?: string | null;
  academic_level_id: string;
  academic_level_name?: string | null;
  deadline_id: string;
  title: string;
  instructions: string;
  word_count: number;
  page_count: string;
  format_style: string;
  sources: number;
  line_spacing: string;
  due_date: string | null;
  report_type: string | null;
  discount_amount: string | null;
  created_at: string;
  client_username?: string | null;
  attachments?: OrderAttachmentDTO[];
}

export interface CommentAttachmentDTO {
  id: string;
  filename: string;
  url: string;
  size?: number;
  type?: string;
}

export interface OrderCommentDTO {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: "client" | "support" | "admin";
  content: string;
  created_at: string;
  is_read?: boolean;
  attachments?: CommentAttachmentDTO[];
}

export interface SendCommentDTO {
  order_id: string;
  content: string;
  attachment_ids?: string[];
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
}

export interface TrackingStep {
  label: string;
  status: TrackingStepStatus;
}

export interface PendingAttachment {
  localId: string;
  file: File;
  previewUrl?: string;
  uploadedId?: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
}

export type CommentEditState = {
  commentId: string;
  content: string;
} | null;

export type DeliveryStatus = "delivered" | "revised" | "redelivered";

export interface OrderDeliveryFileResponseDTO {
  id: string;
  delivery_id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_type: string;
  file_format: string;
  description: string | null;
  file_size: number;
  is_plagiarism_report: boolean;
  file_icon: string;
  created_at: string;
}

export interface OrderDeliveryResponseDTO {
  id: string;
  order_id: string;
  delivery_status: DeliveryStatus;
  status_color: string;
  client_notified: boolean;
  client_notified_at: string | null;
  has_plagiarism_report: boolean;
  delivery_files_count: number;
  files: OrderDeliveryFileResponseDTO[];
  created_at: string;
}