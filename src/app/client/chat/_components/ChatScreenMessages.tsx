"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/app/admin/chats/_types/chats.type";
import { Button } from "@/components/ui/button";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { useScrollControl } from "../_hooks/useScrollControl";
import type { ApiResult } from "@/lib/types";

interface ChatScreenMessagesProps {
  readonly messages: ChatMessage[];
  readonly onEditMessage: (id: string, content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onDeleteMessage: (id: string) => Promise<ApiResult<{ success: boolean }> | void>;
  readonly fetchNextPage: () => void;
  readonly hasNextPage: boolean;
  readonly isFetchingNextPage: boolean;
}

export function ChatScreenMessages({
  messages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ChatScreenMessagesProps) {
  const { scrollAreaRef, isAtBottom, handleScroll, scrollToBottom } = useScrollControl();
  const prevMsgLength = useRef(0);

  useEffect(() => {
    if (prevMsgLength.current === 0 && messages.length > 0) {
      scrollToBottom("auto");
    } else if (messages.length > prevMsgLength.current) {
      const lastMsg = messages[messages.length - 1];
      const fromSelf = !lastMsg?.is_admin;
      if (isAtBottom || fromSelf) {
        scrollToBottom("smooth");
      }
    }
    prevMsgLength.current = messages.length;
  }, [messages, isAtBottom, scrollToBottom]);

  return (
    <div
      className="grow overflow-y-auto px-4 py-2 scrollbar-thin"
      ref={scrollAreaRef}
      onScroll={handleScroll}
      role="log"
      aria-live="polite"
    >
      <div className="space-y-3.5 pb-2">
        {hasNextPage && (
          <div className="flex justify-center pt-1 pb-2">
            <Button
              size="xs"
              variant="outline"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="text-[9px] h-5.5 px-2 bg-slate-55 border-slate-200 text-slate-500"
            >
              {isFetchingNextPage ? "Loading..." : "Load older messages"}
            </Button>
          </div>
        )}
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-8">No messages yet. Say hello!</div>
        ) : (
          messages.map((m) => (
            <ChatMessageBubble key={m.id} m={m} />
          ))
        )}
      </div>
    </div>
  );
}
export default ChatScreenMessages;
