"use client";

import type { ChatWindowProps } from "../_props/chats.props";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatWindowMessages } from "./ChatWindowMessages";
import { ChatWindowInput } from "./ChatWindowInput";
import { ChatWindowWelcome } from "./ChatWindowWelcome";
import { useChatMessages } from "../_hooks/useChatMessages";
import { useChatTyping } from "../_hooks/useChatTyping";

export function ChatWindow({
  chat,
  agents,
  onBack,
  onSendMessage,
  onAssignAgent,
  onChangeStatus,
  onEditMessage,
  onDeleteMessage,
  onUploadAttachment,
}: ChatWindowProps) {
  const { data: messagesData, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(chat?.id || null);
  const { isTyping, onKeyDown } = useChatTyping(chat?.id || null);

  if (!chat) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col h-[calc(100vh-120px)] lg:h-full items-center justify-center">
        <ChatWindowWelcome />
      </div>
    );
  }

  const messages = messagesData?.pages.flatMap((page) => page.messages) || [];

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col gap-4 h-[calc(100vh-120px)] lg:h-full justify-between">
      <div className="flex flex-col gap-4 grow overflow-hidden">
        <ChatWindowHeader
          chat={chat}
          agents={agents}
          onBack={onBack}
          onAssignAgent={onAssignAgent}
          onChangeStatus={onChangeStatus}
        />
        <ChatWindowMessages
          messages={messages}
          activeChatId={chat.id}
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        {isTyping && (
          <div className="text-[10px] text-slate-400 italic px-2 animate-pulse">
            Client is typing...
          </div>
        )}
        <ChatWindowInput
          chat={chat}
          onSendMessage={onSendMessage}
          onUploadAttachment={onUploadAttachment}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
export default ChatWindow;
