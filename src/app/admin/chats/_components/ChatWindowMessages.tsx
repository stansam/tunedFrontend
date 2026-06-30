"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Pencil, Trash, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { ChatWindowMessagesProps } from "../_props/chats.props";

export function ChatWindowMessages({
  messages,
  activeChatId,
  onEditMessage,
  onDeleteMessage,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ChatWindowMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastActiveChatId = useRef<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");

  useEffect(() => {
    if (lastActiveChatId.current !== activeChatId) {
      scrollRef.current?.scrollIntoView({ behavior: "auto" });
      lastActiveChatId.current = activeChatId;
    } else {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.is_admin) {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, activeChatId]);

  const handleSave = async (id: string) => {
    if (!editVal.trim()) return;
    try {
      await onEditMessage(id, editVal.trim());
      setEditingId(null);
    } catch {
      toast.error("Failed to edit message");
    }
  };

  return (
    <ScrollArea className="grow pr-1">
      <div className="space-y-4 py-2">
        {hasNextPage && (
          <div className="flex justify-center py-1">
            <Button
              size="sm"
              variant="ghost"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="text-[10px] h-6 px-3 border border-slate-200/50 text-slate-500 bg-white/30 hover:bg-white/50"
            >
              {isFetchingNextPage ? "Loading..." : "Load older messages"}
            </Button>
          </div>
        )}
        
        {messages.length === 0 ? (
          <div className="text-center text-xs text-slate-400 py-8">No messages in this chat yet.</div>
        ) : (
          messages.map((m) => {
            const isSelf = m.is_admin;
            const isEditing = editingId === m.id;
            return (
              <div key={m.id} className={`flex flex-col ${isSelf ? "items-end" : "items-start"} group`}>
                <div className={`relative max-w-[75%] rounded-2xl px-4 py-2.5 text-xs border shadow-xs leading-relaxed ${
                  isSelf ? "bg-slate-800 text-white border-slate-900 rounded-br-none" : "bg-white/60 text-slate-800 border-white/50 rounded-bl-none"
                }`}>
                  {m.is_deleted ? (
                    <p className="italic text-slate-400">This message was deleted</p>
                  ) : isEditing ? (
                    <div className="flex items-center gap-1 min-w-[200px]">
                      <Input value={editVal} onChange={(e) => setEditVal(e.target.value)} className="h-7 text-xs bg-slate-700 text-white border-slate-600 grow" />
                      <Button size="icon" variant="ghost" onClick={() => handleSave(m.id)} className="h-7 w-7 hover:bg-slate-700 text-green-400"><Check className="h-3 w-3" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="h-7 w-7 hover:bg-slate-700 text-red-400"><X className="h-3 w-3" /></Button>
                    </div>
                  ) : (
                    <>
                      <p className="wrap-break-word whitespace-pre-wrap">{m.content}</p>
                      {m.attachments?.map((att) => {
                        const isImg = /\.(jpg|jpeg|png|webp|gif)$/i.test(att.original_filename);
                        return (
                          <div key={att.id} className="mt-2 pt-2 border-t border-slate-200/20">
                            {isImg ? (
                              <a href={`/api/media/${att.id}`} target="_blank" rel="noopener noreferrer" className="block max-w-xs overflow-hidden rounded-md border border-slate-200 relative w-48 h-32">
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
                      {isSelf && (
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden group-hover:flex items-center gap-1 bg-white/80 backdrop-blur-xs border border-slate-200/50 rounded-lg p-0.5 shadow-xs">
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-500 hover:text-slate-800" onClick={() => { setEditingId(m.id); setEditVal(m.content || ""); }}><Pencil className="h-3 w-3" /></Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500 hover:text-red-700" onClick={() => onDeleteMessage(m.id).catch(() => toast.error("Failed to delete message"))}><Trash className="h-3 w-3" /></Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-semibold px-1 flex items-center gap-1">
                  {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {m.is_edited && !m.is_deleted && <span className="italic font-normal text-slate-400">(edited)</span>}
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
