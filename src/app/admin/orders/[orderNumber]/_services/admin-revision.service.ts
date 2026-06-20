import { apiGet, apiPatch } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminRevisionRequestSchema } from "../_schemas";
import type { AdminRevisionRequestDTO } from "../_types";

export async function fetchRevisionRequests(
  orderId: string,
): Promise<ApiResult<AdminRevisionRequestDTO[]>> {
  const result = await apiGet<AdminRevisionRequestDTO[]>(
    `/admin/orders/${encodeURIComponent(orderId)}/revision-requests`,
  );
  if (!result.ok) return result;

  const validated = (result.data || []).map((x) => {
    const parsed = AdminRevisionRequestSchema.safeParse(x);
    return parsed.success ? parsed.data : x;
  });
  return { ...result, data: validated as AdminRevisionRequestDTO[] };
}

export async function updateRevisionStatus(
  orderId: string,
  requestId: string,
  dto: { status: string; internal_notes?: string | null },
): Promise<ApiResult<AdminRevisionRequestDTO>> {
  return apiPatch<AdminRevisionRequestDTO>(
    `/admin/orders/${encodeURIComponent(orderId)}/revision-requests/${encodeURIComponent(requestId)}/status`,
    dto,
  );
}
