export type AdminOrderStatus =
  | "draft"
  | "pending"
  | "active"
  | "completed"
  | "overdue"
  | "cancelled"
  | "revision";

export interface AdminOrder {
  readonly id: string;
  readonly order_number: string;
  readonly client_id: string;
  readonly client_name: string;
  readonly status: AdminOrderStatus;
  readonly paid: boolean;
  readonly total_price: string;
  readonly service_id: string;
  readonly service_name: string;
  readonly due_date: string | null;
  readonly writer_id: string | null;
  readonly writer_name: string | null;
  readonly escalated: boolean;
}

export interface AdminOrdersStats {
  readonly all: number;
  readonly pending: number;
  readonly in_progress: number;
  readonly revision: number;
  readonly completed: number;
  readonly overdue: number;
}

export interface BottleneckStats {
  readonly pending_assignment: number;
  readonly under_review: number;
  readonly awaiting_payment: number;
}

export interface WriterLoad {
  readonly id: string;
  readonly name: string;
  readonly avatar: string | null;
  readonly orders_count: number;
  readonly status: "Busy" | "OK" | "Free";
}

export interface AdminOrdersStatsResponse {
  readonly stats: AdminOrdersStats;
  readonly bottlenecks: BottleneckStats;
  readonly writer_load: readonly WriterLoad[];
}

export interface AdminOrdersListResponse {
  readonly orders: readonly AdminOrder[];
  readonly total: number;
  readonly page: number;
  readonly per_page: number;
  readonly sort: string | null;
  readonly order: string | null;
}

export interface AdminOrderFiltersState {
  readonly status: AdminOrderStatus | "all";
  readonly q: string;
  readonly sort: "created_at" | "due_date" | "title";
  readonly sortOrder: "asc" | "desc";
  readonly page: number;
  readonly service_id: string;
}
