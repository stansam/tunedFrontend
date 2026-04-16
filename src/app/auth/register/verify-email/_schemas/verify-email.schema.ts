import { z } from "zod";

export const ResendSuccessResponseSchema = z.object({
  message: z.string().min(1),
});

export const ConfirmResponseSchema = z.object({
  verified: z.boolean(),
  already_verified: z.boolean().optional(),
});

export const ResendErrorResponseSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ResendSuccessResponse = z.infer<typeof ResendSuccessResponseSchema>;
export type ConfirmResponse = z.infer<typeof ConfirmResponseSchema>;
