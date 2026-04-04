"use client";
// lib/hooks/useAuth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Consume auth state anywhere in the client tree.
// Throws if called outside <AuthProvider> so misuse is caught at dev time.
// ─────────────────────────────────────────────────────────────────────────────

import { useContext } from "react";
import { AuthContext } from "@/lib/auth/Context";
import type { AuthUser } from "@/lib/types/auth.type";
import type { ApiResult } from "@/lib/types";
import type { LoginCredentials, RegisterCredentials } from "@/lib/types/auth.type";

export interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<ApiResult<AuthUser>>;
  register: (credentials: RegisterCredentials) => Promise<ApiResult<AuthUser>>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "[useAuth] must be used within <AuthProvider>. " +
        "Wrap your root layout (or the subtree that needs auth) with <AuthProvider initialUser={...}>."
    );
  }

  return {
    user: ctx.user,
    isAuthenticated: ctx.status === "authenticated",
    isLoading: ctx.status === "loading" || ctx.status === "idle",
    error: ctx.error,
    login: ctx.login,
    register: ctx.register,
    logout: ctx.logout,
    refresh: ctx.refresh,
  };
}