import { cn } from "@/lib/utils";
import { formatDateTime } from "../_utils";
import type { CommentItemProps } from "../_props";

export function CommentItem({ comment, currentUserId, dayLabel }: CommentItemProps) {
  const isOwn = comment.sender_id === currentUserId;
  const initial = isOwn
    ? "Y"
    : (comment.sender_name?.charAt(0)?.toUpperCase() ?? "S");

  return (
    <div className="flex items-start gap-3">
      <div className="w-10 shrink-0 pt-0.5 text-right">
        {dayLabel && (
          <span className="text-xs font-medium leading-tight text-slate-400">
            {dayLabel}
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
          isOwn
            ? "bg-slate-200 text-slate-600"
            : "bg-emerald-100 text-emerald-700",
        )}
        aria-hidden
      >
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <span className="text-sm font-semibold leading-tight text-slate-700">
            {isOwn
              ? "You sent a comment"
              : `${comment.sender_name} Sent you a comment`}
          </span>
          <span className="shrink-0 pt-0.5 text-xs text-slate-400">
            {formatDateTime(comment.created_at)}
          </span>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
          {comment.content}
        </div>
      </div>
    </div>
  );
}
