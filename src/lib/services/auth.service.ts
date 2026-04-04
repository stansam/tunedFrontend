import { apiGet } from "@/api-client";
import { AuthMeResponseSchema } from "@/lib/schemas/auth.schema";
import type { AuthUser, ServerAuthResult } from "@/lib/types/auth.type";
import type { ApiResult } from "@/lib/types";

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
      console.error("[Auth] /api/auth/me schema violation:", parsed.error.format());
      console.log("[Auth] Raw response:", result.data);
    }
    return { ok: false, reason: "parse_error" };
  }

  return { ok: true, user: parsed.data as AuthUser };
}

export async function getServerAuthUser(): Promise<ServerAuthResult> {
  try {
    const result = await apiGet<unknown>("/auth/me", {
      cache: "no-store",
    });

    return parseAuthMeResult(result);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[Auth] Unexpected error in getServerAuthUser:", err);
    }
    return { ok: false, reason: "network_error" };
  }
}


export async function fetchClientAuthUser(): Promise<{
  user: AuthUser | null;
  reason: "ok" | "unauthenticated" | "network_error" | "parse_error";
}> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store",
        "Pragma": "no-cache",
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
        console.error("[Auth] Client /api/auth/me schema violation:", parsed.error.format());
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
    return res.ok;
  } catch {
    return false;
  }
}