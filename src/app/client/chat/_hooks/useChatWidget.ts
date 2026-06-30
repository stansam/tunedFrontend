"use client";

import { useChatWidgetContext } from "../_providers/ChatWidgetProvider";

export function useChatWidget() {
  return useChatWidgetContext();
}
