import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { OrderDeliveryResponseDTO } from "../_types";

export async function fetchOrderDeliveries(
  orderId: string,
): Promise<ApiResult<OrderDeliveryResponseDTO[]>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[DeliveriesService] Fetching deliveries: orderId=${orderId}`);
  }
  return apiGet<OrderDeliveryResponseDTO[]>(
    `/orders/delivery/list/${encodeURIComponent(orderId)}`,
  );
}

export async function approveDelivery(
  orderId: string,
  deliveryId: string,
): Promise<ApiResult<OrderDeliveryResponseDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[DeliveriesService] Approving delivery: ${deliveryId}`);
  }
  return apiPost<OrderDeliveryResponseDTO>(
    `/orders/delivery/${encodeURIComponent(orderId)}/${encodeURIComponent(deliveryId)}/approve`,
    {},
  );
}

export async function requestDeliveryRevision(
  orderId: string,
  deliveryId: string,
): Promise<ApiResult<OrderDeliveryResponseDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[DeliveriesService] Requesting revision: ${deliveryId}`);
  }
  return apiPost<OrderDeliveryResponseDTO>(
    `/orders/delivery/${encodeURIComponent(orderId)}/${encodeURIComponent(deliveryId)}/revision`,
    {},
  );
}
