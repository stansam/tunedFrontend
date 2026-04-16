/**
 * Zod schemas for the verify-email domain.
 *
 * Schema layer is separate from types (types describe shape;
 * schemas validate runtime data from APIs).
 */
import { z } from "zod";

/**
 * Schema for POST /api/auth/email/verify/resend success response.
 * The API always returns 200 with a message (anti-enumeration).
 */
export const ResendSuccessResponseSchema = z.object({
  message: z.string().min(1),
});

/**
 * Schema for GET /api/auth/email/verify/confirm response.
 */
export const ConfirmResponseSchema = z.object({
  verified: z.boolean(),
  already_verified: z.boolean().optional(),
});

/**
 * Schema for the error shape the API returns on 429 / 4xx responses.
 */
export const ResendErrorResponseSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ResendSuccessResponse = z.infer<typeof ResendSuccessResponseSchema>;
export type ConfirmResponse = z.infer<typeof ConfirmResponseSchema>;
