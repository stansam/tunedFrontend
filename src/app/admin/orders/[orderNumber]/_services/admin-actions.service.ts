import { apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";

export async function activateOrder(
  orderId: string,
): Promise<ApiResult<{ success: boolean; message: string }>> {
  return apiPost<{ success: boolean; message: string }>(
    `/admin/orders/${encodeURIComponent(orderId)}/activate`,
    {},
  );
}

export async function escalateOrder(
  orderId: string,
): Promise<ApiResult<{ success: boolean; message: string }>> {
  return apiPost<{ success: boolean; message: string }>(
    `/admin/orders/${encodeURIComponent(orderId)}/escalate`,
    {},
  );
}
