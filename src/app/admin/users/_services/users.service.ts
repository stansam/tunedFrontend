import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type {
  AdminUserListResponseDTO,
  AdminUserStatsResponseDTO,
  GeographicDistributionDTO,
  AdminUserListRequestDTO,
} from "../_types";
import {
  AdminUserListResponseSchema,
  AdminUserStatsResponseSchema,
  GeographicDistributionListSchema,
} from "../_schemas";
import {
  FALLBACK_STATS,
  FALLBACK_USERS,
  FALLBACK_GEOGRAPHY,
} from "../_fallbacks";

const isDev = process.env.NODE_ENV === "development";

export async function fetchAdminUsers(
  req: AdminUserListRequestDTO
): Promise<ApiResult<AdminUserListResponseDTO>> {
  const res = await apiPost<unknown>("/admin/users/list", req);
  if (!res.ok) {
    if (isDev) {
      return { ok: true, data: { users: FALLBACK_USERS, total: FALLBACK_USERS.length, page: req.page ?? 1, per_page: req.per_page ?? 5 }, status: 200, message: "Dev mock data loaded" };
    }
    return res;
  }
  const parsed = AdminUserListResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return isDev
      ? { ok: true, data: { users: FALLBACK_USERS, total: FALLBACK_USERS.length, page: req.page ?? 1, per_page: req.per_page ?? 5 }, status: 200, message: "Dev fallback on validation failure" }
      : { ok: false, error: { message: "Validation error", errors: {}, status: 422 } };
  }
  return { ...res, ok: true, data: parsed.data };
}

export async function fetchAdminUsersStats(): Promise<ApiResult<AdminUserStatsResponseDTO>> {
  const res = await apiGet<unknown>("/admin/users/stats");
  if (!res.ok) {
    if (isDev) return { ok: true, data: FALLBACK_STATS, status: 200, message: "Dev mock data loaded" };
    return res;
  }
  const parsed = AdminUserStatsResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return isDev
      ? { ok: true, data: FALLBACK_STATS, status: 200, message: "Dev fallback" }
      : { ok: false, error: { message: "Validation error", errors: {}, status: 422 } };
  }
  return { ...res, ok: true, data: parsed.data };
}

export async function fetchAdminUsersGeography(): Promise<ApiResult<readonly GeographicDistributionDTO[]>> {
  const res = await apiGet<unknown>("/admin/users/geography");
  if (!res.ok) {
    if (isDev) return { ok: true, data: FALLBACK_GEOGRAPHY, status: 200, message: "Dev mock data loaded" };
    return res;
  }
  const parsed = GeographicDistributionListSchema.safeParse(res.data);
  if (!parsed.success) {
    return isDev
      ? { ok: true, data: FALLBACK_GEOGRAPHY, status: 200, message: "Dev fallback" }
      : { ok: false, error: { message: "Validation error", errors: {}, status: 422 } };
  }
  return { ...res, ok: true, data: parsed.data };
}
export async function broadcastMessage(message: string): Promise<ApiResult<unknown>> {
  return apiPost<unknown>("/admin/users/broadcast", { message });
}
export async function messageUser(userId: string, message: string): Promise<ApiResult<unknown>> {
  return apiPost<unknown>(`/admin/users/${userId}/message`, { message });
}
