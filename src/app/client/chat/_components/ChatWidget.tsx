"use client";

import React, { Suspense, lazy } from "react";
import { ChatWidgetProvider } from "../_providers/ChatWidgetProvider";
import { ChatWidgetFAB } from "./ChatWidgetFAB";
import { ChatWidgetPanel } from "./ChatWidgetPanel";
import { ChatWidgetHeader } from "./ChatWidgetHeader";
import { ChatWidgetSkeleton } from "../_skeletons/ChatWidgetSkeleton";
import { useChatWidget } from "../_hooks/useChatWidget";

const ChatConversationList = lazy(() => import("./ChatConversationList"));
const ChatConversationScreen = lazy(() => import("./ChatConversationScreen"));

function ChatWidgetContent() {
  const { view, activeChatId } = useChatWidget();

  return (
    <>
      <ChatWidgetHeader title={view === "chat_screen" ? "Support Conversation" : "My Conversations"} />
      <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 rounded-b-2xl">
        <Suspense fallback={<ChatWidgetSkeleton />}>
          {view === "conversation_list" ? (
            <ChatConversationList />
          ) : (
            <ChatConversationScreen chatId={activeChatId!} />
          )}
        </Suspense>
      </div>
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
    </ChatWidgetProvider>
  );
}
export default ChatWidget;
