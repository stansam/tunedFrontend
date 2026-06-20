import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { OrderCommentDTO, SendCommentDTO } from "../_types";

export async function fetchOrderComments(
  orderId: string,
): Promise<ApiResult<OrderCommentDTO[]>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[CommentsService] Fetching comments: orderId=${orderId}`);
  }
  return apiGet<OrderCommentDTO[]>(
    `/orders/${encodeURIComponent(orderId)}/comments`,
  );
}

export async function sendOrderComment(
  dto: SendCommentDTO,
): Promise<ApiResult<OrderCommentDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[CommentsService] Sending comment to order:", dto.order_id);
  }
  return apiPost<OrderCommentDTO>(
    `/orders/${encodeURIComponent(dto.order_id)}/comments`,
    { content: dto.content, attachment_ids: dto.attachment_ids },
  );
}

export async function updateOrderComment(
  orderId: string,
  commentId: string,
  content: string,
): Promise<ApiResult<OrderCommentDTO>> {
  return apiPatch<OrderCommentDTO>(
    `/orders/${encodeURIComponent(orderId)}/comments/${encodeURIComponent(commentId)}`,
    { content },
  );
}

export async function deleteOrderComment(
  orderId: string,
  commentId: string,
): Promise<ApiResult<void>> {
  return apiDelete<void>(
    `/orders/${encodeURIComponent(orderId)}/comments/${encodeURIComponent(commentId)}`,
  );
}
