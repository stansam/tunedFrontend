"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useAdminOrderComments } from "../_hooks/useAdminOrderComments";
import { useAdminCommentSocket } from "../_hooks/useAdminCommentSocket";
import { useAdminCommentActions } from "../_hooks/useAdminCommentActions";
import { AdminCommentThread } from "./AdminCommentThread";
import { AdminActivityComposer } from "./AdminActivityComposer";
import { AdminActivityTabSkeleton } from "./AdminActivityTabSkeleton";
import type { AdminActivityFeedProps } from "../_props";

export function AdminActivityFeed({ orderId }: AdminActivityFeedProps) {
  const { user } = useAuth();
  const { data: comments = [], isLoading } = useAdminOrderComments(orderId);
  const { sendComment, isSending, updateComment, deleteComment } = useAdminCommentActions(orderId);

  useAdminCommentSocket(orderId);

  if (isLoading) return <AdminActivityTabSkeleton />;

  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/50 bg-white/40 shadow-xs backdrop-blur-md">
      <div className="border-b border-slate-200/50 px-5 py-3.5">
        <p className="text-sm font-semibold text-slate-800">Order Activity</p>
        <p className="text-xs text-slate-500">
          {comments.length} message{comments.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="px-5 py-3">
        <AdminCommentThread
          comments={comments}
          currentUserId={user?.id ?? ""}
          onEdit={(id, content) => updateComment({ commentId: id, content })}
          onDelete={(id) => deleteComment(id)}
        />
      </div>

      <div className="px-4 pb-4">
        <AdminActivityComposer
          onSend={async (content) => { await sendComment(content); }}
          isSending={isSending}
        />
      </div>
    </div>
  );
}
