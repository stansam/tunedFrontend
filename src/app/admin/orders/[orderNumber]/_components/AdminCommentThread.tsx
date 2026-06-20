"use client";

import type { AdminCommentThreadProps } from "../_props";
import { AdminCommentBubble } from "./AdminCommentBubble";

export function AdminCommentThread({
  comments,
  currentUserId,
  onEdit,
  onDelete,
}: AdminCommentThreadProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-xs">No comments yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px] p-2 pr-4 scrollbar-thin">
      {comments.map((comment) => (
        <AdminCommentBubble
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
