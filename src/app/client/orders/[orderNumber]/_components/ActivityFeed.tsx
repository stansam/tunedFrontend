"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useOrderComments } from "../_hooks/useOrderComments";
import { useCommentSocket } from "../_hooks/useCommentSocket";
import { useCommentActions } from "../_hooks/useCommentActions";
import { CommentThread } from "./CommentThread";
import { ActivityComposer } from "./ActivityComposer";
import { ActivityTabSkeleton } from "./ActivityTabSkeleton";
import type { ActivityFeedProps } from "../_props";

export function ActivityFeed({ orderId }: ActivityFeedProps) {
  const { user } = useAuth();
  const { data: comments = [], isLoading } = useOrderComments(orderId);
  const {
    isSending, editState, handleSend, handleEdit,
    handleDelete, startEdit, cancelEdit,
  } = useCommentActions(orderId);

  useCommentSocket(orderId);

  if (isLoading) return <ActivityTabSkeleton />;

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-md">
      <div className="border-b border-slate-100/80 px-5 py-3.5">
        <p className="text-sm font-semibold text-slate-700">Order Activity</p>
        <p className="text-xs text-slate-400">{comments.length} message{comments.length !== 1 ? "s" : ""}</p>
      </div>

      <CommentThread
        comments={comments}
        currentUserId={user?.id ?? ""}
        onEdit={startEdit}
        onDelete={handleDelete}
        isEditing={editState}
        onCancelEdit={cancelEdit}
        onConfirmEdit={handleEdit}
      />

      <div className="px-4 pb-4">
        <ActivityComposer
          onSend={handleSend}
          isSending={isSending}
          orderId={orderId}
          orderNumber=""
        />
      </div>
    </div>
  );
}
