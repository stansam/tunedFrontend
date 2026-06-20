"use client";

import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { formatFileSize } from "../_utils";
import type { CommentAttachmentPreviewProps } from "../_props";

export function CommentAttachmentPreview({ attachments, onRemove }: CommentAttachmentPreviewProps) {
  if (!attachments.length) return null;
  return (
    <div className="flex flex-wrap gap-2 px-4 pt-2">
      {attachments.map((a) => (
        <div key={a.localId} className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5">
          {a.previewUrl
            ? <Image src={a.previewUrl} width={32} height={32} className="h-8 w-8 rounded object-cover" alt={a.file.name} unoptimized />
            : null}
          <div className="flex flex-col max-w-[100px]">
            <span className="truncate text-xs font-medium text-slate-700">{a.file.name}</span>
            <span className="text-[10px] text-slate-400">{formatFileSize(a.file.size)}</span>
          </div>
          {a.status === "uploading"
            ? <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />
            : (
              <button type="button" onClick={() => onRemove(a.localId)} className="ml-1 text-slate-400 hover:text-slate-700">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
        </div>
      ))}
    </div>
  );
}
