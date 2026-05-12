import { apiGet, apiPost } from "@/api-client";
import { AuthMeResponseSchema, LogoutResponseSchema } from "@/lib/schemas/auth.schema";
import type { AuthUser } from "@/lib/types/auth.type";

export type FetchClientAuthResult = {
  readonly user: AuthUser | null;
  readonly reason: "ok" | "unauthenticated" | "network_error" | "parse_error";
};

export async function fetchClientAuthUser(): Promise<FetchClientAuthResult> {
  const result = await apiGet<unknown>("/auth/me", {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store",
      Pragma: "no-cache",
    },
  });

  if (!result.ok) {
    const status = result.error.status;
    if (status === 401 || status === 403) {
      return { user: null, reason: "unauthenticated" };
    }
    return { user: null, reason: "network_error" };
  }

  const parsed = AuthMeResponseSchema.safeParse(result.data);

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
}

export async function logoutUser(): Promise<boolean> {
  const result = await apiPost<unknown>("/auth/logout", {});

  if (!result.ok) return false;

  const parsed = LogoutResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    // Logout likely succeeded even if the response shape is unexpected
    return true;
  }

  return parsed.data.success !== false;
}