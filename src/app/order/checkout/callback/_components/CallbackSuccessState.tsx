"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { CallbackReceiptSummary } from "./CallbackReceiptSummary";
import type { OrderDetails } from "../../_types/checkout.types";

interface CallbackSuccessStateProps {
  order: OrderDetails;
  paymentUuid: string | null;
  apiBaseUrl: string;
}

export function CallbackSuccessState({
  order,
  paymentUuid,
  apiBaseUrl,
}: CallbackSuccessStateProps): ReactNode {
  return (
    <div
      className="min-h-[75vh] flex flex-col items-center justify-center p-4 sm:p-6 bg-[#e8e6e1]"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <div className="w-full max-w-lg bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/50 shadow-2xl space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-50 p-3 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="h-14 w-14 text-emerald-600" aria-hidden="true" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              Payment Completed!
            </h2>
            <p className="text-sm text-emerald-800/80">
              Your payment was verified. The writing team has been assigned.
            </p>
          </div>
        </div>

        <CallbackReceiptSummary order={order} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentUuid ? (
            <>
              <a
                href={`${apiBaseUrl}/payments/${paymentUuid}/invoice`}
                target="_blank"
                rel="noreferrer"
                className="h-11 flex items-center justify-center rounded-xl bg-white border border-emerald-900/10 text-emerald-950 font-semibold shadow-sm hover:bg-emerald-50/50 transition-all duration-300 text-sm"
              >
                <FileText className="mr-2 h-4 w-4 text-emerald-700" aria-hidden="true" /> Invoice PDF
              </a>
              <a
                href={`${apiBaseUrl}/payments/${paymentUuid}/receipt`}
                target="_blank"
                rel="noreferrer"
                className="h-11 flex items-center justify-center rounded-xl bg-white border border-emerald-900/10 text-emerald-950 font-semibold shadow-sm hover:bg-emerald-50/50 transition-all duration-300 text-sm"
              >
                <FileText className="mr-2 h-4 w-4 text-emerald-700" aria-hidden="true" /> Receipt PDF
              </a>
            </>
          ) : (
            <div className="col-span-1 sm:col-span-2 text-center text-xs text-emerald-900/50">
              Retrieving document download links...
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link
            href={`/client/orders/${order.order_number}`}
            className="w-full h-11 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-300 text-sm"
          >
            Go to Your Order <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
