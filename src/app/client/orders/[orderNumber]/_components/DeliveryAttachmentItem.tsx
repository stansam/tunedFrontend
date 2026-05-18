import { Download, FileText, Archive, File } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFileSize } from "../_utils";
import type { DeliveryAttachmentItemProps } from "../_props";

interface FileStyle {
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

function resolveFileStyle(name: string, mime?: string): FileStyle {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf" || mime?.includes("pdf"))
    return { Icon: FileText, iconColor: "text-red-500", bgColor: "bg-red-50" };
  if (["zip", "rar", "7z", "gz", "tar"].includes(ext ?? ""))
    return { Icon: Archive, iconColor: "text-blue-500", bgColor: "bg-blue-50" };
  if (["doc", "docx"].includes(ext ?? ""))
    return { Icon: FileText, iconColor: "text-purple-500", bgColor: "bg-purple-50" };
  if (["xls", "xlsx", "csv"].includes(ext ?? ""))
    return { Icon: FileText, iconColor: "text-green-600", bgColor: "bg-green-50" };
  return { Icon: File, iconColor: "text-slate-500", bgColor: "bg-slate-100" };
}

export function DeliveryAttachmentItem({ attachment }: DeliveryAttachmentItemProps) {
  const { Icon, iconColor, bgColor } = resolveFileStyle(
    attachment.filename,
    attachment.file_format,
  );

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          bgColor,
        )}
      >
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">
          {attachment.filename}
        </p>
        {!!attachment.file_size && (
          <p className="text-xs text-slate-400">
            {formatFileSize(attachment.file_size)}
          </p>
        )}
      </div>

      <a
        href={attachment.file_path}
        download={attachment.filename}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${attachment.filename}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
      >
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}
