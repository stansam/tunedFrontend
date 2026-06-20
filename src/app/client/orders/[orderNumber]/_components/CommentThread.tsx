"use client";

import { useRef, useEffect } from "react";
import { CommentBubble } from "./CommentBubble";
import { formatCommentDay } from "../_utils";
import type { CommentThreadProps } from "../_props";

export function CommentThread({
  comments, currentUserId, onEdit, onDelete,
}: CommentThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  if (comments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <span className="text-xl">💬</span>
        </div>
        <p className="text-sm text-slate-500">No messages yet</p>
        <p className="text-xs text-slate-400">Send a comment to get started</p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[520px] flex-col gap-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 md:max-h-[620px]">
      {comments.map((cmt, i) => {
        const day = formatCommentDay(cmt.created_at);
        const prev = i > 0 ? comments[i - 1] : undefined;
        const prevDay = prev ? formatCommentDay(prev.created_at) : null;
        return (
          <CommentBubble
            key={cmt.id}
            comment={cmt}
            currentUserId={currentUserId}
            dayLabel={day !== prevDay ? day : undefined}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
