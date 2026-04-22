import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import {
  KPIDataSchema,
  DashboardAnalyticsSchema,
  DashboardTrackingSchema,
  DashboardAlertsSchema,
} from "../_schemas/dashboard.schema";
import type {
  KPIData,
  DashboardAnalytics,
  DashboardTracking,
  DashboardAlerts,
} from "../_types/dashboard.types";

export async function fetchDashboardKPIs(): Promise<ApiResult<KPIData>> {
  const res = await apiGet<unknown>("/dashboard/kpis");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = KPIDataSchema.safeParse(res.data);
  if (!parsed.success) return { ok: false, error: { message: "Validation error", errors: {}, status: 500 } };
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchDashboardAnalytics(): Promise<ApiResult<DashboardAnalytics>> {
  const res = await apiGet<unknown>("/dashboard/analytics");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = DashboardAnalyticsSchema.safeParse(res.data);
  if (!parsed.success) return { ok: false, error: { message: "Validation error", errors: {}, status: 500 } };
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchDashboardTracking(): Promise<ApiResult<DashboardTracking>> {
  const res = await apiGet<unknown>("/dashboard/tracking");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = DashboardTrackingSchema.safeParse(res.data);
  if (!parsed.success) return { ok: false, error: { message: "Validation error", errors: {}, status: 500 } };
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchDashboardAlerts(): Promise<ApiResult<DashboardAlerts>> {
  const res = await apiGet<unknown>("/dashboard/alerts");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = DashboardAlertsSchema.safeParse(res.data);
  if (!parsed.success) return { ok: false, error: { message: "Validation error", errors: {}, status: 500 } };
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function requestReorder(orderId: string): Promise<ApiResult<{ redirect_url: string }>> {
  return await apiPost<{ redirect_url: string }>(`/orders/${orderId}/reorder`, {});
}
