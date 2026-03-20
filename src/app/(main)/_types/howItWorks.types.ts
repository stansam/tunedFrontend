// export type HowItWorksStepId = string;

// export interface HowItWorksStep {
//   readonly id: HowItWorksStepId;
//   readonly title: string;
//   readonly description: string;
//   readonly image: string;
// }

import { z } from "zod";

export type ValidatedUrl = string & { readonly __brand: "ValidatedUrl" };


export const HowItWorksStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(600),
  image: z
    .string()
    .refine(
      (v) => v.startsWith("/") || v.startsWith("https://"),
      { message: "image must be a relative path or an https:// URL" }
    )
    .transform((v) => v as ValidatedUrl),
});

export const HowItWorksStepsSchema = z
  .array(HowItWorksStepSchema)
  .min(1)
  .max(20);


export type HowItWorksStepId = string;

export type HowItWorksStep = z.infer<typeof HowItWorksStepSchema>;

export type HowItWorksSteps = z.infer<typeof HowItWorksStepsSchema>;
