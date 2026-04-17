"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useComments } from "../_hooks/useComments";
import { CommentsAuthGate } from "./CommentsAuthGate";
import { BlogCommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import type { BlogCommentsPanelProps } from "../_props/post.prop";

const UNAUTHENTICATED_PREVIEW_COUNT = 2;

export function BlogCommentsPanel({
  postSlug,
  comments: initialComments,
  isAuthenticated,
}: BlogCommentsPanelProps) {
  const pathname = usePathname();
  const loginHref = {
    pathname: "/auth/login" as const,
    query: { callbackUrl: pathname },
  };

  const {
    visibleComments,
    totalCount,
    hasMore,
    isSubmitting,
    submitError,
    submitSuccess,
    loadMore,
    handleSubmit,
    handleReaction,
    reactionCounts,
  } = useComments({ postSlug, initialComments });

  return (
    <aside aria-label="Blog comments" className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            "bg-emerald-50 border border-emerald-200",
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
            <div
              className={cn(
                "rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center",
              )}
            >
              <MessageSquare
                size={32}
                className="mx-auto mb-3 text-slate-200"
                aria-hidden="true"
              />
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
            <div
              className={cn(
                "rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center",
              )}
            >
              <MessageSquare
                size={32}
                className="mx-auto mb-3 text-slate-200"
                aria-hidden="true"
              />
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
                    "transition-all shadow-sm",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
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
              onSubmitValues={handleSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
            />
          </div>
        </>
      )}

      {!isAuthenticated && (
        <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div
            aria-hidden="true"
            className="p-5 space-y-3 blur-[3px] opacity-40 pointer-events-none select-none"
          >
            <div className="h-3 w-36 rounded bg-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 rounded-lg bg-slate-100" />
              <div className="h-10 rounded-lg bg-slate-100" />
            </div>
            <div className="h-24 rounded-lg bg-slate-100" />
            <div className="h-10 w-full rounded-full bg-emerald-100" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[2px]">
            <p className="text-sm font-semibold text-slate-600 text-center px-4">
              <Link
                href={loginHref}
                className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
              >
                Sign in
              </Link>
              {" "}to leave a comment
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}