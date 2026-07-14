"use client";

import { MessageSquare, X } from "lucide-react";
import { useChatWidget } from "../_hooks/useChatWidget";

export function ChatWidgetFAB() {
  const { isOpen, toggle, totalUnread } = useChatWidget();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? "Close support chat" : "Open support chat"}
      aria-expanded={isOpen}
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl hover:bg-slate-800 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 ${
        totalUnread > 0 && !isOpen ? "animate-pulse" : ""
      }`}
    >
      {isOpen ? (
        <X className="h-6 w-6 transition-transform duration-200 rotate-0 hover:rotate-90" />
      ) : (
        <div className="relative">
          <MessageSquare className="h-6 w-6" />
          {totalUnread > 0 && (
            <span className="absolute -top-2.5 -right-2.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-slate-900">
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
