"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

interface CallbackErrorStateProps {
  error: string;
  trackingId: string;
}

export function CallbackErrorState({ error, trackingId }: CallbackErrorStateProps): ReactNode {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <div className="w-full max-w-md bg-white/75 backdrop-blur-md rounded-3xl p-8 border border-red-200/50 shadow-2xl text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="h-16 w-16 text-rose-500 animate-bounce" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-rose-950">Verification Failed</h2>
          <p className="text-sm text-rose-800/80">
            {error || "We encountered an issue confirming your payment status."}
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/client/dashboard"
            className="w-full h-11 flex items-center justify-center rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-lg shadow-rose-950/20 transition-all duration-300"
          >
            Go to Dashboard
          </Link>
          <a
            href={`/contact?ref=payment-callback&tracking_id=${trackingId}`}
            className="w-full h-11 flex items-center justify-center rounded-xl bg-white border border-rose-200 text-rose-700 font-semibold hover:bg-rose-50 transition-all duration-300 text-sm"
          >
            Contact Support
            {trackingId && (
              <span className="ml-1 text-xs text-rose-500">
                (Ref: {trackingId.slice(0, 10)}…)
              </span>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
