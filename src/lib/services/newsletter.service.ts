import { apiPost, apiGet } from "@/api-client";
import {
  NewsletterRequestSchema,
  NewsletterResponseSchema,
  type NewsletterResponse,
} from "@/lib/schemas/newsletter.schema";
import type { ApiResult } from "@/lib/types";

export async function subscribeNewsletter(
  email: string
): Promise<ApiResult<NewsletterResponse>> {
  const validation = NewsletterRequestSchema.safeParse({ email });

  if (!validation.success) {
    return {
      ok: false,
      error: {
        message:
          validation.error.issues[0]?.message ?? "Invalid email address.",
        errors: validation.error.flatten().fieldErrors as Record<
          string,
          string[]
        >,
        status: "PARSE_ERROR",
      },
    };
  }

  const result = await apiPost<NewsletterResponse>(
    "/newsletter/subscribe",
    validation.data
  );

  if (!result.ok) return result;

  const parsed = NewsletterResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return {
      ok: false,
      error: {
        message: "Unexpected response from newsletter service.",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok:      true,
    data:    parsed.data,
    message: parsed.data.message ?? result.message ?? "Successfully subscribed.",
    status:  200,
  };
}

export async function unsubscribeNewsletter(
  token: string
): Promise<ApiResult<{ unsubscribed: boolean }>> {
  if (!token.trim()) {
    return {
      ok: false,
      error: {
        message: "Invalid or missing unsubscribe token.",
        errors: { token: ["Token is required"] },
        status: "PARSE_ERROR",
      },
    };
  }

  const result = await apiPost<{ unsubscribed: boolean }>(
    "/newsletter/unsubscribe",
    { token }
  );

  return result;
}

export async function validateUnsubscribeToken(
  token: string
): Promise<ApiResult<{ email: string }>> {
  if (!token.trim()) {
    return {
      ok: false,
      error: {
        message: "Invalid or missing token.",
        errors: { token: ["Token is required"] },
        status: "PARSE_ERROR",
      },
    };
  }

  return apiGet<{ email: string }>(
    `/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
  );
}
