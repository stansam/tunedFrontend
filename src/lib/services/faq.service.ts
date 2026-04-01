import { apiGet } from "@/api-client";
import { FaqListSchema } from "@/lib/schemas/faq.schema";
import type { ApiResult } from "@/lib/types";
import type { FaqItem } from "@/app/(main)/faqs/_types/faq.types";
import { faqSlug } from "@/app/(main)/faqs/_types/faq.types";

function toFaqItem(raw: {
  question: string;
  answer:   string;
  category: string;
  order:    number;
}): FaqItem {
  return {
    id:       faqSlug(raw.question),
    question: raw.question,
    answer:   raw.answer,
    category: raw.category,
    order:    raw.order,
  };
}

export async function fetchFaqs(): Promise<ApiResult<FaqItem[]>> {
  const result = await apiGet<unknown>("/faqs", {
    next: { revalidate: 3600, tags: ["faqs"] },
  });

  if (!result.ok) return result;

  const parsed = FaqListSchema.safeParse(result.data);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalizedErrors: Record<string, string[]> = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
    );

    return {
      ok: false,
      error: {
        message: "Invalid FAQ response from server.",
        errors:  normalizedErrors,
        status:  "PARSE_ERROR",
      },
    };
  }

  return {
    ok:      true,
    data:    parsed.data.map(toFaqItem),
    message: "FAQs fetched successfully.",
    status:  200,
  };
}
