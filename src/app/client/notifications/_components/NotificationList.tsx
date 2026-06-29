import { Bell, Trash2, CheckCircle2, AlertTriangle, XCircle, Info, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/lib/types/notification.type";
import { sanitizeNotificationLink } from "@/lib/utils/sanitize";

interface Props {
  readonly items: NotificationItem[];
  readonly onMarkRead: (id: string) => void;
  readonly onDelete: (id: string) => void;
  readonly pendingActionIds?: Set<string>;
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

export function NotificationList({ items, onMarkRead, onDelete, pendingActionIds }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
        <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-base font-semibold text-slate-700">No notifications found</p>
        <p className="text-sm text-slate-400 mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <ul className="divide-y divide-slate-100">
        {items.map((item) => {
          const sanitizedLink = sanitizeNotificationLink(item.link);
          const isPending = pendingActionIds?.has(item.id);
          return (
            <li
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`Notification: ${item.title}. ${item.message}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (!item.is_read && !isPending) onMarkRead(item.id);
                }
              }}
              className={cn(
                "p-5 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row gap-4 items-start relative group outline-none focus-visible:bg-slate-50",
                !item.is_read ? "bg-emerald-50/10" : ""
              )}
            >
              <div className="flex gap-4 items-start w-full flex-1">
                <div className="shrink-0 mt-1">{renderIcon(item.type)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-bold truncate", item.is_read ? "text-slate-700" : "text-slate-900")}>
                      {item.title}
                    </span>
                    {!item.is_read && <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </p>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.message}</p>
                  
                  {sanitizedLink && sanitizedLink !== "#" && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="h-8 rounded-full text-xs" asChild>
                        <a href={sanitizedLink}>
                          View details <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  )}

                  <div className="flex md:hidden items-center gap-3 mt-4 pt-2 border-t border-slate-100">
                    {!item.is_read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-emerald-600 hover:bg-emerald-50 rounded-full text-xs px-3"
                        disabled={isPending}
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkRead(item.id);
                        }}
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2" />
                        Mark Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-red-500 hover:bg-red-50 rounded-full text-xs px-3"
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0 self-center">
                {!item.is_read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-emerald-600 hover:bg-slate-50 rounded-full"
                    disabled={isPending}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkRead(item.id);
                    }}
                    aria-label="Mark as read"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:bg-red-50 rounded-full"
                  disabled={isPending}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
