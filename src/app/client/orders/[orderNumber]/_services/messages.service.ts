import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { OrderMessageDTO, SendMessageDTO } from "../_types";

export async function fetchOrderMessages(
  orderId: string,
): Promise<ApiResult<OrderMessageDTO[]>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[MessagesService] Fetching messages: orderId=${orderId}`);
  }
  return apiGet<OrderMessageDTO[]>(
    `/orders/${encodeURIComponent(orderId)}/messages`,
  );
}

export async function sendOrderMessage(
  dto: SendMessageDTO,
): Promise<ApiResult<OrderMessageDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[MessagesService] Sending message to order:", dto.order_id);
  }
  return apiPost<OrderMessageDTO>(
    `/orders/${encodeURIComponent(dto.order_id)}/messages`,
    { content: dto.content },
  );
}
