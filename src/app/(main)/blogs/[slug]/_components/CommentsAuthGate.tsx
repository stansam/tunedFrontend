"use client";

/**
 * @file CommentsAuthGate.tsx
 * @description Renders a locked-comment preview for unauthenticated users.
 *
 * Issue 6 fix
 * ───────────
 * All Sign in / Create account links now include a `callbackUrl` query param
 * containing the current page's pathname (encoded).  This ensures users are
 * returned to the exact blog post they were reading after authentication,
 * rather than landing on the default /client/dashboard.
 *
 * Why "use client"
 * ──────────────────
 * usePathname() is a client-only hook, so this component must be a Client
 * Component.  The component has no heavy logic — the "use client" boundary is
 * minimal and does not force any parent Server Components to become clients.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommentsAuthGateProps } from "../_props/post.prop";

export function CommentsAuthGate({ visibleCount, totalCount }: CommentsAuthGateProps) {
  const pathname = usePathname();

  // Use UrlObject form so Next.js typed routing is satisfied (#cd58389b).
  const loginHref = {
    pathname: "/auth/login" as const,
    query: { callbackUrl: pathname },
  };
  const registerHref = {
    pathname: "/auth/register" as const,
    query: { callbackUrl: pathname },
  };

  const hiddenCount = Math.max(0, totalCount - visibleCount);

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-slate-200",
        "bg-linear-to-b from-white/80 to-white backdrop-blur-sm",
        "shadow-[0_2px_20px_rgba(0,0,0,0.06)]",
      )}
      role="region"
      aria-label="Comments locked – sign in to view"
    >
      {/* Blurred comment skeletons — decorative, hidden from AT */}
      <div
        className="space-y-4 p-5 pb-2 select-none pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(Math.min(3, totalCount))].map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border border-slate-100 bg-white p-4",
              "blur-[6px] opacity-60",
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-2.5 w-16 rounded bg-slate-100" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
              <div className="h-3 w-3/5 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center",
          "bg-linear-to-b from-white/40 via-white/80 to-white",
          "px-6 py-10",
        )}
      >
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-full",
            "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-slate-200",
          )}
        >
          <Lock size={24} className="text-emerald-500" aria-hidden="true" />
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-1 text-center">
          {totalCount > 0
            ? `${totalCount} comment${totalCount === 1 ? "" : "s"} awaiting you`
            : "Join the conversation"}
        </h3>

        <p className="text-sm text-slate-500 text-center mb-6 max-w-xs">
          {totalCount > 0
            ? `Sign in or create a free account to read all ${totalCount} comment${totalCount === 1 ? "" : "s"} and share your thoughts.`
            : "Sign in or create a free account to be the first to comment."}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <Link
            href={loginHref}
            className={cn(
              "w-full sm:w-auto flex-1 text-center",
              "rounded-full bg-emerald-500 hover:bg-emerald-600",
              "px-6 py-2.5 text-sm font-semibold text-white",
              "shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all",
            )}
          >
            Sign in
          </Link>
          <Link
            href={registerHref}
            className={cn(
              "w-full sm:w-auto flex-1 text-center",
              "rounded-full border border-slate-200 bg-white",
              "px-3 py-2 text-sm font-semibold text-slate-700",
              "hover:border-emerald-300 hover:text-emerald-700 shadow-sm transition-all",
            )}
          >
            Create account
          </Link>
        </div>

        {totalCount > 0 && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <Eye size={12} aria-hidden="true" />
            {hiddenCount > 0
              ? `${hiddenCount} more comment${hiddenCount === 1 ? "" : "s"} hidden`
              : "All comments hidden"}
          </p>
        )}
      </div>
    </div>
  );
}