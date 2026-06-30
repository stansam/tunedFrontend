import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type { ChatMessage, ChatMessagePage } from "@/app/admin/chats/_types/chats.type";
import { ChatMessageSchema, ChatMessagePageSchema } from "@/app/admin/chats/_schemas/chats.schema";

const PARSE_ERR: ApiResult<never> = {
  ok: false,
  error: { message: "Validation failed", errors: {}, status: 422 },
};

export async function fetchClientChatMessages(
  chatId: string,
  beforeId: string | null = null,
  limit: number = 50
): Promise<ApiResult<ChatMessagePage>> {
  const query = beforeId ? `?before=${beforeId}&limit=${limit}` : `?limit=${limit}`;
  const res = await apiGet<unknown>(`/chats/${chatId}/messages${query}`);
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessagePageSchema.safeParse(res.data);
  if (!p.success) return PARSE_ERR;
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function sendClientChatMessage(
  chatId: string,
  content: string
): Promise<ApiResult<ChatMessage>> {
  const res = await apiPost<unknown>(`/chats/${chatId}/messages`, { content });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessageSchema.safeParse(res.data);
  if (!p.success) return PARSE_ERR;
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function markClientChatAsRead(chatId: string): Promise<ApiResult<{ marked_count: number }>> {
  return apiPost<{ marked_count: number }>(`/chats/${chatId}/read`, {});
}

export async function editClientChatMessage(
  chatId: string,
  messageId: string,
  content: string
): Promise<ApiResult<ChatMessage>> {
  const res = await apiPatch<unknown>(`/chats/${chatId}/messages/${messageId}`, { content });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessageSchema.safeParse(res.data);
  if (!p.success) return PARSE_ERR;
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function deleteClientChatMessage(
  chatId: string,
  messageId: string
): Promise<ApiResult<{ success: boolean }>> {
  const res = await apiDelete<unknown>(`/chats/${chatId}/messages/${messageId}`);
  if (!res.ok) return { ok: false, error: res.error };
  return { ok: true, data: { success: true }, message: res.message, status: res.status };
}
