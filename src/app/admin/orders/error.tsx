"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[AdminOrdersError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6 text-center">
      <div className="flex items-center justify-center size-12 rounded-full bg-red-100/10 border border-red-500/20 text-red-500">
        <AlertCircle className="size-6" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Failed to Load Orders</h2>
        <p className="text-sm text-slate-600 max-w-md">
          {error.message || "An unexpected error occurred while loading the orders table."}
        </p>
      </div>
      <Button
        onClick={() => reset()}
        className="mt-2 flex items-center gap-2 hover:bg-emerald-600 transition-colors"
      >
        <RefreshCw className="size-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
