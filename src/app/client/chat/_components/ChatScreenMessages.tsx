"use client";

import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "@/app/admin/chats/_types/chats.type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Paperclip } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMsgLength = useRef(0);

  useEffect(() => {
    if (messages.length > prevMsgLength.current) {
      const lastMsg = messages[messages.length - 1];
      if (!lastMsg?.is_admin || prevMsgLength.current === 0) {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      prevMsgLength.current = messages.length;
    }
  }, [messages]);

  return (
    <ScrollArea className="grow px-4 py-2">
      <div className="space-y-3.5">
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
          messages.map((m) => {
            const isSelf = !m.is_admin;
            return (
              <div key={m.id} className={`flex flex-col ${isSelf ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs border leading-relaxed ${
                    isSelf
                      ? "bg-slate-900 text-white border-slate-950 rounded-br-none"
                      : "bg-white text-slate-800 border-slate-200/60 rounded-bl-none"
                  }`}
                >
                  {m.is_deleted ? (
                    <p className="italic text-slate-400">This message was deleted</p>
                  ) : (
                    <>
                      <p className="wrap-break-word whitespace-pre-wrap">{m.content}</p>
                      {m.attachments?.map((att) => {
                        const isImg = /\.(jpg|jpeg|png|webp|gif)$/i.test(att.original_filename);
                        return (
                          <div key={att.id} className="mt-1.5 pt-1.5 border-t border-slate-100/10">
                            {isImg ? (
                              <a href={`/api/media/${att.id}`} target="_blank" rel="noopener noreferrer" className="block max-w-xs overflow-hidden rounded-md border border-slate-200 relative w-36 h-24">
                                <Image src={`/api/media/${att.id}`} alt={att.original_filename} fill className="object-contain" unoptimized />
                              </a>
                            ) : (
                              <a href={`/api/media/${att.id}`} download className="flex items-center gap-1 text-[10px] text-blue-400 hover:underline">
                                <Paperclip className="h-3 w-3" />
                                <span>{att.original_filename}</span>
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-0.5 px-1">
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
export default ChatScreenMessages;
