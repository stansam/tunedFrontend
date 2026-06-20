"use client";

import type { AdminOrderRequirementsProps } from "../_props";
import type { AdminOrderFileDTO } from "../_types";
import { useAdminOrderFileDownload, useAdminOrderFilesDownload } from "../_hooks/useAdminOrderFileDownload";


export function AdminOrderRequirements({ order }: AdminOrderRequirementsProps) {
  const { refetch: downloadAll } = useAdminOrderFilesDownload(order.id, order.order_number);
  const formatStyle = order.format_style ? order.format_style.toUpperCase() : "N/A";
  const lineSpacing = order.line_spacing ? order.line_spacing.replace(/_/g, " ") : "N/A";

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h2 className="text-lg font-bold text-white">Project Requirements</h2>
        {order.attachments && order.attachments.length > 0 && (
          <button
            onClick={() => downloadAll()}
            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-xs font-semibold transition"
          >
            Download All (ZIP)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 block mb-0.5">Word Count</span>
          <span className="text-white font-medium">{order.word_count || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Pages</span>
          <span className="text-white font-medium">{order.page_count || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Formatting</span>
          <span className="text-white font-medium">{formatStyle}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Line Spacing</span>
          <span className="text-white font-medium">{lineSpacing}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instructions</h3>
        <div className="bg-slate-900/50 border border-white/5 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
          {order.instructions || "No custom instructions provided."}
        </div>
      </div>

      {order.attachments && order.attachments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {order.attachments.map((file) => (
              <AttachmentItem key={file.id} file={file} orderId={order.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AttachmentItem({ file, orderId }: { file: AdminOrderFileDTO; orderId: string }) {
  const { refetch } = useAdminOrderFileDownload(orderId, file.id, file.filename);
  return (
    <div className="flex items-center justify-between bg-slate-900/40 border border-white/5 rounded-lg p-3">
      <span className="text-xs text-slate-300 font-medium truncate max-w-[180px]">
        {file.filename}
      </span>
      <button onClick={() => refetch()} className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition">
        Download
      </button>
    </div>
  );
}
