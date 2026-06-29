import { apiDelete, apiPatch, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { ChatMessageSchema } from "../_schemas/chats.schema";
import type { ChatMessage, ChatAttachment } from "../_types/chats.type";

export async function editChatMessage(
  chatId: string,
  messageId: string,
  content: string
): Promise<ApiResult<ChatMessage>> {
  const res = await apiPatch<unknown>(`/chats/${chatId}/messages/${messageId}`, { content });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessageSchema.safeParse(res.data);
  if (!p.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ChatActionsService] editChatMessage validation failed:", p.error.format());
    }
    return { ok: false, error: { message: "Validation failed", errors: {}, status: 422 } };
  }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function deleteChatMessage(
  chatId: string,
  messageId: string
): Promise<ApiResult<{ success: boolean }>> {
  return apiDelete<{ success: boolean }>(`/chats/${chatId}/messages/${messageId}`);
}

export async function uploadChatAttachment(
  chatId: string,
  file: File
): Promise<ApiResult<ChatAttachment>> {
  const formData = new FormData();
  formData.append("file", file);
  return apiPost<ChatAttachment>(`/chats/${chatId}/attachments`, formData);
}
