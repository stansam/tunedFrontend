import { z } from "zod";

/**
 * Schema for the user 
 * Strict on:
 *  - name and email must be non-empty strings
 *  - email must pass basic format validation
 *  - No extra data is stripped by .strict() to allow backend to add fields
 *    without breaking the frontend (passthrough is intentional)
 */
export const AuthUserSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, "Name must not be empty")
    .max(255, "Name is too long"),
  email: z
    .string()
    .email("Invalid email address in auth/me response"),
  avatar_url: z
    .string()
    .url()
    .nullable()
    .optional()
    .default(null),
  session_created_at: z
    .string()
});

export const AuthMeResponseSchema = AuthUserSchema.passthrough();

export type AuthMeResponse = z.infer<typeof AuthMeResponseSchema>;

export const LogoutResponseSchema = z
  .object({
    success: z.boolean().optional(),
    message: z.string().optional(),
  })
  .passthrough();

export type { AuthMeResponse as ValidatedAuthUser };