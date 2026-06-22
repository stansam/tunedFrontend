"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SearchError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[SearchError]:", error);
  }, [error]);

  return (
    <>
      <Navbar activeRoute="" />
      <main className="min-h-screen bg-[#e8e6e1] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <AlertCircle size={32} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We encountered an error while searching. This might be due to a connection issue or temporary server trouble.
            </p>
            {error.message && (
              <div className="text-xs font-mono text-slate-400 bg-slate-50 rounded-xl p-3 max-h-24 overflow-y-auto">
                {error.message}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm hover:shadow active:scale-98 transition-all"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold active:scale-98 transition-all"
            >
              <Home size={16} />
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
