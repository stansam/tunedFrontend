"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AdminActivityComposerProps } from "../_props";
import { ADMIN_COMMENT_MAX_CHARS } from "../_fallbacks";

export function AdminActivityComposer({ onSend, isSending }: AdminActivityComposerProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSending) return;
    try {
      await onSend(content);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const remaining = ADMIN_COMMENT_MAX_CHARS - content.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, ADMIN_COMMENT_MAX_CHARS))}
          placeholder="Write a message to the client..."
          className="w-full min-h-[80px] bg-white/50 border border-slate-200 rounded-xl p-3.5 pr-12 text-sm text-slate-800 focus-visible:ring-emerald-600 placeholder-slate-400"
          rows={3}
          disabled={isSending}
        />
        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
          <span className={`text-[10px] font-mono ${remaining < 200 ? "text-amber-600" : "text-slate-400"}`}>
            {remaining}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!content.trim() || isSending}
          className="px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
        >
          {isSending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
