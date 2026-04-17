import type { VerifyEmailStatus } from "../_types/verify-email.type";

export interface VerifyEmailCardProps {
  readonly email: string;
  readonly callbackUrl?: string;
}

export interface VerifyEmailHeaderProps {
  readonly email: string;
}

export interface ResendButtonProps {
  readonly cooldownSeconds: number;
  readonly onResend: () => Promise<void>;
  readonly status: VerifyEmailStatus;
}

export interface SignInLinkProps {
  readonly callbackUrl?: string;
}
