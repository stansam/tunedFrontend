import type { AdminOrderFileDTO } from "./base";

export interface AdminOrderDetailDTO {
  id: string;
  order_number: string;
  client_id: string;
  client_username: string;
  status: string;
  paid: boolean;
  escalated: boolean;
  extension_requested: boolean;
  total_price: string | null;
  service_id: string;
  service_name: string | null;
  academic_level_id: string;
  academic_level_name: string | null;
  deadline_id: string;
  title: string | null;
  instructions: string | null;
  word_count: number | null;
  page_count: string | null;
  format_style: string | null;
  sources: number | null;
  line_spacing: string | null;
  due_date: string | null;
  report_type: string | null;
  discount_amount: string | null;
  created_at: string;
  attachments: AdminOrderFileDTO[];
}
