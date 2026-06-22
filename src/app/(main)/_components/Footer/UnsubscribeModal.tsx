"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, CheckCircle2, AlertTriangle, MailMinus } from "lucide-react";
import type { UnsubscribeStatus } from "@/lib/hooks/useUnsubscribe";

interface Props {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly status: UnsubscribeStatus;
  readonly email: string | null;
  readonly errorMsg: string | null;
  readonly onConfirm: () => void;
}

export function UnsubscribeModal({ isOpen, onClose, status, email, errorMsg, onConfirm }: Props) {
  const getModalContent = () => {
    switch (status) {
      case "fetching":
        return (
          <div className="flex flex-col items-center gap-4 w-full py-2">
            <Skeleton className="h-12 w-12 rounded-full bg-slate-800" />
            <Skeleton className="h-6 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-64 bg-slate-800" />
            <Skeleton className="h-10 w-full rounded-full bg-slate-800 mt-2" />
          </div>
        );
      case "confirm":
        return (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-slate-800 p-3 text-emerald-400"><MailMinus size={28} /></div>
            <DialogTitle className="text-base font-semibold">Unsubscribe Confirmation</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Are you sure you want to unsubscribe <span className="text-slate-200 font-medium">{email}</span> from our newsletter?
            </DialogDescription>
            <button onClick={onConfirm} className="w-full mt-2 rounded-full bg-red-500 hover:bg-red-600 py-2.5 text-xs font-semibold text-white transition active:scale-98 cursor-pointer">
              Yes, Unsubscribe
            </button>
          </div>
        );
      case "loading":
        return (
          <div className="flex flex-col items-center gap-4 py-6">
            <Loader2 className="animate-spin text-emerald-400 h-8 w-8" />
            <DialogTitle className="text-base font-semibold">Processing Request</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">We are unsubscribing your email address. Please hold on.</DialogDescription>
          </div>
        );
      default:
        const isSuccess = status === "success";
        const icon = isSuccess ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />;
        const title = isSuccess ? "Unsubscribed Successfully" : "Unsubscribe Failed";
        const desc = isSuccess ? "You have been unsubscribed from our newsletter." : (errorMsg || "Invalid or expired token.");
        const titleClass = isSuccess ? "text-base font-semibold" : "text-base font-semibold text-red-400";
        const iconBg = isSuccess ? "bg-emerald-950/40 text-emerald-400" : "bg-red-950/40 text-red-400";

        return (
          <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full p-3 ${iconBg}`}>{icon}</div>
            <DialogTitle className={titleClass}>{title}</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">{desc}</DialogDescription>
            <button onClick={onClose} className="w-full mt-2 rounded-full bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-semibold text-slate-200 transition cursor-pointer">
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={status !== "loading"} className="bg-slate-900 border-slate-800 text-slate-200">
        <DialogHeader className="items-center text-center">
          {getModalContent()}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
