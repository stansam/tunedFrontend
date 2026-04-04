"use client";

import { MessageSquare, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComments } from "../_hooks/useComments";
import { CommentsAuthGate } from "./CommentsAuthGate";
import { BlogCommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import type { BlogCommentsPanelProps } from "../_props/post.prop";
import type { BlogComment } from "../_types/post.type";

const UNAUTHENTICATED_PREVIEW_COUNT = 2;

export function BlogCommentsPanel({
  postId,
  postSlug,
  comments: initialComments,
  isAuthenticated,
  currentUser,
}: BlogCommentsPanelProps) {
  const {
    visibleComments,
    totalCount,
    hasMore,
    isSubmitting,
    loadMore,
    handleSubmit,
    handleReaction,
    reactionCounts,
  } = useComments({ postSlug, initialComments });

  return (
    <aside
      aria-label="Blog comments"
      className="flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            "bg-emerald-50 border border-emerald-200"
          )}
          aria-hidden="true"
        >
          <MessageSquare size={16} className="text-emerald-600" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800">
            {totalCount > 0
              ? `${totalCount} Comment${totalCount === 1 ? "" : "s"}`
              : "Comments"}
          </h2>
          {totalCount === 0 && (
            <p className="text-xs text-slate-400">Be the first to comment</p>
          )}
        </div>
      </div>

      {!isAuthenticated && (
        <>
          {totalCount === 0 ? (
            <div className={cn(
              "rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center"
            )}>
              <MessageSquare size={32} className="mx-auto mb-3 text-slate-200" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-500 mb-1">No comments yet</p>
              <p className="text-xs text-slate-400">Sign in to be the first</p>
            </div>
          ) : (
            <CommentsAuthGate
              visibleCount={UNAUTHENTICATED_PREVIEW_COUNT}
              totalCount={totalCount}
            />
          )}
        </>
      )}

      {isAuthenticated && (
        <>
          {totalCount === 0 ? (
            <div className={cn(
              "rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center"
            )}>
              <MessageSquare size={32} className="mx-auto mb-3 text-slate-200" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-500">No comments yet</p>
              <p className="text-xs text-slate-400 mt-1">Share your thoughts below</p>
            </div>
          ) : (
            <div
              className="space-y-3"
              aria-live="polite"
              aria-label={`${totalCount} comments`}
            >
              {visibleComments.map((comment) => (
                <BlogCommentItem
                  key={comment.id}
                  comment={comment}
                  isAuthenticated={isAuthenticated}
                  isBlurred={false}
                  onReact={handleReaction}
                  reactionOverride={reactionCounts[comment.id]}
                />
              ))}

              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={isSubmitting}
                  className={cn(
                    "flex w-full items-center justify-center gap-2",
                    "rounded-xl border border-slate-200 bg-white py-3",
                    "text-sm font-medium text-slate-500",
                    "hover:border-emerald-300 hover:text-emerald-600",
                    "transition-all shadow-sm"
                  )}
                  aria-label="Load more comments"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <ChevronDown size={16} aria-hidden="true" />
                  )}
                  Load more comments
                </button>
              )}
            </div>
          )}

          <div className="mt-2">
            <CommentForm
              postSlug={postSlug}
              onSuccess={(comment: BlogComment) => {
                // This callback can be used for analytics, etc.
              }}
            />
          </div>
        </>
      )}

      {!isAuthenticated && (
        <div className="relative">
          <div aria-hidden="true" className={cn(
            "pointer-events-none select-none opacity-40 blur-[3px]"
          )}>
            <CommentForm
              postSlug={postSlug}
              onSuccess={() => {}}
            />
          </div>
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            "rounded-2xl bg-white/50 backdrop-blur-[2px]"
          )}>
            <p className="text-sm font-semibold text-slate-500">
              <a href="/auth/login" className="text-emerald-600 hover:underline">Sign in</a>
              {" "}to leave a comment
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}