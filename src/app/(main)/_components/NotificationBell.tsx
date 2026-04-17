"use client";

import { useState } from "react";
import { Bell, Check, ExternalLink, Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/contexts/NotificationContext";
import { NotificationSkeleton } from "./NotificationSkeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export function NotificationBell() {
  const { unreadCount, notifications, isLoading, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const renderIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative p-2 rounded-full transition-all duration-200 outline-none",
            "hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-300",
            isOpen ? "bg-slate-100 text-emerald-700" : "text-slate-600"
          )}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[340px] md:w-[380px] p-0 overflow-hidden shadow-2xl rounded-2xl border border-slate-100">
        {isLoading ? (
          <NotificationSkeleton />
        ) : (
          <div className="flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    markAllAsRead();
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
                    <li
                      key={notif.id}
                      className={cn(
                        "p-4 hover:bg-slate-50 transition-colors duration-150 cursor-pointer flex gap-3 group relative",
                        !notif.is_read ? "bg-emerald-50/30" : ""
                      )}
                      onClick={() => {
                        if (!notif.is_read) markAsRead(notif.id);
                      }}
                    >
                      {!notif.is_read && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
                      )}
                      
                      <div className="shrink-0 mt-0.5">
                        {renderIcon(notif.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("text-sm font-semibold truncate", notif.is_read ? "text-slate-700" : "text-slate-900")}>
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap mt-0.5">
                            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className={cn("text-xs mt-1 line-clamp-2", notif.is_read ? "text-slate-500" : "text-slate-600")}>
                          {notif.message}
                        </p>
                        
                        {notif.link && (notif.link !== "#") && (
                          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                            <Button variant="outline" size="sm" className="h-7 text-xs rounded-full shadow-sm hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50" asChild>
                              <Link href={{pathname: notif.link, query: {id: notif.id}}} onClick={() => { if(!notif.is_read) markAsRead(notif.id); setIsOpen(false); }}>
                                View Details <ExternalLink className="w-3 h-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-slate-900 h-8 rounded-xl" asChild>
                   <Link href={{pathname:"/client/profile"}}>View Notification Settings</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
