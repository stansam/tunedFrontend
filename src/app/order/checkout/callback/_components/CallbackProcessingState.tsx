"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface CallbackProcessingStateProps {
  orderNumber: string;
  trackingId: string;
  timedOut: boolean;
}

export function CallbackProcessingState({
  orderNumber,
  trackingId,
  timedOut,
}: CallbackProcessingStateProps): ReactNode {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-2xl text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle
            className={`h-16 w-16 ${timedOut ? "text-orange-500" : "text-amber-500 animate-pulse"}`}
            aria-hidden="true"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-amber-950">
            {timedOut ? "Still Processing" : "Payment Processing"}
          </h2>
          <p className="text-sm text-emerald-900/80">
            {timedOut
              ? "Your payment is taking longer than expected to confirm. This is usually due to network delays with your bank or Pesapal."
              : "Your payment has been initiated and is pending confirmation from Pesapal."}
          </p>
        </div>
        {timedOut ? (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-left text-xs text-orange-800 space-y-1">
            <span className="font-semibold block">What to do:</span>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your email for a payment confirmation from Pesapal.</li>
              <li>
                If payment was deducted, contact support with reference:{" "}
                <strong>{trackingId?.slice(0, 12) || "N/A"}</strong>
              </li>
              <li>If not deducted, you can safely retry the checkout.</li>
            </ul>
          </div>
        ) : (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-800 space-y-1">
            <span className="font-semibold block">Important:</span>
            Pesapal takes up to a few minutes to notify our servers. Your order will activate
            automatically once confirmed.
          </div>
        )}
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href={`/client/orders/${orderNumber}`}
            className="w-full h-11 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/20 transition-all duration-300"
          >
            View Order Details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          {timedOut && (
            <a
              href="/contact?ref=payment-timeout"
              className="w-full h-11 flex items-center justify-center rounded-xl bg-white border border-amber-200 text-amber-700 font-semibold hover:bg-amber-50 transition-all duration-300 text-sm"
            >
              Contact Support
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
