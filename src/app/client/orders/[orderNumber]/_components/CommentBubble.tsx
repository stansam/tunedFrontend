"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "../_utils";
import { CommentBubbleMenu } from "./CommentBubbleMenu";
import { CommentAttachmentBadge } from "./CommentAttachmentBadge";
import type { CommentBubbleProps } from "../_props";

export function CommentBubble({ comment, currentUserId, dayLabel, onEdit, onDelete }: CommentBubbleProps) {
  const isOwn = comment.sender_id === currentUserId;
  const isAdmin = comment.sender_role === "admin" || comment.sender_role === "support";
  const [showMeta, setShowMeta] = useState(false);

  const avatarText = isAdmin ? "T" : (comment.sender_name?.charAt(0)?.toUpperCase() ?? "?");
  const avatarClass = isAdmin
    ? "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white ring-2 ring-emerald-300"
    : isOwn
    ? "bg-slate-200 text-slate-600"
    : "bg-slate-300 text-slate-700";

  return (
    <div className={cn("flex flex-col gap-0.5", isOwn ? "items-end" : "items-start")}>
      {dayLabel && (
        <div className="mx-auto my-2 rounded-full bg-slate-100 px-3 py-0.5 text-xs text-slate-400">
          {dayLabel}
        </div>
      )}
      <div className={cn("flex items-end gap-2 max-w-[85%] md:max-w-[70%]", isOwn && "flex-row-reverse")}>
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold", avatarClass)}>
          {avatarText}
        </div>
        <div
          className="group relative flex flex-col gap-1"
          onMouseEnter={() => setShowMeta(true)}
          onMouseLeave={() => setShowMeta(false)}
        >
          {!isOwn && (
            <span className={cn("text-[10px] font-semibold", isAdmin ? "text-emerald-700" : "text-slate-500")}>
              {isAdmin ? "TunedOps" : comment.sender_name}
            </span>
          )}
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
              isAdmin
                ? "border-l-2 border-emerald-500 bg-linear-to-br from-slate-800 to-slate-700 text-white"
                : isOwn
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-800",
            )}
          >
            <p className="whitespace-pre-wrap wrap-break-word">{comment.content}</p>
            {comment.attachments?.map((a) => <CommentAttachmentBadge key={a.id} attachment={a} />)}
          </div>
          <div className={cn("flex items-center gap-1", isOwn ? "justify-end" : "justify-start")}>
            <span className={cn("text-[10px] transition-opacity", showMeta ? "text-slate-400 opacity-100" : "opacity-0")}>
              {formatDateTime(comment.created_at)}
            </span>
            {isOwn && (
              <CommentBubbleMenu
                onEdit={() => onEdit(comment.id, comment.content)}
                onDelete={() => onDelete(comment.id)}
                visible={showMeta}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
