import { apiPost } from "@/api-client";
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
    message: parsed.data.message,
    status:  200,
  };
}
