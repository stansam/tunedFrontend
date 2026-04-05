"use client";

import {
  useState,
  useCallback,
  useOptimistic,
  useTransition,
  useRef,
} from "react";
import { submitComment, reactToComment } from "@/lib/services/post.service";
import type {
  BlogComment,
  CommentFormValues,
  OptimisticAction,
  UseCommentsOptions,
  UseCommentsReturn
} from "../_types/post.type";
import { commentsReducer } from "../utils";

const COMMENTS_PER_PAGE = 8;

export function useComments({
  postSlug,
  initialComments,
}: UseCommentsOptions): UseCommentsReturn {
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [optimisticComments, dispatchOptimistic] = useOptimistic<
    readonly BlogComment[],
    OptimisticAction
  >(initialComments, commentsReducer);

  const [reactionCounts, setReactionCounts] = useState<
    Record<string, { likes: number; dislikes: number }>
  >({});

  const reactingRef = useRef<Set<string>>(new Set());

  const displayedCount = Math.min(page * COMMENTS_PER_PAGE, optimisticComments.length);
  const visibleComments = optimisticComments.slice(0, displayedCount);
  const hasMore = displayedCount < optimisticComments.length;

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const handleSubmit = useCallback(
    async (values: CommentFormValues): Promise<boolean> => {
      setSubmitError(null);
      setSubmitSuccess(false);

      const tempComment: BlogComment = {
        id: `temp-${Date.now()}`,
        post_id: postSlug,
        content: values.content,
        name: values.name,
        email: values.email,
        user_id: null,
        approved: false,
        reactions: [],
        total_likes: 0,
        total_dislikes: 0,
      };

      startTransition(() => {
        dispatchOptimistic({ type: "ADD", comment: tempComment });
      });

      const result = await submitComment(postSlug, values);

      if (!result.ok) {
        setSubmitError(result.error.message);
        return false;
      }

      setSubmitSuccess(true);
      return true;
    },
    [postSlug, dispatchOptimistic]
  );

  const handleReaction = useCallback(
    async (commentId: string, type: "like" | "dislike") => {
      const key = `${commentId}-${type}`;
      if (reactingRef.current.has(key)) return;
      reactingRef.current.add(key);

      const current = reactionCounts[commentId] ??
        (() => {
          const c = optimisticComments.find((c) => c.id === commentId);
          return { likes: c?.total_likes ?? 0, dislikes: c?.total_dislikes ?? 0 };
        })();

      const optimistic = {
        likes: type === "like" ? current.likes + 1 : current.likes,
        dislikes: type === "dislike" ? current.dislikes + 1 : current.dislikes,
      };

      setReactionCounts((prev) => ({ ...prev, [commentId]: optimistic }));

      const result = await reactToComment(commentId, type);

      if (result.ok) {
        setReactionCounts((prev) => ({
          ...prev,
          [commentId]: {
            likes: result.data.total_likes,
            dislikes: result.data.total_dislikes,
          },
        }));
      }

      reactingRef.current.delete(key);
    },
    [optimisticComments, reactionCounts]
  );

  return {
    visibleComments,
    totalCount: optimisticComments.length,
    displayedCount,
    hasMore,
    isSubmitting: isPending,
    submitError,
    submitSuccess,
    loadMore,
    handleSubmit,
    handleReaction,
    reactionCounts,
  };
}