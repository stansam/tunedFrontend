"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCommentItemProps } from "../_props/post.prop";

interface CommentItemWithHandlerProps extends BlogCommentItemProps {
  readonly onReact: (id: string, type: "like" | "dislike") => Promise<void>;
  readonly reactionOverride?: { likes: number; dislikes: number };
}

export function BlogCommentItem({
  comment,
  isAuthenticated,
  isBlurred,
  onReact,
  reactionOverride,
}: CommentItemWithHandlerProps) {
  const [reacting, setReacting] = useState<"like" | "dislike" | null>(null);

  const likes = reactionOverride?.likes ?? comment.total_likes;
  const dislikes = reactionOverride?.dislikes ?? comment.total_dislikes;
  const isPending = !comment.approved;

  const initials = (comment.name || "A")
    .split(" ")
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");

  const handleReact = async (type: "like" | "dislike") => {
    if (!isAuthenticated || reacting) return;
    setReacting(type);
    await onReact(comment.id, type);
    setReacting(null);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-100 bg-white p-4 transition-all",
        "shadow-[0_1px_4px_rgba(0,0,0,0.04)]",
        isBlurred && "blur-[5px] pointer-events-none select-none opacity-60",
        isPending && "border-dashed border-amber-200 bg-amber-50/30"
      )}
      aria-hidden={isBlurred}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            "text-white text-xs font-bold",
            "bg-linear-to-br from-emerald-400 to-teal-600"
          )}
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">
                {comment.name || "Anonymous"}
              </span>
              {isPending && (
                <span className={cn(
                  "inline-flex items-center gap-1 rounded-full",
                  "bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700"
                )}>
                  <Clock size={9} aria-hidden="true" />
                  Pending review
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed wrap-break-word">
            {comment.content}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => handleReact("like")}
              disabled={!isAuthenticated || reacting !== null}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                "border border-slate-100 bg-slate-50 text-slate-500",
                "hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-all",
                reacting === "like" && "animate-pulse"
              )}
              aria-label={`Like this comment (${likes} likes)`}
            >
              <ThumbsUp size={12} aria-hidden="true" />
              <span>{likes}</span>
            </button>
            <button
              onClick={() => handleReact("dislike")}
              disabled={!isAuthenticated || reacting !== null}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                "border border-slate-100 bg-slate-50 text-slate-500",
                "hover:border-red-200 hover:bg-red-50 hover:text-red-500",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-all",
                reacting === "dislike" && "animate-pulse"
              )}
              aria-label={`Dislike this comment (${dislikes} dislikes)`}
            >
              <ThumbsDown size={12} aria-hidden="true" />
              <span>{dislikes}</span>
            </button>
            {!isAuthenticated && (
              <span className="text-[11px] text-slate-300 italic">
                Sign in to react
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}