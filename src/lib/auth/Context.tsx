"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import {
  fetchCurrentUser,
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/lib/services/auth.service";
import type {
  AuthState,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from "@/lib/types/auth.type";
import type { ApiResult } from "@/lib/types";
import type { AuthAction } from "@/lib/types/auth.type";
import type { AuthProviderProps } from "@/lib/props/auth.props";

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOADING":
      return { ...state, status: "loading", error: null };
    case "AUTHENTICATED":
      return { status: "authenticated", user: action.user, error: null };
    case "UNAUTHENTICATED":
      return { status: "unauthenticated", user: null, error: null };
    case "ERROR":
      return { ...state, status: "unauthenticated", error: action.message };
    default:
      return state;
  }
}

function buildInitialState(serverUser: AuthUser | null): AuthState {
  return {
    status: serverUser ? "authenticated" : "unauthenticated",
    user: serverUser,
    error: null,
  };
}

interface AuthContextValue extends AuthState {
  refresh: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<ApiResult<AuthUser>>;
  register: (credentials: RegisterCredentials) => Promise<ApiResult<AuthUser>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);


export function AuthProvider({ initialUser, children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, buildInitialState(initialUser));

  const verified = useRef(false);

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    if (!initialUser) return;

    fetchCurrentUser().then((result) => {
      if (result.ok) {
        dispatch({ type: "AUTHENTICATED", user: result.data });
      } else {
        dispatch({ type: "UNAUTHENTICATED" });
      }
    });
  }, [initialUser]);

  const refresh = useCallback(async () => {
    dispatch({ type: "LOADING" });
    const result = await fetchCurrentUser();
    if (result.ok) {
      dispatch({ type: "AUTHENTICATED", user: result.data });
    } else {
      dispatch({ type: "UNAUTHENTICATED" });
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<ApiResult<AuthUser>> => {
      dispatch({ type: "LOADING" });
      const result = await loginService(credentials);

      if (result.ok) {
        dispatch({ type: "AUTHENTICATED", user: result.data.user });
        return { ok: true, data: result.data.user, status: 200, message: "Login successful" };
      }

      dispatch({ type: "ERROR", message: result.error.message });
      return { ok: false, error: result.error };
    },
    []
  );

  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<ApiResult<AuthUser>> => {
      dispatch({ type: "LOADING" });
      const result = await registerService(credentials);

      if (result.ok) {
        dispatch({ type: "AUTHENTICATED", user: result.data.user });
        return { ok: true, data: result.data.user, status: 201, message: "Registration successful" };
      }

      dispatch({ type: "ERROR", message: result.error.message });
      return { ok: false, error: result.error };
    },
    []
  );

  const logout = useCallback(async () => {
    dispatch({ type: "LOADING" });
    await logoutService(); // backend clears the HttpOnly cookie
    dispatch({ type: "UNAUTHENTICATED" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, refresh, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };