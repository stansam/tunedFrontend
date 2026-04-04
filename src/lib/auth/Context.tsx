"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  // type ReactNode,
} from "react";
import { fetchClientAuthUser } from "@/lib/services/auth.service";
import type { AuthContextValue, AuthStatus, AuthUser } from "@/lib/types/auth.type";
import type { AuthProviderProps } from "../props/auth.props";

const AuthContext = createContext<AuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";

export function AuthProvider({
  children,
  initialUser = null,
  skipInitialFetch = false,
}: AuthProviderProps) {
  const initialStatus: AuthStatus =
    initialUser !== null ? "authenticated" : "loading";

  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [status, setStatus] = useState<AuthStatus>(initialStatus);
  const [error, setError] = useState<string | null>(null);

  const fetchingRef = useRef(false);
  const mountedRef = useRef(true);

  const doFetch = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    if (mountedRef.current) {
      setStatus("loading");
      setError(null);
    }

    const { user: fetchedUser, reason } = await fetchClientAuthUser();

    if (!mountedRef.current) {
      fetchingRef.current = false;
      return;
    }

    fetchingRef.current = false;

    switch (reason) {
      case "ok":
        setUser(fetchedUser);
        setStatus("authenticated");
        setError(null);
        break;

      case "unauthenticated":
        setUser(null);
        setStatus("unauthenticated");
        setError(null);
        break;

      case "network_error":
      case "parse_error":
        if (user === null) {
          setStatus("error");
          setError(
            reason === "network_error"
              ? "Unable to reach the authentication service. Please check your connection."
              : "Received an unexpected response from the authentication service."
          );
        }
        break;

      default: {
        const _exhaustive: never = reason;
        console.log(_exhaustive);
        break;
      }
    }
  }, [user]);

  const refresh = useCallback(async (): Promise<void> => {
    await doFetch();
  }, [doFetch]);

  useEffect(() => {
    mountedRef.current = true;

    const shouldSkip = skipInitialFetch && initialUser !== null;
    if (!shouldSkip) {
      Promise.resolve().then(() => {
        doFetch();
      });
    }

    return () => {
      mountedRef.current = false;
    };
  }, [doFetch, initialUser, skipInitialFetch]);

  useEffect(() => {
    const handleFocus = () => {
      if (status === "authenticated") {
        doFetch();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [status, doFetch]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      isAuthenticated: status === "authenticated",
      error,
      refresh,
    }),
    [status, user, error, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "[useAuthContext] Must be used within <AuthProvider>. " +
        "Ensure <AuthProvider> wraps your component tree in app/layout.tsx."
    );
  }
  return ctx;
}