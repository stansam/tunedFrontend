/**
 * SignInLink — navigates to /auth/login with optional callbackUrl.
 *
 * Pure display component with no state.
 */
import Link from "next/link";
import type { SignInLinkProps } from "../_props/verify-email.prop";

export function SignInLink({ callbackUrl }: SignInLinkProps) {
  const href = callbackUrl
    ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/auth/login";

  return (
    <div className="text-center text-sm text-slate-500">
      Already verified?{" "}
      <Link
        href={href as never}
        className="font-semibold text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline transition-colors"
      >
        Sign in
      </Link>
    </div>
  );
}
