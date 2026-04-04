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
  id: z
    .union([z.string(), z.number()])
    .transform((v) => String(v))
    .refine((v) => v.length > 0, { message: "User id must not be empty" }),
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
    .transform((v) => v ?? null),
  session_created_at: z
    .string()
    .nullable()
    .optional()
    .transform((v) => v ?? null),
});

export const AuthMeResponseSchema = AuthUserSchema;

export type AuthMeResponse = z.infer<typeof AuthMeResponseSchema>;

export const LogoutResponseSchema = z
  .object({
    success: z.boolean().optional(),
    message: z.string().optional(),
  })
  .passthrough();

export type { AuthMeResponse as ValidatedAuthUser };