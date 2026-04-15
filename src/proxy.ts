/**
 * @file proxy.ts
 * @description Next.js Edge-layer route guard.
 *
 * ─── How this works ──────────────────────────────────────────────────────────
 *
 * This file is the Next.js "middleware" equivalent for this project.
 * In the current Next.js version, `middleware.ts` is deprecated. Instead,
 * this file is imported and invoked by `next.config.ts` via the `rewrites()`
 * function and the exported `config` matcher.
 *
 * ─── Security model (2-layer architecture) ───────────────────────────────────
 *
 * Layer 1 — proxy.ts (this file, runs at Edge):
 *   Performs a fast cookie-PRESENCE check.  If the `tuned_session` cookie is
 *   absent, the user is definitely unauthenticated → redirect to /auth/login.
 *   This Edge check is intentionally shallow because:
 *     - Edge functions cannot make external network requests to validate the
 *       session cryptographically.
 *     - It prevents unauthenticated users from consuming server resources.
 *     - Spoofing the cookie name grants ZERO access to real data — all data
 *       fetches go through Flask which validates the session server-side.
 *
 * Layer 2 — Server Components (getServerAuthUser):
 *   Every protected Server Component calls getServerAuthUser() which forwards
 *   the session cookie to Flask's /api/auth/me endpoint.  Flask validates the
 *   session cryptographically (Werkzeug signed cookie).  A garbage cookie
 *   value is rejected here with a 401, and the component redirects again.
 *   This is the REAL authentication gate.
 *
 * Together these two layers mean:
 *   - Unauthenticated users (no cookie) are bounced cheaply at the Edge.
 *   - Cookie-forgers (garbage value) are bounced at the Server Component layer.
 *   - No authenticated data is ever served to an invalid session.
 *
 * ─── callbackUrl security ────────────────────────────────────────────────────
 *
 * When redirecting to /auth/login, the current path is embedded as callbackUrl.
 * The path is sanitized via sanitizeProxyPath() to prevent Open Redirect attacks
 * before embedding it in the redirect URL.
 *
 * The login page's sanitizeCallbackUrl() utility provides a second validation
 * layer when the callbackUrl is read back after login.
 */

import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Configuration — which routes this guard applies to.
// Exported and consumed by next.config.ts.
// ---------------------------------------------------------------------------

export const config = {
  matcher: [
    "/client/:path*",
    "/admin/:path*",
    "/auth/login",
    "/auth/register",
  ],
};

// ---------------------------------------------------------------------------
// Path sanitization for callbackUrl embedding
//
// Strips any character that could form a protocol, host, or authority
// component from a path.  The allowlist is intentionally narrow:
//   /  a-z  A-Z  0-9  -  _  .  ~  %
// Only the literal "%XX" is allowed (percent-encoding); "%" alone is
// a corner case but harmless in a path context after encoding the URL.
// ---------------------------------------------------------------------------

function sanitizeProxyPath(path: string): string {
  return path.replace(/[^\w/.\-%~]/g, "");
}

// ---------------------------------------------------------------------------
// Cookie names — must match Flask SESSION_COOKIE_NAME config.
// ---------------------------------------------------------------------------

const SESSION_COOKIE_NAME =
  process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "tuned_session";

// ---------------------------------------------------------------------------
// Route classification
// ---------------------------------------------------------------------------

function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/client") ||
    pathname.startsWith("/admin")
  );
}

function isAuthRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  );
}

// ---------------------------------------------------------------------------
// Middleware entry point
// ---------------------------------------------------------------------------

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

  // ── Protected routes — /client/* and /admin/* ─────────────────────────────
  if (isProtectedRoute(pathname) && !hasSession) {
    const loginUrl = new URL("/auth/login", request.url);
    const safePath = sanitizeProxyPath(pathname);
    loginUrl.searchParams.set("callbackUrl", safePath);
    return NextResponse.redirect(loginUrl);
  }

  // ── Auth routes — redirect already-authenticated users away ───────────────
  // Note: This is a best-effort check only.  The login/register pages also
  // call getServerAuthUser() server-side which performs the real validation.
  if (isAuthRoute(pathname) && hasSession) {
    const dashboard = new URL(
      process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? "/client",
      request.url,
    );
    return NextResponse.redirect(dashboard);
  }

  return NextResponse.next();
}