"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset(): void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[AdminOrderDetailError]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 text-center shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-slate-400 text-sm mb-6">
          {error.message || "An unexpected error occurred while loading order details."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-sm transition font-medium"
          >
            Try again
          </button>
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition font-medium"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
