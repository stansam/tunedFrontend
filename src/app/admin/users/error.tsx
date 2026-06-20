"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersErrorProps {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
}

export default function UsersError({ error, reset }: UsersErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[UsersError] Unhandled error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/20 bg-white/40 p-8 text-center backdrop-blur-md shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-slate-900">Something went wrong</h2>
        <p className="text-sm text-slate-500">
          {error.message || "Failed to load client insights. Please try again."}
        </p>
      </div>
      <Button
        onClick={reset}
        className="rounded-xl bg-emerald-600 px-6 font-semibold text-white hover:bg-emerald-700 transition-colors"
      >
        Try again
      </Button>
    </div>
  );
}
