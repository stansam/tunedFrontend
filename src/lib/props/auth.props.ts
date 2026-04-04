import type { AuthUser } from "@/lib/types/auth.type";
import type { ReactNode } from "react";

// export interface AuthProviderProps {
//   initialUser: AuthUser | null;
//   children: ReactNode;
// }
export interface AuthProviderProps {
  readonly children: ReactNode;
  readonly initialUser?: AuthUser | null;
  readonly skipInitialFetch?: boolean;
}

export interface AuthGuardBaseProps {
  readonly loadingFallback?: React.ReactNode;
  readonly unauthenticatedFallback?: React.ReactNode;
}

export interface AuthGuardProps extends AuthGuardBaseProps {
  readonly children: ReactNode;
}

export interface WithAuthInjectedProps {
  readonly user: AuthUser;
}

// interface AuthProviderProps extends AuthProviderProps {
//   readonly children: ReactNode;
//   readonly initialUser?: AuthUser | null;
//   readonly skipInitialFetch?: boolean;
// }