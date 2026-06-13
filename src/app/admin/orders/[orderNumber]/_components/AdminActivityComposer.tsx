"use client";

import { useState } from "react";
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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, ADMIN_COMMENT_MAX_CHARS))}
          placeholder="Write a message to the client..."
          className="w-full bg-black/20 border border-white/10 rounded-xl p-3.5 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
          rows={3}
          disabled={isSending}
        />
        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
          <span className={`text-[10px] font-mono ${remaining < 200 ? "text-amber-400" : "text-slate-500"}`}>
            {remaining}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || isSending}
          className="px-4 py-2 bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs transition shadow-lg shadow-emerald-500/10"
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
