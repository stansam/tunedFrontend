"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatWindowMessagesProps } from "../_props/chats.props";

export function ChatWindowMessages({ chat }: ChatWindowMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.messages]);

  return (
    <ScrollArea className="grow pr-1">
      <div className="space-y-4 py-2">
        {chat.messages.length === 0 ? (
          <div className="text-center text-xs text-slate-400 py-8">
            No messages in this chat yet.
          </div>
        ) : (
          chat.messages.map((msg) => {
            const isSelf = msg.is_admin;
            return (
              <div key={msg.id} className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs border shadow-xs leading-relaxed ${
                    isSelf
                      ? "bg-slate-800 text-white border-slate-900 rounded-br-none"
                      : "bg-white/60 text-slate-800 border-white/50 rounded-bl-none"
                  }`}
                >
                  <p className="wrap-break-word">{msg.content}</p>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-semibold px-1">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}
export default ChatWindowMessages;
