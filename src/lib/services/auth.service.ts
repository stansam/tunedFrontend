/**
 * @file auth.service.ts
 * @description Client-safe authentication service.
 *
 * This module is safe to import from Client Components, hooks, and the
 * server-side (RSC) that do NOT need cookie forwarding.
 *
 * It does NOT import from "next/headers" — keeping it free of any
 * Server-only module contamination so Client Component bundlers can safely
 * include it.
 *
 * For the server-side session check (SSR / RSC), import from:
 *   "@/lib/services/auth.server.service"
 */

import { AuthMeResponseSchema, LogoutResponseSchema } from "@/lib/schemas/auth.schema";
import type { AuthUser } from "@/lib/types/auth.type";

// ---------------------------------------------------------------------------
// fetchClientAuthUser — Client-side session check
//
// Calls the Next.js rewrite proxy at /api/auth/me (same-origin relative URL).
// The rewrite proxy forwards all headers — including the session cookie —
// to Flask, so `credentials: "include"` is all that is needed here.
//
// Returns a discriminated result type, never throws.
// ---------------------------------------------------------------------------

export type FetchClientAuthResult = {
  readonly user: AuthUser | null;
  readonly reason: "ok" | "unauthenticated" | "network_error" | "parse_error";
};

export async function fetchClientAuthUser(): Promise<FetchClientAuthResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (res.status === 401 || res.status === 403) {
      return { user: null, reason: "unauthenticated" };
    }

    if (!res.ok) {
      return { user: null, reason: "network_error" };
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return { user: null, reason: "parse_error" };
    }

    const json: unknown = await res.json();

    // Unwrap the Flask success envelope { success: true, data: {...} } if
    // present, then fall back to treating the raw body as the user object.
    const raw =
      json !== null &&
      typeof json === "object" &&
      "success" in json &&
      (json as Record<string, unknown>).success === true &&
      "data" in json
        ? (json as Record<string, unknown>).data
        : json;

    const parsed = AuthMeResponseSchema.safeParse(raw);

    if (!parsed.success) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[Auth] Client /api/auth/me schema violation:",
          parsed.error.format(),
        );
      }
      return { user: null, reason: "parse_error" };
    }

    return { user: parsed.data as AuthUser, reason: "ok" };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === "AbortError") {
      return { user: null, reason: "network_error" };
    }

    if (process.env.NODE_ENV !== "production") {
      console.error("[Auth] fetchClientAuthUser unexpected error:", err);
    }
    return { user: null, reason: "network_error" };
  }
}

// ---------------------------------------------------------------------------
// logoutUser — POST /api/auth/logout via the Next.js rewrite proxy.
//
// Validates the response body using LogoutResponseSchema so that an HTTP 200
// with { success: false } in the body is correctly treated as a failure,
// rather than blindly trusting the HTTP status code alone.
//
// Returns true on successful logout, false on any failure.
// Never throws.
// ---------------------------------------------------------------------------

export async function logoutUser(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store",
      },
    });

    if (!res.ok) return false;

    // Attempt to validate the response body.  If the body is missing or
    // non-JSON (e.g. server timed out mid-response), fall back to trusting
    // the HTTP 200 status code.
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      // HTTP 200 but body could not be parsed → trust the status code.
      return true;
    }

    const parsed = LogoutResponseSchema.safeParse(body);
    if (!parsed.success) {
      // Non-standard body shape but HTTP 200 → trust the status code.
      return true;
    }

    // If the body explicitly says success: false, honour that signal.
    return parsed.data.success !== false;
  } catch {
    return false;
  }
}