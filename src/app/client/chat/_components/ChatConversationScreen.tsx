"use client";

import React, { useEffect } from "react";
import { useClientChatMessages } from "../_hooks/useClientChatMessages";
import { useClientChatActions } from "../_hooks/useClientChatActions";
import { useClientChatSocket } from "../_hooks/useClientChatSocket";
import { useChatTyping } from "@/app/admin/chats/_hooks/useChatTyping";
import { ChatWidgetSkeleton } from "../_skeletons/ChatWidgetSkeleton";
import { ChatScreenMessages } from "./ChatScreenMessages";
import { ChatScreenInput } from "./ChatScreenInput";

interface ChatConversationScreenProps {
  readonly chatId: string;
}

export function ChatConversationScreen({ chatId }: ChatConversationScreenProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useClientChatMessages(chatId);
  const { sendMessage, editMessage, deleteMessage, markAsRead, uploadAttachment } = useClientChatActions(chatId);
  const { isTyping, onKeyDown } = useChatTyping(chatId);

  useClientChatSocket(chatId);

  useEffect(() => {
    markAsRead().catch((err) => console.error(err));
  }, [chatId, markAsRead]);

  if (isLoading) return <ChatWidgetSkeleton />;

  const messages = data?.pages.flatMap((p) => p.messages) || [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden justify-between">
      <div className="grow overflow-hidden flex flex-col">
        <ChatScreenMessages
          messages={messages}
          onEditMessage={editMessage}
          onDeleteMessage={deleteMessage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
      <div className="shrink-0 flex flex-col gap-1 p-3 bg-white border-t border-slate-100">
        {isTyping && (
          <div className="text-[10px] text-slate-400 italic px-2 animate-pulse mb-1">
            Support agent is typing...
          </div>
        )}
        <ChatScreenInput
          onSendMessage={sendMessage}
          onUploadAttachment={uploadAttachment}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
export default ChatConversationScreen;
