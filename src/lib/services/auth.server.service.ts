import "server-only";

import { cookies } from "next/headers";
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

export async function getServerAuthUser(): Promise<ServerAuthResult> {
  try {
    const cookieStore = await cookies();
    // const cookieHeader = cookieStore.toString();
    const cookieName = process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "tuned_session";
    const sessionCookie = cookieStore.get(cookieName);
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
