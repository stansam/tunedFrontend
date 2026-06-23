"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminNotifications } from "./_hooks/useAdminNotifications";
import { NotificationFilter } from "./_components/NotificationFilter";
import { NotificationList } from "./_components/NotificationList";

export default function AdminNotificationsPage() {
  const {
    notifications,
    isLoading,
    error,
    filters,
    setFilters,
    markAsRead,
    markAllAsRead,
    handleDelete,
  } = useAdminNotifications();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (error) {
    throw new Error(error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            There are {unreadCount} unread administrative alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={() => void markAllAsRead()}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-4 h-4" /> Mark all read
          </Button>
        )}
      </div>

      <NotificationFilter filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="h-64 bg-white rounded-xl border border-slate-100 animate-pulse" />
      ) : (
        <NotificationList
          items={notifications}
          onMarkRead={markAsRead}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
