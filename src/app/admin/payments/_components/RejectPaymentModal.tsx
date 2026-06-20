"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import type { RejectPaymentModalProps } from "../_props/payments.props";

export function RejectPaymentModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: RejectPaymentModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl">
        <DialogHeader className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertTriangle className="size-5" />
          </div>
          <DialogTitle className="text-slate-800 font-bold">Reject Payment</DialogTitle>
          <DialogDescription className="text-slate-500 text-xs">
            Please provide a clear reason for rejecting this manual payment proof. The user will be notified.
          </DialogDescription>
        </DialogHeader>
        <div className="my-2">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., Deposit amount mismatch, invalid transaction reference number..."
            className="min-h-[100px] text-xs bg-white/50 border-white/80 focus:border-rose-500/50 rounded-xl"
            disabled={isSubmitting}
          />
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-700 text-xs h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
            className="bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs h-9"
          >
            {isSubmitting ? "Rejecting..." : "Reject Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
