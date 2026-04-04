// lib/services/auth.service.ts
// ─────────────────────────────────────────────────────────────────────────────
// All auth calls are routed through the shared api-client so timeout handling,
// error normalisation, and response-envelope unwrapping are handled in one place.
//
// The backend is expected to set / clear an HttpOnly session cookie on login
// and logout — no tokens are stored or read here.
// ─────────────────────────────────────────────────────────────────────────────

import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import type {
  AuthUser,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@/lib/types/auth.type";

const ENDPOINTS = {
  ME: "/auth/me",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
} as const;


function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v["id"] === "string" &&
    typeof v["name"] === "string" &&
    typeof v["email"] === "string"
  );
}


export async function fetchCurrentUser(): Promise<ApiResult<AuthUser>> {
  const result = await apiGet<AuthUser>(ENDPOINTS.ME, {
    next: { revalidate: 0 },
  });

  if (result.ok && !isAuthUser(result.data)) {
    return {
      ok: false,
      error: {
        message: "Unexpected response shape from /auth/me",
        errors: { "": [] },
        status: 502,
      },
    };
  }

  return result;
}

export async function login(
  credentials: LoginCredentials
): Promise<ApiResult<AuthResponse>> {
  return apiPost<AuthResponse>(ENDPOINTS.LOGIN, credentials);
}

export async function register(
  credentials: RegisterCredentials
): Promise<ApiResult<AuthResponse>> {
  return apiPost<AuthResponse>(ENDPOINTS.REGISTER, credentials);
}

export async function logout(): Promise<ApiResult<void>> {
  return apiPost<void>(ENDPOINTS.LOGOUT, {});
}