import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminOrderCommentSchema } from "../_schemas";
import type { AdminOrderCommentDTO } from "../_types";

export async function fetchAdminOrderComments(
  orderId: string,
): Promise<ApiResult<AdminOrderCommentDTO[]>> {
  const result = await apiGet<AdminOrderCommentDTO[]>(
    `/orders/${encodeURIComponent(orderId)}/comments`,
  );
  if (!result.ok) return result;
  
  const validated = (result.data || []).map((c) => {
    const parsed = AdminOrderCommentSchema.safeParse(c);
    return parsed.success ? parsed.data : c;
  });
  return { ...result, data: validated as AdminOrderCommentDTO[] };
}

export async function sendAdminComment(
  orderId: string,
  content: string,
): Promise<ApiResult<AdminOrderCommentDTO>> {
  return apiPost<AdminOrderCommentDTO>(
    `/orders/${encodeURIComponent(orderId)}/comments`,
    { content, attachment_ids: [] },
  );
}

export async function updateAdminComment(
  orderId: string,
  commentId: string,
  content: string,
): Promise<ApiResult<AdminOrderCommentDTO>> {
  return apiPatch<AdminOrderCommentDTO>(
    `/orders/${encodeURIComponent(orderId)}/comments/${encodeURIComponent(commentId)}`,
    { content },
  );
}

export async function deleteAdminComment(
  orderId: string,
  commentId: string,
): Promise<ApiResult<void>> {
  return apiDelete<void>(
    `/orders/${encodeURIComponent(orderId)}/comments/${encodeURIComponent(commentId)}`,
  );
}
