import Link from "next/link";
import type { ErrorContentProps } from "../_props/confirm.prop";

export function ErrorContent({ message }: ErrorContentProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-red-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">Verification failed</h1>
        <p className="text-slate-500 text-sm max-w-xs">{message}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-6 py-3 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          Back to register
        </Link>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold px-6 py-3 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
