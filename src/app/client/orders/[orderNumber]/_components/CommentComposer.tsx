"use client";

import { useState, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Mic, Paperclip, Smile, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { COMMENT_MAX_CHARS } from "../_fallback";
import type { CommentComposerProps } from "../_props";

function IconBtn({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <button type="button" disabled aria-label={label}
      className="text-slate-400 transition-colors hover:text-slate-500">
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function CommentComposer({ onSend, isSending }: CommentComposerProps) {
  const [content, setContent] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const isOverLimit = content.length > COMMENT_MAX_CHARS;

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || isSending || isOverLimit) return;
    await onSend(trimmed);
    setContent("");
    ref.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void handleSend(); }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <User className="h-4 w-4 shrink-0 text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">
          Need update or Clarification?
        </span>
      </div>

      <Textarea
        ref={ref}
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, COMMENT_MAX_CHARS + 50))}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="min-h-[100px] resize-none border-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Message — Enter to send, Shift+Enter for new line"
        disabled={isSending}
      />

      <div className="flex items-center justify-between px-4 pb-3 pt-1">
        <IconBtn Icon={Mic} label="Voice message (coming soon)" />
        <div className="flex items-center gap-3">
          <span className={cn("text-xs", isOverLimit ? "text-red-500" : "text-slate-400")}>
            up to {COMMENT_MAX_CHARS.toLocaleString()} Characters
          </span>
          <IconBtn Icon={Paperclip} label="Attach file (coming soon)" />
          <IconBtn Icon={Smile} label="Add emoji (coming soon)" />
          <Button size="icon" type="button"
            className="h-8 w-8 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => void handleSend()}
            disabled={!content.trim() || isOverLimit || isSending}
            aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
