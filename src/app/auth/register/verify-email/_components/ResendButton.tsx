import type { ResendButtonProps } from "../_props/verify-email.prop";
import type { VerifyEmailStatus } from "../_types/verify-email.type";

const statusLabel: Record<VerifyEmailStatus, string> = {
  idle: "Resend verification email",
  resending: "Sending…",
  resent: "Email sent!",
  error: "Try again",
};

export function ResendButton({ cooldownSeconds, onResend, status }: ResendButtonProps) {
  const isDisabled = cooldownSeconds > 0 || status === "resending";
  const isResending = status === "resending";

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {cooldownSeconds > 0 && (
        <p
          className="text-xs font-medium text-slate-500"
          aria-live="polite"
          aria-atomic="true"
        >
          Resend available in{" "}
          <span className="font-bold text-emerald-700 tabular-nums">
            {cooldownSeconds}s
          </span>
        </p>
      )}

      <button
        type="button"
        onClick={onResend}
        disabled={isDisabled}
        aria-busy={isResending}
        aria-label={
          isDisabled && cooldownSeconds > 0
            ? `Resend available in ${cooldownSeconds} seconds`
            : statusLabel[status]
        }
        className={[
          "relative w-full max-w-xs flex items-center justify-center gap-2",
          "rounded-full py-3 px-6 text-sm font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
          isDisabled
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-sm hover:shadow-md",
        ].join(" ")}
      >
        {isResending && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {statusLabel[status]}
      </button>
    </div>
  );
}
