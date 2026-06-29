"use client";

import type { AdminDeliveryMessageProps } from "../_props";

export function AdminDeliveryMessage({ delivery }: AdminDeliveryMessageProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2 text-[10px] text-slate-500">
        <span>Submitted:</span>
        <span className="text-slate-800 font-semibold">{formatDate(delivery.created_at)}</span>
      </div>
      {delivery.client_notified && delivery.client_notified_at && (
        <div className="flex items-center space-x-2 text-[10px] text-emerald-700 font-medium">
          <span>Client Notified:</span>
          <span className="font-semibold text-emerald-800">{formatDate(delivery.client_notified_at)}</span>
        </div>
      )}
    </div>
  );
}
