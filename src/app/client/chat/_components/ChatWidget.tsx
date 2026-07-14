"use client";

import { Suspense, lazy, useEffect } from "react";
import { ChatWidgetProvider, useChatWidgetContext } from "../_providers/ChatWidgetProvider";
import { ChatWidgetFAB } from "./ChatWidgetFAB";
import { ChatWidgetPanel } from "./ChatWidgetPanel";
import { ChatWidgetHeader } from "./ChatWidgetHeader";
import { ChatWidgetSkeleton } from "../_skeletons/ChatWidgetSkeleton";
import { useChatWidget } from "../_hooks/useChatWidget";
import { useClientChats } from "../_hooks/useClientChats";

import { TawkToWidget } from "./TawkToWidget";

const ChatConversationList = lazy(() => import("./ChatConversationList"));
const ChatConversationScreen = lazy(() => import("./ChatConversationScreen"));

function ChatWidgetContent() {
  const { view, activeChatId } = useChatWidget();
  const { chats } = useClientChats();
  const { setTotalUnread } = useChatWidgetContext();

  useEffect(() => {
    const total = chats.reduce((sum, c) => sum + c.unread_count, 0);
    setTotalUnread(total);
  }, [chats, setTotalUnread]);

  return (
    <>
      <Suspense fallback={<ChatWidgetSkeleton />}>
        <ChatWidgetHeader title={view === "chat_screen" ? "Support Conversation" : "My Conversations"} />
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 rounded-b-2xl">
          {view === "conversation_list" ? (
            <ChatConversationList />
          ) : (
            <ChatConversationScreen chatId={activeChatId!} />
          )}
        </div>
      </Suspense>
    </>
  );
}

export function ChatWidget() {
  return (
    <ChatWidgetProvider>
      <ChatWidgetPanel>
        <ChatWidgetContent />
      </ChatWidgetPanel>
      <ChatWidgetFAB />
      <TawkToWidget />
    </ChatWidgetProvider>
  );
}
export default ChatWidget;
