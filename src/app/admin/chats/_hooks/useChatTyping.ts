"use client";

import { useEffect, useRef, useState } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/constants/socket-events";

export function useChatTyping(chatId: string | null) {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const localIsTypingRef = useRef(false);

  useEffect(() => {
    const socket = webSocketService.getSocket();
    if (!socket || !chatId) return;

    const handleTyping = (data: { chat_id: string; user_id: string; username: string }) => {
      if (data.chat_id === chatId) {
        setIsTyping(true);
      }
    };

    const handleTypingStop = (data: { chat_id: string; user_id: string }) => {
      if (data.chat_id === chatId) {
        setIsTyping(false);
      }
    };

    socket.on(SOCKET_ON.CHAT_TYPING, handleTyping);
    socket.on(SOCKET_ON.CHAT_TYPING_STOP, handleTypingStop);

    return () => {
      socket.off(SOCKET_ON.CHAT_TYPING, handleTyping);
      socket.off(SOCKET_ON.CHAT_TYPING_STOP, handleTypingStop);
      setIsTyping(false);
    };
  }, [chatId]);

  const sendTypingStart = () => {
    const socket = webSocketService.getSocket();
    if (socket && chatId && !localIsTypingRef.current) {
      localIsTypingRef.current = true;
      socket.emit(SOCKET_EMIT.CHAT_TYPING, { chatId });
    }
  };

  const sendTypingStop = () => {
    const socket = webSocketService.getSocket();
    if (socket && chatId && localIsTypingRef.current) {
      localIsTypingRef.current = false;
      socket.emit(SOCKET_EMIT.CHAT_TYPING_STOP, { chatId });
    }
  };

  const onKeyDown = () => {
    if (!chatId) return;
    sendTypingStart();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStop();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return { isTyping, onKeyDown };
}
