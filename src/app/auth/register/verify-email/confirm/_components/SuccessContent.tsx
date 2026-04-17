import Link from "next/link";
import type { SuccessContentProps } from "../_props/confirm.prop";

export function SuccessContent({ alreadyVerified }: SuccessContentProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-emerald-600"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">
          {alreadyVerified ? "Already verified!" : "Email verified!"}
        </h1>
        <p className="text-slate-500 text-sm max-w-xs">
          {alreadyVerified
            ? "Your email was already verified. You can sign in now."
            : "Your account is now active. Sign in to get started with TunedEssays."}
        </p>
      </div>
      <Link
        href="/auth/login"
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold px-8 py-3 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        Sign in to your account
      </Link>
    </div>
  );
}
