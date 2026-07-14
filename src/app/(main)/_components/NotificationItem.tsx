"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { CheckCircle2, AlertTriangle, XCircle, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NotificationItem as Item } from "@/lib/types/notification.type";
import { sanitizeNotificationLink } from "@/lib/utils/sanitize";
import type { Route } from "next";

export interface NotificationItemProps {
  readonly notif: Item;
  readonly markAsRead: (id: string) => Promise<void> | void;
  readonly closeMenu: () => void;
}

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

export function NotificationItemComponent({ notif, markAsRead, closeMenu }: NotificationItemProps) {
  const sanitizedLink = sanitizeNotificationLink(notif.link);

  return (
    <li
      className={cn(
        "p-4 hover:bg-slate-50 transition-colors duration-150 cursor-pointer flex gap-3 group relative",
        !notif.is_read ? "bg-emerald-50/30" : ""
      )}
      onClick={async () => {
        if (!notif.is_read) {
          try {
            await markAsRead(notif.id);
          } catch (e) {
            console.error("Failed to mark notification read:", e);
          }
        }
      }}
    >
      {!notif.is_read && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full" />
      )}

      <div className="shrink-0 mt-0.5">{renderIcon(notif.type)}</div>

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

        {sanitizedLink && sanitizedLink !== "#" && (
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs rounded-full shadow-sm hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50"
              asChild
            >
              <Link
                href={sanitizedLink as Route}
                onClick={() => {
                  if (!notif.is_read) markAsRead(notif.id);
                  closeMenu();
                }}
              >
                View Details <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}
