"use client";

import React, { createContext, useContext, useState } from "react";
import type { WidgetView } from "../_types/widget.type";

interface ChatWidgetContextType {
  isOpen: boolean;
  view: WidgetView;
  activeChatId: string | null;
  totalUnread: number;
  open: () => void;
  close: () => void;
  toggle: () => void;
  openChat: (chatId: string) => void;
  backToList: () => void;
  setTotalUnread: (count: number) => void;
}

const ChatWidgetContext = createContext<ChatWidgetContextType | undefined>(undefined);

export function ChatWidgetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("chat:widget:open") === "true";
    }
    return false;
  });

  const [view, setView] = useState<WidgetView>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("chat:widget:activeChatId") ? "chat_screen" : "conversation_list";
    }
    return "conversation_list";
  });

  const [activeChatId, setActiveChatId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("chat:widget:activeChatId");
    }
    return null;
  });

  const [totalUnread, setTotalUnread] = useState(0);

  const open = () => {
    setIsOpen(true);
    sessionStorage.setItem("chat:widget:open", "true");
  };

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem("chat:widget:open", "false");
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  const openChat = (chatId: string) => {
    setActiveChatId(chatId);
    setView("chat_screen");
    sessionStorage.setItem("chat:widget:activeChatId", chatId);
    open();
  };

  const backToList = () => {
    setActiveChatId(null);
    setView("conversation_list");
    sessionStorage.removeItem("chat:widget:activeChatId");
  };

  return (
    <ChatWidgetContext.Provider
      value={{
        isOpen,
        view,
        activeChatId,
        totalUnread,
        open,
        close,
        toggle,
        openChat,
        backToList,
        setTotalUnread,
      }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidgetContext() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) {
    throw new Error("useChatWidgetContext must be used within ChatWidgetProvider");
  }
  return ctx;
}
