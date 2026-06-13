"use client";

import { useState } from "react";
import type { AdminCommentBubbleProps } from "../_props";

export function AdminCommentBubble({
  comment,
  currentUserId,
  onEdit,
  onDelete,
}: AdminCommentBubbleProps) {
  const isOwn = comment.sender_id === currentUserId;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleSave = () => {
    if (!editContent.trim()) return;
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex flex-col max-w-[85%] ${isOwn ? "self-end items-end" : "self-start items-start"}`}>
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-[10px] text-slate-400 font-semibold">{comment.sender_name}</span>
        <span className="text-[9px] text-slate-500">{formatDate(comment.created_at)}</span>
      </div>

      <div className={`p-3.5 rounded-2xl text-sm border shadow-md ${
        isOwn 
          ? "bg-emerald-500/10 border-emerald-500/20 text-white rounded-tr-none" 
          : "bg-white/5 border-white/10 text-slate-200 rounded-tl-none"
      }`}>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditing(false)} className="text-[10px] text-slate-400 hover:text-slate-200">
                Cancel
              </button>
              <button onClick={handleSave} className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold">
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{comment.content}</p>
        )}
      </div>

      {isOwn && !isEditing && (
        <div className="flex gap-3 mt-1 text-[10px] text-slate-500">
          <button onClick={() => setIsEditing(true)} className="hover:text-emerald-400 transition">
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm("Delete this comment?")) onDelete(comment.id);
            }}
            className="hover:text-red-400 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
