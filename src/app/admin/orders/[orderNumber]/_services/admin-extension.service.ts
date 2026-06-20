import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminDeadlineExtensionSchema } from "../_schemas";
import type { AdminDeadlineExtensionDTO } from "../_types";

export async function fetchDeadlineExtensions(
  orderId: string,
): Promise<ApiResult<AdminDeadlineExtensionDTO[]>> {
  const result = await apiGet<AdminDeadlineExtensionDTO[]>(
    `/admin/orders/${encodeURIComponent(orderId)}/deadline-extensions`,
  );
  if (!result.ok) return result;

  const validated = (result.data || []).map((x) => {
    const parsed = AdminDeadlineExtensionSchema.safeParse(x);
    return parsed.success ? parsed.data : x;
  });
  return { ...result, data: validated as AdminDeadlineExtensionDTO[] };
}

export async function requestDeadlineExtension(
  orderId: string,
  dto: { requested_hours: number; reason: string; priority?: string },
): Promise<ApiResult<AdminDeadlineExtensionDTO>> {
  return apiPost<AdminDeadlineExtensionDTO>(
    `/admin/orders/${encodeURIComponent(orderId)}/deadline-extensions`,
    dto,
  );
}
