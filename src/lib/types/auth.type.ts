// import type { ApiResult } from "@/lib/types";

// export interface AuthUser {
//   readonly id: string;
//   readonly name: string;
//   readonly email: string;
// }

// // lib/types/auth.type.ts

// // export interface AuthUser {
// //   id: string;
// //   name: string;
// //   email: string;
// // }

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterCredentials {
//   name: string;
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   user: AuthUser;
// }

// export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

// export interface AuthState {
//   status: AuthStatus;
//   user: AuthUser | null;
//   error: string | null;
// }


// export type AuthAction =
//   | { type: "LOADING" }
//   | { type: "AUTHENTICATED"; user: AuthUser }
//   | { type: "UNAUTHENTICATED" }
//   | { type: "ERROR"; message: string };



// export interface UseAuthReturn {
//   user: AuthUser | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;
//   login: (credentials: LoginCredentials) => Promise<ApiResult<AuthUser>>;
//   register: (credentials: RegisterCredentials) => Promise<ApiResult<AuthUser>>;
//   logout: () => Promise<void>;
//   refresh: () => Promise<void>;
// }


export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar_url: string | null;
  readonly session_created_at: string | null;
}

export type AuthStatus =
  | "loading"           // Initial check in flight — no decision yet
  | "authenticated"     // /api/auth/me returned a valid user
  | "unauthenticated"   // /api/auth/me returned 401/403 or user is null
  | "error";            // Network failure or unexpected server error

export interface AuthState {
  readonly status: AuthStatus;
  readonly user: AuthUser | null;
  readonly isAuthenticated: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
}

export type ServerAuthResult =
  | { readonly ok: true;  readonly user: AuthUser }
  | { readonly ok: false; readonly reason: "unauthenticated" | "network_error" | "parse_error" };

export type AuthContextValue = AuthState;