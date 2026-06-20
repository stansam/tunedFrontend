"use client";

import { Download, FileText, File } from "lucide-react";
import type { AdminDeliveryAttachmentItemProps } from "../_props";

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function AdminDeliveryAttachmentItem({ attachment }: AdminDeliveryAttachmentItemProps) {
  const isPlagiarism = attachment.is_plagiarism_report;
  
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/20 p-3 shadow-sm">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
        isPlagiarism ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"
      }`}>
        {isPlagiarism ? <FileText className="h-5 w-5" /> : <File className="h-5 w-5" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {attachment.filename}
          </p>
          {isPlagiarism && (
            <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border bg-amber-100 text-amber-800 border-amber-200">
              Plag
            </span>
          )}
        </div>
        {!!attachment.file_size && (
          <p className="text-xs text-slate-500">
            {formatFileSize(attachment.file_size)}
          </p>
        )}
      </div>

      <a
        href={attachment.file_path}
        download={attachment.filename}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-emerald-500/30 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}
