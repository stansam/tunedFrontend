"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth/Context";
import { useOrderComments, commentsQueryKey } from "../_hooks/useOrderComments";
import { useCommentSocket } from "../_hooks/useCommentSocket";
import { sendOrderComment } from "../_services/comments.service";
import { formatCommentDay } from "../_utils";
import { CommentItem } from "./CommentItem";
import { CommentComposer } from "./CommentComposer";
import { Skeleton } from "@/components/ui/skeleton";
import type { OrderCommentDTO } from "../_types";
import type { OrderCommentsProps } from "../_props";

export function OrderComments({ orderId }: OrderCommentsProps) {
  const { user } = useAuthContext();
  const { data: comments = [], isLoading } = useOrderComments(orderId);
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);

  useCommentSocket(orderId);

  const handleSend = async (content: string) => {
    setIsSending(true);
    try {
      const result = await sendOrderComment({ order_id: orderId, content });
      if (result.ok) {
        queryClient.setQueryData<OrderCommentDTO[]>(
          commentsQueryKey(orderId),
          (prev) => (prev ? [...prev, result.data] : [result.data]),
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.error("[OrderComments] Send failed:", result.error);
      }
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[OrderComments] Unexpected error:", err);
      }
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        {comments.map((cmt: OrderCommentDTO, i: number) => {
          const day = formatCommentDay(cmt.created_at);
          const prevComment = i > 0 ? comments[i - 1] : undefined;
          const prevDay = prevComment
          ? formatCommentDay(prevComment.created_at) : null;
          return (
            <CommentItem
              key={cmt.id}
              comment={cmt}
              currentUserId={user?.id ?? ""}
              dayLabel={day !== prevDay ? day : undefined}
            />
          );
        })}

        {comments.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-400">
            No comments yet. Send one below.
          </p>
        )}
      </div>

      <CommentComposer onSend={handleSend} isSending={isSending} />
    </div>
  );
}
