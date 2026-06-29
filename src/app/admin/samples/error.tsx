"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface SamplesErrorProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function SamplesError({ error, reset }: SamplesErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[AdminSamplesError] Caught error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-8 max-w-md shadow-xs backdrop-blur-md">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-base font-bold text-slate-900">Something went wrong</h2>
        <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
          {error.message || "An unexpected error occurred while loading the samples manager."}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-500 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
