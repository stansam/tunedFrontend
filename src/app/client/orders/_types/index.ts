export type OrderStatus =
  | "draft"
  | "pending"
  | "active"
  | "completed"
  | "overdue"
  | "cancelled";

export type FormatStyle = "apa" | "mla" | "chicago" | "harvard" | "other";
export type LineSpacing = "single" | "double" | "one_and_half";
export type SortField = "created_at" | "due_date" | "title";
export type SortOrder = "asc" | "desc";
export type StatusTab = "all" | "pending" | "completed" | "overdue";

export interface OrderResponseDTO {
  id: string;
  order_number: string;
  client_id: string;
  status: OrderStatus;
  paid: boolean;
  total_price: string;
  service_id: string;
  academic_level_id: string;
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
}

export interface OrderListResponseDTO {
  orders: OrderResponseDTO[];
  total: number;
  page: number;
  per_page: number;
  sort: string | null;
  order: string | null;
}

export interface OrderListRequestDTO {
  status?: string | null;
  q?: string | null;
  sort?: string | null;
  order?: SortOrder | null;
  page?: number;
  per_page?: number;
  service_id?: string | null;
  academic_level_id?: string | null;
}

export interface OrderFiltersState {
  status: StatusTab;
  q: string;
  sort: SortField;
  sortOrder: SortOrder;
  page: number;
}
