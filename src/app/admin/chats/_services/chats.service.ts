import { apiGet, apiPost, apiPatch } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { ChatRoomSchema, ChatMessageSchema, SupportAgentSchema, ChatMessagePageSchema } from "../_schemas/chats.schema";
import type { ChatRoom, ChatMessage, SupportAgent, ChatMessagePage } from "../_types/chats.type";
import { z } from "zod";

function logError(path: string, err: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[ChatService] ${path} validation failed:`, err);
  }
}

const PARSE_ERR: ApiResult<never> = {
  ok: false,
  error: { message: "Validation failed", errors: {}, status: 422 },
};

export async function fetchAdminChats(): Promise<ApiResult<ChatRoom[]>> {
  const res = await apiGet<unknown>("/chats/admin");
  if (!res.ok) return { ok: false, error: res.error };
  const p = z.array(ChatRoomSchema).safeParse(res.data);
  if (!p.success) { logError("/chats/admin", p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function fetchChatDetails(id: string): Promise<ApiResult<ChatRoom>> {
  const res = await apiGet<unknown>(`/chats/${id}`);
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatRoomSchema.safeParse(res.data);
  if (!p.success) { logError(`/chats/${id}`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function fetchChatMessages(
  id: string,
  before?: string | null,
  limit?: number
): Promise<ApiResult<ChatMessagePage>> {
  let url = `/chats/${id}/messages`;
  const params = new URLSearchParams();
  if (before) params.append("before", before);
  if (limit) params.append("limit", limit.toString());
  const queryStr = params.toString();
  if (queryStr) url += `?${queryStr}`;

  const res = await apiGet<unknown>(url);
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessagePageSchema.safeParse(res.data);
  if (!p.success) { logError(`/chats/${id}/messages?before=${before}`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function sendChatMessage(id: string, content: string): Promise<ApiResult<ChatMessage>> {
  const res = await apiPost<unknown>(`/chats/${id}/messages`, { content });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatMessageSchema.safeParse(res.data);
  if (!p.success) { logError(`/chats/${id}/messages`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function assignSupportAgent(id: string, adminId: string): Promise<ApiResult<ChatRoom>> {
  const res = await apiPatch<unknown>(`/chats/admin/${id}/assign`, { admin_id: adminId });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatRoomSchema.safeParse(res.data);
  if (!p.success) { logError(`/chats/admin/${id}/assign`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function changeChatStatus(id: string, status: "active" | "closed"): Promise<ApiResult<ChatRoom>> {
  const res = await apiPatch<unknown>(`/chats/admin/${id}/status`, { status });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ChatRoomSchema.safeParse(res.data);
  if (!p.success) { logError(`/chats/admin/${id}/status`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function markChatAsRead(id: string): Promise<ApiResult<{ marked_count: number }>> {
  const res = await apiPost<unknown>(`/chats/${id}/read`, {});
  if (!res.ok) return { ok: false, error: res.error };
  const p = z.object({ marked_count: z.number() }).safeParse(res.data);
  if (!p.success) { logError(`/chats/${id}/read`, p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function fetchSupportAgents(): Promise<ApiResult<SupportAgent[]>> {
  const res = await apiGet<unknown>("/chats/admin/agents");
  if (!res.ok) return { ok: false, error: res.error };
  const p = z.array(SupportAgentSchema).safeParse(res.data);
  if (!p.success) { logError("/chats/admin/agents", p.error.format()); return PARSE_ERR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}
