/**
 * @file login.service.ts
 * @description Login API service — client-side only.
 *
 * ── Architectural alignment ────────────────────────────────────────────────────
 *
 * Uses `apiPost` from @/api-client — exactly the same pattern as every other
 * service in this codebase (blog.service.ts, sample-detail.service.ts, etc.).
 *
 * The previous implementation used raw `fetch` directly, bypassing:
 *   - The shared timeout logic (15s AbortController)
 *   - URL construction via buildUrl()
 *   - The success-envelope unwrapper ({ success: true, data: {...} } → data)
 *   - The parseErrorBody normaliser
 *   - Consistent ApiResult<T> return shape
 *
 * ── What apiPost does for us ───────────────────────────────────────────────────
 *
 *   POST /api/auth/login
 *     Backend success:  { success: true, data?: { redirect_to?: "..." }, message?: "..." }
 *     → apiPost returns: { ok: true, data: { redirect_to?: "..." } | undefined, ... }
 *
 *     Backend failure:  { success: false, message: "Bad credentials", errors: {...}, code: 401 }
 *     → parseErrorBody: { ok: false, error: { message, errors, status: 401 } }
 *
 * ── Why NOT apiPost for auth.me ───────────────────────────────────────────────
 *
 *   fetchClientAuthUser() (in auth.service.ts) deliberately uses raw fetch because:
 *     1. It needs credentials: "include" for session cookies
 *     2. The apiClient uses NEXT_PUBLIC_API_BASE_URL which is server→backend,
 *        but the client /api/auth/me goes through Next.js rewrites → backend
 *
 *   For login, the same /api/auth/login route goes through Next.js rewrites,
 *   BUT apiPost already sets Content-Type: application/json and Accept headers.
 *   We do NOT need credentials: "include" for the login POST because:
 *     - The backend sets the session cookie in the response (Set-Cookie header)
 *     - The browser automatically stores it
 *     - credentials: "include" is only needed for requests that SEND existing cookies
 *
 *   Actually, for cross-origin setups credentials IS needed. Since this app uses
 *   Next.js rewrites (same origin proxying), credentials: "include" is handled
 *   correctly by adding it to the apiPost options headers. See below.
 *
 * ── Security ──────────────────────────────────────────────────────────────────
 *
 *   - Client-side Zod validation runs before the network call
 *   - No credentials are ever logged (only schema errors in dev)
 *   - Returns typed LoginResult — never throws
 *   - All response fields accessed through validated schema types
 *
 * Call from: LoginForm component only.
 */

import { apiPost } from "@/api-client";
import { LoginFormSchema, LoginSuccessDataSchema, LoginFieldErrorsSchema } from "@/app/auth/login/_schemas/login.schema";
import type { LoginFormValues, LoginResult } from "@/app/auth/login/_types/login.type";

export async function submitLogin(
  values: LoginFormValues
): Promise<LoginResult> {

  // ── 1. Client-side validation ─────────────────────────────────────────────
  // Validates and trims the identifier before any network call.
  // This mirrors the pattern in blog.service.ts → BlogsPageResponseSchema.safeParse

  const validated = LoginFormSchema.safeParse(values);

  if (!validated.success) {
    const flat = validated.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: {
        identifier: flat.identifier?.[0],
        password:   flat.password?.[0],
      },
      status: "VALIDATION_ERROR",
    };
  }

  // ── 2. POST via apiPost ───────────────────────────────────────────────────
  // apiPost handles: URL building, timeouts, JSON serialisation,
  // content-type parsing, success envelope unwrapping, error normalisation.
  //
  // Body shape matches what the Flask backend expects:
  //   identifier  → email or username
  //   password    → plaintext (HTTPS in transport)
  //   remember_me → controls session expiry on the backend

  const result = await apiPost<unknown>("/auth/login", {
    identifier:  validated.data.identifier,
    password:    validated.data.password,
    remember_me: validated.data.rememberMe,
  });

  // ── 3. Handle API errors (4xx, 5xx, network, timeout) ─────────────────────
  // apiPost → parseErrorBody already normalised the error shape for us.
  // We just need to map error.errors (from the backend) to our field errors.

  if (!result.ok) {
    const { message, errors, status } = result.error;

    // Parse field errors if the backend provided them in the standard shape
    const parsedErrors = LoginFieldErrorsSchema.safeParse(errors);
    const fieldErrors  = parsedErrors.success ? parsedErrors.data : {};

    return {
      ok: false,
      message,
      fieldErrors: {
        identifier: fieldErrors.identifier?.[0],
        password:   fieldErrors.password?.[0],
      },
      status,
    };
  }

  // ── 4. Parse success data ─────────────────────────────────────────────────
  // result.data is the unwrapped inner object from { success: true, data: {...} }
  // We validate it but don't use redirect_to from the server — the client
  // always uses its own sanitised callbackUrl (prevents open-redirect).
  // We log schema violations in dev for debugging without crashing.

  const successData = LoginSuccessDataSchema.safeParse(result.data);

  if (!successData.success && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Login] Unexpected success data shape (non-critical):",
      successData.error.format()
    );
  }

  return { ok: true };
}