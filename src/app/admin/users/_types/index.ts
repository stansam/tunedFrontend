export type CLVStatus = "high" | "medium" | "low" | "normal";
export type UserStatus = "active" | "dormant";
export type SortField = "name" | "orders_count" | "total_spent" | "last_order_at" | "created_at";
export type SortOrder = "asc" | "desc";
export type StatusFilter = "all" | "active" | "dormant";

export interface AdminUserResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar_url?: string | null;
  readonly orders_count: number;
  readonly total_spent: string;
  readonly clv_status: CLVStatus;
  readonly last_order_at?: string | null;
  readonly status: UserStatus;
}

export interface AdminUserListResponseDTO {
  readonly users: readonly AdminUserResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly per_page: number;
}

export interface AdminUserListRequestDTO {
  readonly q?: string | null;
  readonly status?: StatusFilter | null;
  readonly page?: number;
  readonly per_page?: number;
  readonly sort?: SortField;
  readonly order?: SortOrder;
}

export interface AdminUserStatsResponseDTO {
  readonly total_clients: number;
  readonly total_clients_growth_this_month: number;
  readonly returning_clients_percentage: number;
  readonly returning_clients_growth_vs_last_month: number;
  readonly dormant_clients_count: number;
  readonly high_value_clients_count: number;
  readonly client_retention_rate: number;
}

export interface GeographicDistributionDTO {
  readonly country_code: string;
  readonly country_name: string;
  readonly percentage: number;
}

export interface UserFiltersState {
  readonly q: string;
  readonly status: StatusFilter;
  readonly sort: SortField;
  readonly sortOrder: SortOrder;
  readonly page: number;
}
