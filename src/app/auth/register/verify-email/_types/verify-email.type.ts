/**
 * Type definitions for the verify-email page.
 *
 * Kept in its own file per the strict separation-of-concerns architecture:
 * types live in _types/, not inline in components or hooks.
 */

/** Lifecycle states of the resend action. */
export type VerifyEmailStatus =
  | "idle"      // Initial state — no resend attempted yet
  | "resending" // POST /api/auth/email/verify/resend in flight
  | "resent"    // Email re-queued successfully — cooldown active
  | "error";    // Resend failed (network or server error)

/** Result returned by resendVerificationEmail() in the service layer. */
export type ResendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly message: string; readonly cooldownSeconds?: number };

/** Props accepted by the verify-email page's Server Component. */
export interface VerifyEmailPageProps {
  readonly searchParams: Promise<{
    email?: string;
    callbackUrl?: string;
  }>;
}
