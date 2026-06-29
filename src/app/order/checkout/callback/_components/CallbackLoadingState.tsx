"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface CallbackLoadingStateProps {
  trackingId: string;
}

export function CallbackLoadingState({ trackingId }: CallbackLoadingStateProps): ReactNode {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-2xl text-center space-y-6 animate-pulse">
        <div className="flex justify-center">
          <Loader2 className="h-14 w-14 text-emerald-600 animate-spin" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-emerald-950">Verifying Payment</h2>
          <p className="text-sm text-emerald-800/80">
            Confirming transaction with Pesapal. This will only take a moment.
          </p>
        </div>
        <div className="pt-4 border-t border-emerald-900/10 text-xs text-emerald-800/60">
          Tracking ID: {trackingId}
        </div>
      </div>
    </div>
  );
}
