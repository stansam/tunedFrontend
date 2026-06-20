"use client";

import { useState, useRef } from "react";
import { ChevronUp, ChevronDown, Paperclip } from "lucide-react";
import { useUploadOrderAttachment } from "../_hooks/useUploadOrderAttachment";
import { formatDateTime } from "../_utils";
import type { OrderRequirementsProps } from "../_props";
import { AttachmentItem, DownloadAllButton } from "./OrderAttachment";

const AFFIRMATION =
  "I affirm that the information I've provided is accurate and complete. " +
  "Any changes to the requirements I submitted at this stage may incur additional costs.";

export function OrderRequirements({ order }: OrderRequirementsProps) {
  const [open, setOpen] = useState(true);
  // const [showUploadRetryBanner, setShowUploadRetryBanner] = useState(false);
  const Chevron = open ? ChevronUp : ChevronDown;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadOrderAttachment(order.order_number, order.id);
  const [showUploadRetryBanner, setShowUploadRetryBanner] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const pending = sessionStorage.getItem("pendingUpload");

    if (!pending) {
      return false;
    }

    try {
      const { orderId } = JSON.parse(pending);
      return orderId === order.id;
    } catch {
      return false;
    }
  });
  // useEffect(() => {
  //   const pending = sessionStorage.getItem("pendingUpload");
  //   if (!pending) return;
  //   const { orderId } = JSON.parse(pending);
  //   if (orderId === order.id) setShowUploadRetryBanner(true);
  // }, [order.id]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <button onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open} aria-controls="req-body">
        <h3 className="font-semibold text-slate-800">Requirements</h3>
        <Chevron className="h-5 w-5 shrink-0 text-slate-400" />
      </button>

      {open && (
        <div id="req-body" className="divide-y divide-slate-100 border-t border-slate-100">
          {showUploadRetryBanner && (
            <div className="mx-5 my-3 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="text-xs font-semibold text-amber-800">
                File upload failed during order creation. Upload your materials now.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700"
                >
                  Retry
                </button>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("pendingUpload");
                    setShowUploadRetryBanner(false);
                  }}
                  className="text-xs font-bold text-amber-500 hover:text-amber-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="px-5 py-3 text-sm">
            <span className="font-semibold text-slate-800">Topic: </span>
            <span className="text-slate-600">{order.title}</span>
          </div>

          <div className="px-5 py-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h4 className="font-semibold text-slate-800">Description</h4>
              {order.created_at && (
                <span className="shrink-0 text-xs text-slate-400">
                  {formatDateTime(order.created_at)}
                </span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {order.instructions}
            </p>
          </div>

          <div className="px-5 py-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Attachments
              </p>
              <div className="flex items-center gap-2">
                {!!order.attachments?.length && (
                  <DownloadAllButton
                    orderId={order.id}
                    orderNumber={order.order_number}
                  />
                )}
                <button
                  type="button"
                  disabled={upload.isPending}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100 active:scale-95 disabled:opacity-50"
                >
                  <Paperclip className="h-3 w-3" />
                  {upload.isPending
                    ? "Uploading..."
                    : !order.attachments?.length
                    ? "Upload Materials"
                    : "Add More Files"}
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.doc,.jpg,.png,.txt"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                if (files.length) upload.mutate(files);
                e.target.value = "";
              }}
            />
            {!!order.attachments?.length && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {order.attachments.map((att) => (
                  <li key={att.id}>
                    <AttachmentItem attachment={att} orderId={order.id} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-5 py-4">
            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <span className="mt-0.5 text-xs font-bold text-emerald-500">✓</span>
              <p className="text-xs leading-relaxed text-slate-500">{AFFIRMATION}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
