import { z } from "zod";

export const NewsletterRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." }),
});

export const NewsletterResponseSchema = z.object({
  message:    z.string(),
  subscribed: z.boolean(),
});

export type NewsletterRequest  = z.infer<typeof NewsletterRequestSchema>;
export type NewsletterResponse = z.infer<typeof NewsletterResponseSchema>;
