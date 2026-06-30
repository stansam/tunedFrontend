"use client";

import { useState, useEffect } from "react";
import { useChatQueries } from "../_hooks/useChatQueries";
import { useChatActions } from "../_hooks/useChatActions";
import { useChatSocket } from "../_hooks/useChatSocket";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";
import { ChatSkeleton } from "./ChatSkeleton";
import { ChatErrorView } from "./ChatErrorView";
import type { ChatState } from "../_types/chats.type";

export function ChatContainer() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ChatState["filter"]>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const q = useChatQueries(activeChatId);
  const actions = useChatActions(activeChatId);
  useChatSocket(activeChatId);
  const { markAsRead } = q;

  useEffect(() => {
    if (activeChatId) {
      markAsRead();
    }
  }, [activeChatId, markAsRead]);

  if (q.isLoadingChats) return <ChatSkeleton />;
  if (!q.chats) return <ChatErrorView message="Failed to load chats." />;

  const filteredChats = q.chats.filter((chat) => {
    const matchesSearch =
      chat.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.subject || "").toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "unread") return matchesSearch && chat.unread_count > 0;
    if (filter === "active") return matchesSearch && chat.status === "active";
    if (filter === "closed") return matchesSearch && chat.status === "closed";
    return matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-0 lg:px-6 h-[calc(100vh-120px)] lg:h-[calc(100vh-150px)]">
      <div className={`${activeChatId ? "hidden lg:block" : "block"} lg:col-span-1 h-full`}>
        <ChatSidebar
          chats={filteredChats}
          activeChatId={activeChatId}
          filter={filter}
          searchQuery={searchQuery}
          onSelectChat={setActiveChatId}
          onSetFilter={setFilter}
          onSetSearch={setSearchQuery}
        />
      </div>
      <div className={`${activeChatId ? "block" : "hidden lg:block"} lg:col-span-3 h-full`}>
        <ChatWindow
          chat={q.activeChat}
          agents={q.agents}
          onBack={() => setActiveChatId(null)}
          onSendMessage={q.sendMessage}
          onAssignAgent={q.assignAgent}
          onChangeStatus={q.changeStatus}
          onEditMessage={actions.editMessage}
          onDeleteMessage={actions.deleteMessage}
          onUploadAttachment={actions.uploadAttachment}
        />
      </div>
    </div>
  );
}
export default ChatContainer;
