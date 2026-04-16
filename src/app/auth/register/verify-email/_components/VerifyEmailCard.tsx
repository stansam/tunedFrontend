"use client";

/**
 * VerifyEmailCard — the interactive client shell of the verify-email page.
 *
 * This component:
 * - Owns the useVerifyEmail hook (the only stateful piece on this page)
 * - Composes the three sub-components: Header, ResendButton, SignInLink
 * - Displays feedback messages (success / error) below the resend button
 *
 * Architecture: all logic is in the hook; all rendering is in sub-components.
 * This component is intentionally thin (orchestrator only).
 */
import { VerifyEmailHeader } from "./VerifyEmailHeader";
import { ResendButton } from "./ResendButton";
import { SignInLink } from "./SignInLink";
import { useVerifyEmail } from "../_hooks/useVerifyEmail";
import type { VerifyEmailCardProps } from "../_props/verify-email.prop";

export function VerifyEmailCard({ email, callbackUrl }: VerifyEmailCardProps) {
  const { status, feedbackMessage, cooldownSeconds, handleResend } =
    useVerifyEmail(email);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Emerald accent bar */}
        <div className="h-1 w-full bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500" />

        <div className="flex flex-col items-center gap-8 px-6 py-10 md:px-10">
          {/* Static header */}
          <VerifyEmailHeader email={email} />

          {/* Divider */}
          <div className="w-full border-t border-slate-100" />

          {/* Resend section */}
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-xs text-slate-400 text-center">
              Didn&apos;t receive it?
            </p>

            <ResendButton
              cooldownSeconds={cooldownSeconds}
              onResend={handleResend}
              status={status}
            />

            {/* Feedback message */}
            {feedbackMessage && (
              <p
                role="status"
                aria-live="polite"
                className={[
                  "text-xs text-center font-medium px-3 py-1.5 rounded-full",
                  status === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700",
                ].join(" ")}
              >
                {feedbackMessage}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="w-full border-t border-slate-100" />

          {/* Sign-in link */}
          <SignInLink callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
