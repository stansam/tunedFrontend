import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import {
  AdminOrdersListResponseSchema,
  AdminOrdersStatsResponseSchema,
} from "../_schemas/orders.schema";
import type {
  AdminOrdersListResponse,
  AdminOrdersStatsResponse,
  AdminOrderFiltersState,
} from "../_types/orders.types";

export async function fetchAdminOrders(
  filters: AdminOrderFiltersState
): Promise<ApiResult<AdminOrdersListResponse>> {
  const reqPayload = {
    status: filters.status === "all" ? null : filters.status,
    q: filters.q || null,
    sort: filters.sort,
    order: filters.sortOrder,
    page: filters.page,
    per_page: 10,
    service_id: filters.service_id === "all" ? null : filters.service_id,
  };

  const res = await apiPost<AdminOrdersListResponse>("/admin/orders/list", reqPayload);
  if (!res.ok) return res;

  const parsed = AdminOrdersListResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: { message: "Validation error in orders list data", status: 422, errors: {} },
    };
  }
  return { ...res, data: parsed.data };
}

export async function fetchAdminOrdersStats(): Promise<ApiResult<AdminOrdersStatsResponse>> {
  const res = await apiGet<AdminOrdersStatsResponse>("/admin/orders/stats");
  if (!res.ok) return res;

  const parsed = AdminOrdersStatsResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return {
      ok: false,
      error: { message: "Validation error in stats response", status: 422, errors: {} },
    };
  }
  return { ...res, data: parsed.data };
}

export async function activateOrder(
  orderId: string
): Promise<ApiResult<{ readonly success: boolean; readonly message: string }>> {
  return apiPost<{ success: boolean; message: string }>(`/admin/orders/${orderId}/activate`, {});
}

export async function escalateOrder(
  orderId: string
): Promise<ApiResult<{ readonly success: boolean; readonly message: string }>> {
  return apiPost<{ success: boolean; message: string }>(`/admin/orders/${orderId}/escalate`, {});
}
