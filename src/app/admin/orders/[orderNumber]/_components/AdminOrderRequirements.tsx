"use client";

import { Button } from "@/components/ui/button";
import type { AdminOrderRequirementsProps } from "../_props";
import type { AdminOrderFileDTO } from "../_types";
import { useAdminOrderFileDownload, useAdminOrderFilesDownload } from "../_hooks/useAdminOrderFileDownload";

export function AdminOrderRequirements({ order }: AdminOrderRequirementsProps) {
  const { refetch: downloadAll } = useAdminOrderFilesDownload(order.id, order.order_number);
  const formatStyle = order.format_style ? order.format_style.toUpperCase() : "N/A";
  const lineSpacing = order.line_spacing ? order.line_spacing.replace(/_/g, " ") : "N/A";

  return (
    <div className="bg-white/40 border border-white/50 rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200/50 pb-4">
        <h2 className="text-lg font-bold text-slate-800">Project Requirements</h2>
        {order.attachments && order.attachments.length > 0 && (
          <Button
            onClick={() => downloadAll()}
            size="sm"
            variant="outline"
            className="h-7 text-xs font-semibold rounded-lg bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
          >
            Download All (ZIP)
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Word Count</span>
          <span className="text-slate-800 font-semibold">{order.word_count || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Pages</span>
          <span className="text-slate-800 font-semibold">{order.page_count || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Formatting</span>
          <span className="text-slate-800 font-semibold">{formatStyle}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Line Spacing</span>
          <span className="text-slate-800 font-semibold">{lineSpacing}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instructions</h3>
        <div className="bg-white/30 border border-slate-200/50 rounded-lg p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
          {order.instructions || "No custom instructions provided."}
        </div>
      </div>

      {order.attachments && order.attachments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attachments</h3>
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
    <div className="flex items-center justify-between bg-white/20 border border-slate-200/50 rounded-lg p-3">
      <span className="text-xs text-slate-700 font-medium truncate max-w-[180px]">
        {file.filename}
      </span>
      <button onClick={() => refetch()} className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition cursor-pointer">
        Download
      </button>
    </div>
  );
}
