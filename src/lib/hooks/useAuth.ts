"use client";

/**
 * @file useAuth.ts
 * @description Primary application hook for consuming auth state.
 *
 * This is the hook that components throughout your app should import.
 * It provides a clean, documented interface on top of the raw context.
 *
 * Features:
 *  - Fully typed with discriminated status for exhaustive handling
 *  - Convenience booleans (isLoading, isAuthenticated, isError)
 *  - Guards: requireUser() throws a typed error for components that
 *    need a guaranteed non-null user without inline null checks
 *  - logoutAndRefresh() for clean sign-out flow
 *
 * @example
 *   // Basic usage
 *   const { isAuthenticated, user } = useAuth();
 *   if (!isAuthenticated) return <LoginPrompt />;
 *   return <Welcome name={user.name} />;
 *
 * @example
 *   // Exhaustive status handling
 *   const { status, user } = useAuth();
 *   switch (status) {
 *     case "loading":         return <Spinner />;
 *     case "authenticated":   return <Dashboard user={user!} />;
 *     case "unauthenticated": return <LoginPage />;
 *     case "error":           return <ErrorState />;
 *   }
 *
 * @example
 *   // Inside a protected component where auth is guaranteed by a parent guard
 *   const { requireUser } = useAuth();
 *   const user = requireUser(); // AuthUser — never null here
 */


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