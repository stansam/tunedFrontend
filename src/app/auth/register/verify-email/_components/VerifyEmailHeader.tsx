/**
 * VerifyEmailHeader — static display component.
 *
 * Shows the envelope icon, headline, and instructional copy.
 * Pure presentation — no state, no network calls.
 */
import type { VerifyEmailHeaderProps } from "../_props/verify-email.prop";

export function VerifyEmailHeader({ email }: VerifyEmailHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {/* Animated envelope icon */}
      <div
        className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 shadow-sm"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-emerald-600"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Check your inbox
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xs leading-relaxed">
          We sent a verification link to{" "}
          <span className="font-semibold text-emerald-700 break-all">{email}</span>.
          Click the link in the email to activate your account.
        </p>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
        The link expires in <span className="font-medium text-slate-500">24 hours</span>.
        Check your spam folder if you don&apos;t see it.
      </p>
    </div>
  );
}
