// import { z } from "zod";

// export const LoginFormSchema = z.object({
//   identifier: z
//     .string()
//     .min(1, "Email or username is required")
//     .max(254, "Email or username is too long")
//     .transform((v) => v.trim()),

//   password: z
//     .string()
//     .min(1, "Password is required")
//     .max(256, "Password is too long"),

//   rememberMe: z.boolean().default(false),
// });

// export type LoginFormInput = z.infer<typeof LoginFormSchema>;

// export const LoginResponseSchema = z.discriminatedUnion("success", [
//   z.object({
//     success: z.literal(true),
//     data: z
//       .object({
//         redirect_to: z.string().optional(),
//       })
//       .optional(),
//     message: z.string().optional(),
//   }),
//   z.object({
//     success: z.literal(false),
//     message: z.string().default("Login failed. Please try again."),
//     errors: z
//       .object({
//         identifier: z.array(z.string()).optional(),
//         password: z.array(z.string()).optional(),
//       })
//       .optional(),
//     code: z.union([z.number(), z.string()]).optional(),
//   }),
// ]);

// export type LoginResponse = z.infer<typeof LoginResponseSchema>;
/**
 * @file login.schema.ts
 * @description Zod schemas for login form validation and API response parsing.
 *
 * Critical architectural alignment with apiPost (from @/api-client):
 *
 *   apiPost unwraps the { success: true, data: {...} } envelope before returning.
 *   When the backend returns:
 *     { success: true, data: { redirect_to: "/client" }, message: "OK" }
 *
 *   apiPost yields:
 *     { ok: true, data: { redirect_to: "/client" }, message: "OK", status: 200 }
 *
 *   So LoginSuccessDataSchema validates `result.data` — the unwrapped inner object,
 *   NOT the full envelope. The full envelope is only seen if the backend sends
 *   a non-standard response; apiPost handles that case too (returns data = jsonBody).
 *
 * For error responses the backend sends:
 *   { success: false, message: "...", errors: { identifier: [...], ... }, code: 401 }
 *   apiPost → parseErrorBody → { ok: false, error: { message, errors, status } }
 *   These are handled by the ApiResult<T> error path in login.service.ts.
 */

import { z } from "zod";

// ─── Form validation ──────────────────────────────────────────────────────────

export const LoginFormSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required")
    .max(254, "Email or username is too long")
    // Trim whitespace — prevents " user@email.com " from failing unnecessarily
    .transform((v) => v.trim()),

  password: z
    .string()
    .min(1, "Password is required")
    // Hard cap prevents DoS via excessively long payloads
    .max(256, "Password is too long"),

  rememberMe: z.boolean().default(false),
});

export type LoginFormInput = z.infer<typeof LoginFormSchema>;

// ─── Login success data (what apiPost gives us in result.data on success) ─────

/**
 * The inner `data` object from a successful login response.
 *
 * Backend may include a `redirect_to` hint. We validate it but apply
 * our own sanitisation before use (never trust a server-supplied redirect).
 */
export const LoginSuccessDataSchema = z
  .object({
    redirect_to: z.string().optional(),
  })
  // .passthrough() allows the backend to add extra fields without breaking us
  .passthrough()
  // Nullable because some backends return null data on success, or no data at all
  .nullable()
  .optional();

export type LoginSuccessData = z.infer<typeof LoginSuccessDataSchema>;

// ─── Login API field errors (from ApiResult error.errors shape) ───────────────

/**
 * The `errors` map inside a failed login ApiResult.
 *
 * apiPost → parseErrorBody sets:
 *   error.errors = body?.errors ?? { "": [] }
 *
 * For login, the backend typically sends:
 *   { errors: { identifier: ["Invalid credentials"], password: [...] } }
 */
export const LoginFieldErrorsSchema = z
  .object({
    identifier: z.array(z.string()).optional(),
    password:   z.array(z.string()).optional(),
    // Catch-all key for non-field server errors (e.g. rate-limiting message)
    "":         z.array(z.string()).optional(),
  })
  .passthrough();

export type LoginApiFieldErrors = z.infer<typeof LoginFieldErrorsSchema>;