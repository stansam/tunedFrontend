/**
 * Prop interfaces for verify-email components.
 *
 * Centralised here so components remain pure-type-import consumers
 * and don't import from each other's internals.
 */
import type { VerifyEmailStatus, ResendResult } from "../_types/verify-email.type";

/** Props for the top-level VerifyEmailCard client component. */
export interface VerifyEmailCardProps {
  /** The email address to display and use for resend requests. */
  readonly email: string;
  /** Optional: passed through to the Sign In link as a callbackUrl. */
  readonly callbackUrl?: string;
}

/** Props for the static header section (icon + heading + copy). */
export interface VerifyEmailHeaderProps {
  readonly email: string;
}

/** Props for the timed resend button. */
export interface ResendButtonProps {
  /** Seconds remaining in the cooldown. 0 means the button is enabled. */
  readonly cooldownSeconds: number;
  /** Called when the user clicks the button (outside of cooldown). */
  readonly onResend: () => Promise<void>;
  /** Current async status of the resend operation. */
  readonly status: VerifyEmailStatus;
}

/** Props for the sign-in link at the bottom of the card. */
export interface SignInLinkProps {
  /** Forwarded to /auth/login as ?callbackUrl= */
  readonly callbackUrl?: string;
}
