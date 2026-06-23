"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { HelpCircle, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/shared/logo";

import { NotificationBell } from "@/app/(main)/_components/NotificationBell";

export function OrderNavbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#e8e6e1]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Logo />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">TunedEssays</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <ShieldCheck size={14} />
            Secure SSL Checkout
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 text-slate-500 hover:bg-black/5 transition-colors">
            <HelpCircle size={20} />
          </button>
          <NotificationBell />
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={user?.avatar_url ?? ""} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
