import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";

export interface TawkToConfig {
  hash: string;
  property_id: string;
  widget_id: string;
  user_id: string;
}

export async function fetchTawkToHash(): Promise<ApiResult<TawkToConfig>> {
  return apiGet<TawkToConfig>("/chats/tawkto-hash");
}
