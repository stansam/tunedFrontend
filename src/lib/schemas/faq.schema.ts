import { z } from "zod";

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer:   z.string().min(1),
  category: z.string().min(1),
  order:    z.number().int().nonnegative(),
});

export const FaqListSchema = z.array(FaqItemSchema);

export type RawFaqItem = z.infer<typeof FaqItemSchema>;
