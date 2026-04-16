export type VerifyEmailStatus =
  | "idle"
  | "resending"
  | "resent"
  | "error";

export type ResendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly message: string; readonly cooldownSeconds?: number };

export interface VerifyEmailPageProps {
  readonly searchParams: Promise<{
    email?: string;
    callbackUrl?: string;
  }>;
}
