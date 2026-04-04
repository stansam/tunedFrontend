import { cookies, headers } from "next/headers";
import type { AuthUser } from "@/lib/types/auth.type";

const AUTH_ME_URL = process.env.AUTH_ME_URL;
const TIMEOUT_MS = 5_000;

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v["id"] === "string" &&
    typeof v["name"] === "string" &&
    typeof v["email"] === "string"
  );
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const incomingHeaders = await headers();
    const forwardedFor =
      incomingHeaders.get("x-forwarded-for") ??
      incomingHeaders.get("cf-connecting-ip") ??
      "";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(AUTH_ME_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: cookieHeader,
          ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}),
        },
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    // 401 / 403 → unauthenticated (expected path, not an error)
    if (response.status === 401 || response.status === 403) return null;

    if (!response.ok) {
      console.error(`[getAuthUser] Unexpected ${response.status} from ${AUTH_ME_URL}`);
      return null;
    }

    const body: unknown = await response.json();

    const candidate =
      body &&
      typeof body === "object" &&
      "data" in (body as object)
        ? (body as Record<string, unknown>)["data"]
        : body;

    const user =
      candidate &&
      typeof candidate === "object" &&
      "user" in (candidate as object)
        ? (candidate as Record<string, unknown>)["user"]
        : candidate;

    if (!isAuthUser(user)) {
      console.error("[getAuthUser] Unexpected /auth/me response shape", body);
      return null;
    }

    return { id: user.id, name: user.name, email: user.email };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      console.warn(`[getAuthUser] Timed out after ${TIMEOUT_MS}ms`);
    } else {
      console.error("[getAuthUser] Failed:", err);
    }
    return null;
  }
}