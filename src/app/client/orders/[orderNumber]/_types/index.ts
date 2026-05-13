import type { OrderStatus } from "../../_types";

export type { OrderStatus };
export type OrderTab = "details" | "activity" | "delivery";
export type TrackingStepStatus = "completed" | "active" | "pending";

export interface OrderAttachmentDTO {
  id: string;
  name: string;
  url: string;
  size?: number;
  mime_type?: string;
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

export interface OrderMessageDTO {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: "client" | "support" | "admin";
  content: string;
  created_at: string;
  is_read?: boolean;
}

export interface SendMessageDTO {
  order_id: string;
  content: string;
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
