"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface DashboardErrorProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[DashboardError] Caught error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 max-w-md shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {error.message || "An unexpected error occurred while loading your dashboard."}
        </p>
        {process.env.NODE_ENV !== "production" && error.digest && (
          <p className="mt-2 text-xs font-mono text-slate-400 bg-slate-100 p-2 rounded">
            Digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
