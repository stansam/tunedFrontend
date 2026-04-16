import { apiPost, apiGet } from "@/api-client";
import {
  ResendSuccessResponseSchema,
  ConfirmResponseSchema,
} from "../_schemas/verify-email.schema";
import type { ResendResult } from "../_types/verify-email.type";

const RESEND_ENDPOINT = "/auth/email/verify/resend";

export async function resendVerificationEmail(email: string): Promise<ResendResult> {
  const result = await apiPost<unknown>(RESEND_ENDPOINT, { email });

  if (!result.ok) {
    const { message, status } = result.error;

    if (status === 429) {
      const match = /(\d+)\s*second/i.exec(message ?? "");
      const cooldownSeconds = match?.[1] ? parseInt(match[1], 10) : 60;
      return {
        ok: false,
        message: message ?? "Please wait before requesting another email.",
        cooldownSeconds,
      };
    }

    return {
      ok: false,
      message: message ?? "Could not send verification email. Please try again.",
    };
  }

  const parsed = ResendSuccessResponseSchema.safeParse(result.data);
  if (!parsed.success && process.env.NODE_ENV !== "production") {
    console.warn("[verify-email] Unexpected resend response shape:", result.data);
  }

  return { ok: true };
}

export async function confirmEmailVerification(
  uid: string,
  token: string
): Promise<{ verified: boolean; reason?: string }> {
  const result = await apiGet<unknown>(
    `/auth/email/verify/confirm?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`
  );

  if (!result.ok) {
    return { verified: false, reason: result.error.message };
  }

  const parsed = ConfirmResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    return { verified: false, reason: "unexpected_response" };
  }

  return { verified: parsed.data.verified };
}
