import type { ApiResult } from "@/lib/types";

export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

// lib/types/auth.type.ts

// export interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
// }

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
}

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  status: AuthStatus;
  user: AuthUser | null;
  error: string | null;
}


export type AuthAction =
  | { type: "LOADING" }
  | { type: "AUTHENTICATED"; user: AuthUser }
  | { type: "UNAUTHENTICATED" }
  | { type: "ERROR"; message: string };



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