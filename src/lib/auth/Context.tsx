"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { fetchClientAuthUser } from "@/lib/services/auth.service";
import type { AuthContextValue, AuthStatus, AuthUser } from "@/lib/types/auth.type";
import type { AuthProviderProps } from "../props/auth.props";

const AUTH_REFETCH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

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
  const userRef = useRef<AuthUser | null>(user);
  const lastFetchedAtRef = useRef<number>(0);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

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
        lastFetchedAtRef.current = Date.now(); // record successful fetch time
        break;

      case "unauthenticated":
        setUser(null);
        setStatus("unauthenticated");
        setError(null);
        lastFetchedAtRef.current = Date.now();
        break;

      case "network_error":
      case "parse_error":
        if (userRef.current === null) {
          setStatus("error");
          setError(
            reason === "network_error"
              ? "Unable to reach the authentication service. Please check your connection."
              : "Received an unexpected response from the authentication service.",
          );
        }
        break;

      default: {
        const _exhaustive: never = reason;
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[AuthContext] Unhandled reason variant — this should be unreachable:",
            _exhaustive,
          );
        }
        break;
      }
    }
  }, []);

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
    } else {
      lastFetchedAtRef.current = Date.now();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [doFetch, initialUser, skipInitialFetch]);

  useEffect(() => {
    const handleFocus = () => {
      const now = Date.now();
      if (
        status === "authenticated" &&
        now - lastFetchedAtRef.current >= AUTH_REFETCH_INTERVAL_MS
      ) {
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
    [status, user, error, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "[useAuthContext] Must be used within <AuthProvider>. " +
        "Ensure <AuthProvider> wraps your component tree in app/layout.tsx.",
    );
  }
  return ctx;
}