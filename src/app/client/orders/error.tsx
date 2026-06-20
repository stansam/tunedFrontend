"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function OrdersError({ error, reset }: OrdersErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[OrdersPage] Unhandled error:", error);
    }
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-7 w-7 text-red-500" />
      </div>

      <div className="px-4">
        <p className="text-base font-semibold text-slate-900">
          Something went wrong
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {error.message || "Failed to load your orders. Please try again."}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-slate-400">
            Ref: {error.digest}
          </p>
        )}
      </div>

      <Button
        onClick={reset}
        className="bg-emerald-600 text-white hover:bg-emerald-700"
        size="sm"
      >
        Try again
      </Button>
    </div>
  );
}
