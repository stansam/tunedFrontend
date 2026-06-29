"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { usePesapalBridge } from "../_hooks/usePesapalBridge";

function PesapalBridgeContent(): ReactNode {
  usePesapalBridge();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-3 p-6">
        <div className="flex justify-center">
          <svg
            className="h-10 w-10 animate-spin text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Completing your payment…</p>
      </div>
    </div>
  );
}

export default function PesapalBridgePage(): ReactNode {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Completing payment…</p>
        </div>
      }
    >
      <PesapalBridgeContent />
    </Suspense>
  );
}
