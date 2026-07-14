"use client";

import React from "react";
import type { ClientChatSummary } from "../_types/client-chat.type";
import { MessageSquare } from "lucide-react";

interface ChatConversationItemProps {
  readonly chat: ClientChatSummary;
  readonly onClick: () => void;
}

export const ChatConversationItem = React.memo(function ChatConversationItem({ chat, onClick }: ChatConversationItemProps) {
  const timeStr = chat.last_message_at
    ? new Date(chat.last_message_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : new Date(chat.created_at).toLocaleDateString([], { month: "short", day: "numeric" });

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-3.5 rounded-xl flex items-start gap-3 transition-all text-left border border-slate-200/50 bg-white/60 hover:bg-white/95 active:scale-[0.99] group focus:outline-none focus:ring-2 focus:ring-slate-900"
    >
      <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
        <MessageSquare className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-xs font-bold text-slate-800 truncate group-hover:text-slate-950">
            {chat.subject || "Support Chat"}
          </span>
          <span className="text-[10px] text-slate-400 font-medium shrink-0">{timeStr}</span>
        </div>
        <p className="text-[11px] text-slate-500 truncate pr-4">
          {chat.last_message_preview || "No messages yet"}
        </p>
      </div>
      {chat.unread_count > 0 && (
        <span className="h-4.5 min-w-[18px] px-1 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center shrink-0 shadow-sm">
          {chat.unread_count}
        </span>
      )}
    </button>
  );
});
export default ChatConversationItem;
