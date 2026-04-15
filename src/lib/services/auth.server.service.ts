/**
 * @file auth.server.service.ts
 * @description Server-only authentication service.
 *
 * ⚠️  SERVER ONLY — Do NOT import from Client Components or hooks.
 *
 * The `server-only` guard below causes an immediate build failure if this
 * module is ever accidentally imported from a Client Component boundary.
 * This is intentional — `getServerAuthUser` depends on `next/headers` which
 * is only available in Server Components and Route Handlers.
 *
 * Usage:
 *   import { getServerAuthUser } from "@/lib/services/auth.server.service";
 *   // Only valid inside: app/layout.tsx, app/page.tsx, Server Components,
 *   //                    Route Handlers, and Server Actions.
 */
import "server-only";

import { cookies } from "next/headers";
import { apiGet } from "@/api-client";
import { AuthMeResponseSchema } from "@/lib/schemas/auth.schema";
import type { AuthUser, ServerAuthResult } from "@/lib/types/auth.type";
import type { ApiResult } from "@/lib/types";

// ---------------------------------------------------------------------------
// Internal helper — parses the /api/auth/me result into a typed discriminated
// union so callers never have to inspect raw HTTP status codes.
// ---------------------------------------------------------------------------

function parseAuthMeResult(result: ApiResult<unknown>): ServerAuthResult {
  if (!result.ok) {
    const status = result.error.status;

    if (status === 401 || status === 403) {
      return { ok: false, reason: "unauthenticated" };
    }

    return { ok: false, reason: "network_error" };
  }

  const parsed = AuthMeResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[Auth/Server] /api/auth/me schema violation:",
        parsed.error.format(),
      );
      console.error("[Auth/Server] Raw response:", result.data);
    }
    return { ok: false, reason: "parse_error" };
  }

  return { ok: true, user: parsed.data as AuthUser };
}

// ---------------------------------------------------------------------------
// getServerAuthUser — validates the session from an incoming server request.
//
// HOW IT WORKS
// ────────────
// In a Server Component, Next.js does NOT automatically forward the browser's
// cookies to any outbound fetch calls you make.  If we call /api/auth/me
// without explicitly forwarding the session cookie, Flask always sees an
// unauthenticated (cookieless) request and returns 401 — even though the
// browser has a valid session.
//
// FIX: Read the session cookie from the incoming request via `cookies()` from
// next/headers, then manually inject it as a `Cookie` header in the outbound
// fetch to Flask.  Only the named session cookie is forwarded — never all
// cookies (principle of least privilege).
//
// RETURNS
// ───────
// { ok: true, user: AuthUser }         — valid session, user data attached
// { ok: false, reason: "unauthenticated" } — 401/403 from Flask
// { ok: false, reason: "network_error" }   — Flask unreachable / timeout
// { ok: false, reason: "parse_error" }     — unexpected response shape
// ---------------------------------------------------------------------------

export async function getServerAuthUser(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    const cookieName = process.env.SESSION_COOKIE_NAME ?? "tuned_session";
    const sessionCookie = cookieStore.get(cookieName);

    // Only include the Cookie header when we actually have the session cookie.
    // An empty Cookie header still triggers Flask's cookie parser, adding
    // unnecessary overhead.
    const extraHeaders: Record<string, string> | undefined = sessionCookie
      ? { Cookie: `${sessionCookie.name}=${sessionCookie.value}` }
      : undefined;

    const result = await apiGet<unknown>("/auth/me", {
      cache: "no-store",
      headers: extraHeaders,
    });

    return parseAuthMeResult(result);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[Auth/Server] Unexpected error in getServerAuthUser:", err);
    }
    return { ok: false, reason: "network_error" };
  }
}
