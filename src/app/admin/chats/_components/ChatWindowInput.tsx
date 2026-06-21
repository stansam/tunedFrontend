"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { toast } from "sonner";
import type { ChatWindowInputProps } from "../_props/chats.props";

export function ChatWindowInput({ chat, onSendMessage }: ChatWindowInputProps) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || sending) return;
    try {
      setSending(true);
      await onSendMessage(content.trim());
      setContent("");
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleAttach = () => {
    toast.info("Attachment uploading is pending backend migration support.");
  };

  const isClosed = chat.status === "closed";

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-3 border-t border-slate-200/40">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleAttach}
        disabled={isClosed}
        className="h-9 w-9 text-slate-500 hover:text-slate-800"
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={isClosed ? "This chat is closed." : "Type your message..."}
        disabled={isClosed || sending}
        className="grow text-xs h-9 bg-white/50 border-slate-200"
      />
      <Button
        type="submit"
        size="icon"
        disabled={isClosed || sending || !content.trim()}
        className="h-9 w-9 bg-slate-800 hover:bg-slate-700 text-white shadow-xs shrink-0"
      >
        <Send className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
}
export default ChatWindowInput;
