"use client";

import { Button } from "@/components/ui/button";
import { Download, Check, X } from "lucide-react";
import type { PaymentDetailsExpandedProps } from "../_props/payments.props";

export function PaymentDetailsExpanded({
  payment,
  onVerify,
  onReject,
  isActionPending,
}: PaymentDetailsExpandedProps) {
  const isDev = process.env.NODE_ENV === "development";
  const displayClient = payment.client_name || (isDev ? "Jane Doe" : payment.user_id);
  const displayOrder = payment.order_number || (isDev ? "ORD-1234-XYZ" : payment.order_id);
  const displayMethod = payment.payment_method_name || (isDev ? "Manual Transfer" : payment.accepted_method_id);

  const handleDownload = (type: "invoice" | "receipt") => {
    window.open(`/api/payments/${payment.id}/${type}`, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/20 text-xs font-medium text-slate-600">
      <div className="space-y-2">
        <p><span className="text-slate-400">Client:</span> {displayClient} ({payment.client_email || "N/A"})</p>
        <p><span className="text-slate-400">Order:</span> {displayOrder}</p>
        <p><span className="text-slate-400">Method:</span> {displayMethod}</p>
        {payment.client_proof_reference && (
          <p className="bg-slate-100/50 p-2 rounded-lg font-mono"><span className="text-slate-400 font-sans">Reference:</span> {payment.client_proof_reference}</p>
        )}
      </div>
      <div className="space-y-3 flex flex-col justify-between items-end">
        <div className="text-right w-full space-y-1">
          <p><span className="text-slate-400">Submitted:</span> {new Date(payment.created_at).toLocaleString()}</p>
          {payment.admin_verified_at && (
            <p><span className="text-slate-400">Verified:</span> {new Date(payment.admin_verified_at).toLocaleString()}</p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => handleDownload("invoice")} className="h-8 gap-1 rounded-xl bg-white/20 border-white/40 text-xs">
            <Download className="size-3.5" /> Invoice
          </Button>
          {payment.status === "completed" && (
            <Button size="sm" variant="outline" onClick={() => handleDownload("receipt")} className="h-8 gap-1 rounded-xl bg-white/20 border-white/40 text-xs">
              <Download className="size-3.5" /> Receipt
            </Button>
          )}
          {payment.status === "pending_verification" && (
            <>
              <Button size="sm" onClick={onReject} disabled={isActionPending} className="h-8 gap-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs">
                <X className="size-3.5" /> Reject
              </Button>
              <Button size="sm" onClick={onVerify} disabled={isActionPending} className="h-8 gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                <Check className="size-3.5" /> Verify
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
