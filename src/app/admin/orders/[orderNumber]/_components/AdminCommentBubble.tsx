"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmActionModal } from "./ConfirmActionModal";
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
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
        <span className="text-[10px] text-slate-500 font-semibold">{comment.sender_name}</span>
        <span className="text-[9px] text-slate-400">{formatDate(comment.created_at)}</span>
      </div>

      <div className={`p-3.5 rounded-2xl text-sm border shadow-xs ${
        isOwn 
          ? "bg-emerald-100 border-emerald-200 text-slate-800 rounded-tr-none" 
          : "bg-white/40 border-slate-200 text-slate-800 rounded-tl-none"
      }`}>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[60px] bg-white/50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus-visible:ring-emerald-600"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="text-[10px] text-slate-500 hover:text-slate-700 h-6 px-2">
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-6 px-2">
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{comment.content}</p>
        )}
      </div>

      {isOwn && !isEditing && (
        <div className="flex gap-3 mt-1 text-[10px] text-slate-500">
          <button onClick={() => setIsEditing(true)} className="hover:text-emerald-700 transition cursor-pointer">
            Edit
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="hover:text-red-600 transition cursor-pointer"
          >
            Delete
          </button>
          <ConfirmActionModal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => {
              onDelete(comment.id);
              setIsDeleteOpen(false);
            }}
            title="Delete Comment"
            description="Are you sure you want to delete this comment? This action cannot be undone."
            confirmText="Delete"
            variant="destructive"
          />
        </div>
      )}
    </div>
  );
}
