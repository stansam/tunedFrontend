"use client";

import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  visible: boolean;
}

export function CommentBubbleMenu({ onEdit, onDelete, visible }: Props) {
  return (
    <div className={cn(
      "flex items-center gap-1 transition-opacity",
      visible ? "opacity-100" : "opacity-0 pointer-events-none",
    )}>
      <button
        type="button" onClick={onEdit} aria-label="Edit comment"
        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
      >
        <Pencil className="h-3 w-3" />
      </button>
      <button
        type="button" onClick={onDelete} aria-label="Delete comment"
        className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}
