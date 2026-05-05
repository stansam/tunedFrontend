"use client";

import { useCallback } from "react";
import { useAuthContext } from "@/lib/auth/Context";
import { logoutUser } from "@/lib/services/auth.service";
import type { AuthUser, AuthStatus } from "@/lib/types/auth.type";

export interface UseAuthReturn {
  readonly status: AuthStatus;
  readonly user: AuthUser | null;
  readonly isLoading: boolean;
  readonly isAuthenticated: boolean;
  readonly isUnauthenticated: boolean;
  readonly isError: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
  readonly logoutAndRefresh: () => Promise<boolean>;
  readonly requireUser: () => AuthUser;
}

export function useAuth(): UseAuthReturn {
  const { status, user, isAuthenticated, error, refresh } = useAuthContext();

  const logoutAndRefresh = useCallback(async (): Promise<boolean> => {
    const success = await logoutUser();
    await refresh();
    return success;
  }, [refresh]);

  const requireUser = useCallback((): AuthUser => {
    if (status !== "authenticated" || user === null) {
      throw new Error(
        `[useAuth] requireUser() called with status="${status}". ` +
          "This indicates a component using requireUser() is being rendered " +
          "outside of an authenticated context. Wrap the component tree with " +
          "<AuthGuard> or withAuth() to prevent this."
      );
    }
    return user;
  }, [status, user]);

  return {
    status,
    user,
    isLoading: status === "loading",
    isAuthenticated,
    isUnauthenticated: status === "unauthenticated",
    isError: status === "error",
    error,
    refresh,
    logoutAndRefresh,
    requireUser,
  };
}