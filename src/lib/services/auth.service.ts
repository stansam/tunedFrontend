import { AuthMeResponseSchema, LogoutResponseSchema } from "@/lib/schemas/auth.schema";
import type { AuthUser } from "@/lib/types/auth.type";

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

    let body: unknown;
    try {
      body = await res.json();
    } catch {
      return true;
    }

    const parsed = LogoutResponseSchema.safeParse(body);
    if (!parsed.success) {
      return true;
    }

    return parsed.data.success !== false;
  } catch {
    return false;
  }
}