import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { ClientChatSummarySchema } from "../_schemas/client-chat.schema";
import type { ClientChatSummary } from "../_types/client-chat.type";
import { z } from "zod";

const PARSE_ERR: ApiResult<never> = {
  ok: false,
  error: { message: "Validation failed", errors: {}, status: 422 },
};

export async function fetchClientChats(): Promise<ApiResult<ClientChatSummary[]>> {
  const res = await apiGet<unknown>("/chats");
  if (!res.ok) return { ok: false, error: res.error };
  const p = z.array(ClientChatSummarySchema).safeParse(res.data);
  if (!p.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ClientChatService] fetchClientChats parse failed:", p.error.format());
    }
    return PARSE_ERR;
  }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function createClientChat(
  subject?: string,
  orderId?: string
): Promise<ApiResult<ClientChatSummary>> {
  const res = await apiPost<unknown>("/chats", {
    subject: subject || null,
    order_id: orderId || null,
  });
  if (!res.ok) return { ok: false, error: res.error };
  const p = ClientChatSummarySchema.safeParse(res.data);
  if (!p.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ClientChatService] createClientChat parse failed:", p.error.format());
    }
    return PARSE_ERR;
  }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}
