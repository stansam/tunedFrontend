export const ALL_CATEGORY = "All" as const;
export type AllCategory = typeof ALL_CATEGORY;

export interface FaqItem {
  readonly id:       string;
  readonly question: string;
  readonly answer:   string;
  readonly category: string;
  readonly order:    number;
}

export type FaqCategories = readonly [AllCategory, ...string[]];

export function deriveFaqCategories(faqs: readonly FaqItem[]): FaqCategories {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const faq of faqs) {
    if (!seen.has(faq.category)) {
      seen.add(faq.category);
      ordered.push(faq.category);
    }
  }
  return [ALL_CATEGORY, ...ordered];
}

export function faqSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}
