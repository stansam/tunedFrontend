"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/contexts/NotificationContext";
import { useAuth } from "@/lib/hooks/useAuth";
import { NotificationSkeleton } from "./NotificationSkeleton";
import { NotificationItemComponent } from "./NotificationItem";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Route } from "next";

export function NotificationBell() {
  const { unreadCount, notifications, isLoading, error, markAsRead, markAllAsRead } = useNotifications();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const viewAllPath = user?.is_admin ? "/admin/notifications" : "/client/notifications";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative p-2 rounded-full transition-all duration-200 outline-none",
            "hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-300",
            isOpen ? "bg-slate-100 text-emerald-700" : "text-slate-600"
          )}
          aria-label={`Notifications, ${unreadCount} unread`}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className="absolute top-1 right-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[min(340px,calc(100vw-32px))] md:w-[380px] p-0 overflow-hidden shadow-2xl rounded-2xl border border-slate-100">
        {error ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <p className="text-sm font-medium text-red-500">Failed to load notifications</p>
            <p className="text-xs text-slate-400 mt-1">Please try again later</p>
          </div>
        ) : isLoading ? (
          <NotificationSkeleton />
        ) : (
          <div className="flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    void markAllAsRead();
                  }}
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            <div className="overflow-y-auto w-full custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Bell className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">You&apos;re all caught up</p>
                  <p className="text-xs text-slate-400 mt-1">Check back later for updates</p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <NotificationItemComponent
                      key={notif.id}
                      notif={notif}
                      markAsRead={markAsRead}
                      closeMenu={() => setIsOpen(false)}
                    />
                  ))}
                </ul>
              )}
            </div>

            <div className="p-2 border-t border-slate-100 bg-slate-50/50">
              <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-slate-900 h-8 rounded-xl" asChild>
                <Link href={viewAllPath as Route } onClick={() => setIsOpen(false)}>
                  View All Notifications
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
