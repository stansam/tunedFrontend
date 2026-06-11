import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import {
  AdminKPIDataSchema,
  AdminDashboardAnalyticsSchema,
  AdminDashboardTrackingSchema,
  AdminDashboardAlertsSchema,
} from "../_schemas/dashboard.schema";
import type {
  AdminKPIData,
  AdminDashboardAnalytics,
  AdminDashboardTracking,
  AdminDashboardAlerts,
} from "../_types/dashboard.types";

function logParseError(endpoint: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[AdminDashboardService] ${endpoint} schema violation:`, error);
  }
}

const PARSE_ERROR: ApiResult<never> = {
  ok: false,
  error: { message: "Response validation failed", errors: {}, status: 422 },
};

export async function fetchAdminKPIs(): Promise<ApiResult<AdminKPIData>> {
  const res = await apiGet<unknown>("/admin/dashboard/kpis");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = AdminKPIDataSchema.safeParse(res.data);
  if (!parsed.success) { logParseError("/admin/dashboard/kpis", parsed.error.format()); return PARSE_ERROR; }
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchAdminAnalytics(): Promise<ApiResult<AdminDashboardAnalytics>> {
  const res = await apiGet<unknown>("/admin/dashboard/analytics");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = AdminDashboardAnalyticsSchema.safeParse(res.data);
  if (!parsed.success) { logParseError("/admin/dashboard/analytics", parsed.error.format()); return PARSE_ERROR; }
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchAdminTracking(): Promise<ApiResult<AdminDashboardTracking>> {
  const res = await apiGet<unknown>("/admin/dashboard/tracking");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = AdminDashboardTrackingSchema.safeParse(res.data);
  if (!parsed.success) { logParseError("/admin/dashboard/tracking", parsed.error.format()); return PARSE_ERROR; }
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}

export async function fetchAdminAlerts(): Promise<ApiResult<AdminDashboardAlerts>> {
  const res = await apiGet<unknown>("/admin/dashboard/alerts");
  if (!res.ok) return { ok: false, error: res.error };
  const parsed = AdminDashboardAlertsSchema.safeParse(res.data);
  if (!parsed.success) { logParseError("/admin/dashboard/alerts", parsed.error.format()); return PARSE_ERROR; }
  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}
