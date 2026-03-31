"use server";

import { subscribeNewsletter } from "@/lib/services/newsletter.service";
import type { ApiResult } from "@/lib/types";
import type { NewsletterResponse } from "@/lib/schemas/newsletter.schema";

export async function subscribeToNewsletter(
  email: string
): Promise<ApiResult<NewsletterResponse>> {
  return subscribeNewsletter(email);
}
