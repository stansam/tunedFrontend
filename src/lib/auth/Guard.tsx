"use client";

import React, { type ComponentType } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import type { AuthUser } from "@/lib/types/auth.type";
import type {
  AuthGuardBaseProps,
  AuthGuardProps,
  WithAuthInjectedProps,
} from "@/lib/props/auth.props";

// ---------------------------------------------------------------------------
// AuthGuard — renders children only when authenticated
// ---------------------------------------------------------------------------

export function AuthGuard({
  children,
  loadingFallback = null,
  unauthenticatedFallback = null,
}: AuthGuardProps): React.ReactElement | null {
  const { status } = useAuth();

  switch (status) {
    case "loading":
      return <>{loadingFallback}</>;

    case "authenticated":
      return <>{children}</>;

    case "unauthenticated":
    case "error":
      return <>{unauthenticatedFallback}</>;

    default: {
      const _exhaustive: never = status;
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[AuthGuard] Unhandled status variant — this should be unreachable:",
          _exhaustive,
        );
      }
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// withAuth — HOC that injects the authenticated user into the wrapped component
// ---------------------------------------------------------------------------

export function withAuth<TProps extends WithAuthInjectedProps>(
  WrappedComponent: ComponentType<TProps>,
  options: AuthGuardBaseProps = {},
): ComponentType<Omit<TProps, "user">> {
  const { loadingFallback = null, unauthenticatedFallback = null } = options;

  function WithAuthWrapper(
    props: Omit<TProps, "user">,
  ): React.ReactElement | null {
    const { status, user } = useAuth();

    switch (status) {
      case "loading":
        return <>{loadingFallback}</>;

      case "authenticated":
        return (
          <WrappedComponent {...(props as TProps)} user={user as AuthUser} />
        );

      case "unauthenticated":
      case "error":
        return <>{unauthenticatedFallback}</>;

      default: {
        const _exhaustive: never = status;
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "[withAuth] Unhandled status variant — this should be unreachable:",
            _exhaustive,
          );
        }
        return null;
      }
    }
  }

  const wrappedName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WithAuthWrapper.displayName = `withAuth(${wrappedName})`;

  return WithAuthWrapper;
}