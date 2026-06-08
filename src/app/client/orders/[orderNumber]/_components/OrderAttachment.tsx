import { Paperclip, Download, Loader2 } from "lucide-react";
import { useOrderFileDownload, useOrderFilesDownload } from "../_hooks/useOrderFileDownload";
import type { OrderAttachmentDTO } from "../_types";

export function AttachmentItem({
  attachment,
  orderId,
}: {
  attachment: OrderAttachmentDTO;
  orderId: string;
}) {
  const { isFetching, error, refetch } = useOrderFileDownload(
    orderId,
    attachment.id,
    attachment.filename,
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFetching}
      className="flex items-center gap-2 text-sm text-emerald-600 hover:underline disabled:opacity-50 disabled:no-underline text-left cursor-pointer"
    >
      {isFetching ? (
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-emerald-500" />
      ) : (
        <Paperclip className="h-3.5 w-3.5 shrink-0" />
      )}
      <span>{attachment.filename}</span>
      {error && (
        <span className="text-xs text-red-500 ml-1">
          ({error.message})
        </span>
      )}
    </button>
  );
}

export function DownloadAllButton({
  orderId,
  orderNumber,
}: {
  orderId: string;
  orderNumber: string;
}) {
  const { isFetching, error, refetch } = useOrderFilesDownload(
    orderId,
    orderNumber,
  );

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={isFetching}
        onClick={() => refetch()}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50"
      >
        {isFetching ? (
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5 text-slate-500" />
        )}
        Download All
      </button>
      {error && (
        <span className="text-xs text-red-500">
          ({error.message})
        </span>
      )}
    </div>
  );
}
