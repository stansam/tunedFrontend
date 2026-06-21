import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminDeliverySchema } from "../_schemas";
import type { AdminDeliveryDTO } from "../_types";

export async function fetchAdminDeliveries(
  orderId: string,
): Promise<ApiResult<AdminDeliveryDTO[]>> {
  const result = await apiGet<AdminDeliveryDTO[]>(
    `/orders/delivery/list/${encodeURIComponent(orderId)}`,
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
    `/orders/delivery/create/${encodeURIComponent(orderId)}`,
    formData,
  );
}

export async function updateAdminDeliveryStatus(
  deliveryId: string,
  status: string,
): Promise<ApiResult<AdminDeliveryDTO>> {
  return apiPatch<AdminDeliveryDTO>(
    `/orders/delivery/${encodeURIComponent(deliveryId)}/status`,
    { status },
  );
}

export async function markAdminClientNotified(
  deliveryId: string,
): Promise<ApiResult<AdminDeliveryDTO>> {
  return apiPatch<AdminDeliveryDTO>(
    `/orders/delivery/${encodeURIComponent(deliveryId)}/notified`,
    {},
  );
}

export async function deleteAdminDelivery(
  deliveryId: string,
): Promise<ApiResult<void>> {
  return apiDelete<void>(
    `/orders/delivery/${encodeURIComponent(deliveryId)}`,
  );
}
