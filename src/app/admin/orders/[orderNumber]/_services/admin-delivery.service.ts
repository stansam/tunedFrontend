import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminDeliverySchema } from "../_schemas";
import type { AdminDeliveryDTO } from "../_types";

export async function fetchAdminDeliveries(
  orderId: string,
): Promise<ApiResult<AdminDeliveryDTO[]>> {
  const result = await apiGet<AdminDeliveryDTO[]>(
    `/deliveries/list/${encodeURIComponent(orderId)}`,
  );
  if (!result.ok) return result;

  const validated = (result.data || []).map((d) => {
    const parsed = AdminDeliverySchema.safeParse(d);
    return parsed.success ? parsed.data : d;
  });
  return { ...result, data: validated as AdminDeliveryDTO[] };
}

export async function submitAdminDelivery(
  orderId: string,
  formData: FormData,
): Promise<ApiResult<AdminDeliveryDTO>> {
  return apiPost<AdminDeliveryDTO>(
    `/deliveries/create/${encodeURIComponent(orderId)}`,
    formData,
  );
}

export async function updateAdminDeliveryStatus(
  deliveryId: string,
  status: string,
): Promise<ApiResult<AdminDeliveryDTO>> {
  return apiPatch<AdminDeliveryDTO>(
    `/deliveries/${encodeURIComponent(deliveryId)}/status`,
    { status },
  );
}

export async function markAdminClientNotified(
  deliveryId: string,
): Promise<ApiResult<AdminDeliveryDTO>> {
  return apiPatch<AdminDeliveryDTO>(
    `/deliveries/${encodeURIComponent(deliveryId)}/notified`,
    {},
  );
}

export async function deleteAdminDelivery(
  deliveryId: string,
): Promise<ApiResult<void>> {
  return apiDelete<void>(
    `/deliveries/${encodeURIComponent(deliveryId)}`,
  );
}
