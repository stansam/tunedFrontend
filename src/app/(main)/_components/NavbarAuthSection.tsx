"use client";

/**
 * @file NavbarAuthSection.tsx
 * @description Desktop auth-aware Navbar section — three discriminated states.
 *
 * States
 * ──────
 * "loading"         → Skeleton buttons matching real dimensions (prevents layout
 *                     shift while /api/auth/me is resolving).
 * "authenticated"   → User avatar with initials fallback + dropdown menu.
 * "unauthenticated" → "Sign in" ghost button + "Order Now" primary button.
 *
 * Routing after logout
 * ─────────────────────
 * The router.push() call lives HERE, not in useAuth or logoutUser. The hook
 * is kept framework-agnostic (no useRouter dependency). The component owns
 * the redirect because it knows the desired destination ("/" home page).
 */

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User } from "lucide-react"; // Loader2
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return (parts[0]![0] ?? "?").toUpperCase();
  return (
    (parts[0]![0] ?? "") + (parts[parts.length - 1]![0] ?? "")
  ).toUpperCase();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NavbarAuthSection(): React.ReactElement {
  const { status, user, logoutAndRefresh } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAndRefresh();
    // Navigate home and force a full server-render refresh so any
    // server-side auth checks update correctly.
    router.push("/");
    router.refresh();
  };

  // ── Loading — fixed-dimension skeletons prevent layout shift ──────────────
  if (status === "loading") {
    return (
      <div className="flex items-center gap-4" aria-hidden="true">
        <div className="h-9 w-20 rounded-full bg-slate-100 animate-pulse" />
        <div className="h-9 w-24 rounded-full bg-slate-100 animate-pulse" />
      </div>
    );
  }

  // ── Authenticated — avatar + dropdown ─────────────────────────────────────
  if (status === "authenticated" && user !== null) {
    const initials = getInitials(user.name);

    return (
      <div className="flex items-center gap-3">
        {/* Order Now CTA remains visible for authenticated users */}
        <Button
          size="default"
          className="bg-slate-900 hover:bg-emerald-600 text-white font-bold px-7 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-emerald-500/20 transition-all active:scale-95"
          asChild
        >
          <Link href="#">Order Now</Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-full",
                "ring-2 ring-transparent hover:ring-emerald-200",
                "focus-visible:outline-none focus-visible:ring-emerald-300",
                "transition-all duration-200",
              )}
              aria-label={`Account menu for ${user.name}`}
            >
              <Avatar className="h-9 w-9">
                {user.avatar_url && (
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                )}
                <AvatarFallback
                  className="bg-emerald-100 text-emerald-700 text-sm font-bold"
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal py-2">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {user.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={{pathname: "/client"}} className="cursor-pointer">
                <LayoutDashboard size={15} className="mr-2 text-slate-500" aria-hidden="true" />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={{pathname: "/client/profile"}} className="cursor-pointer">
                <User size={15} className="mr-2 text-slate-500" aria-hidden="true" />
                Account
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
            >
              <LogOut size={15} className="mr-2" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // ── Unauthenticated / error — Sign in + Order Now ─────────────────────────
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="default"
        className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 font-bold px-6 rounded-full"
        asChild
      >
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button
        size="default"
        className="bg-slate-900 hover:bg-emerald-600 text-white font-bold px-7 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-emerald-500/20 transition-all active:scale-95"
        asChild
      >
        <Link href="#">Order Now</Link>
      </Button>
    </div>
  );
}
