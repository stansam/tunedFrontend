"use client";

import type { AdminDeliveryActionsProps } from "../_props";
import { useAdminDeliveryActions } from "../_hooks/useAdminDeliveryActions";

export function AdminDeliveryActions({ delivery, orderId }: AdminDeliveryActionsProps) {
  const { updateStatus, isUpdatingStatus, notifyClient, isNotifyingClient, deleteDelivery, isDeleting } =
    useAdminDeliveryActions(orderId);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (!newStatus) return;
    try {
      await updateStatus({ deliveryId: delivery.id, status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotify = async () => {
    try {
      await notifyClient(delivery.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this delivery? This cannot be undone.")) {
      try {
        await deleteDelivery(delivery.id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 mt-4 text-xs">
      {!delivery.client_notified && (
        <button
          onClick={handleNotify}
          disabled={isNotifyingClient}
          className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg font-medium transition"
        >
          {isNotifyingClient ? "Notifying..." : "Mark Client Notified"}
        </button>
      )}

      <div className="flex items-center space-x-2">
        <span className="text-slate-400">Status:</span>
        <select
          value={delivery.delivery_status}
          onChange={handleStatusChange}
          disabled={isUpdatingStatus}
          className="bg-slate-900 border border-white/10 text-white rounded px-2 py-1 focus:outline-none focus:border-emerald-500 text-xs"
        >
          <option value="delivered">Delivered</option>
          <option value="revised">Revised</option>
          <option value="redelivered">Redelivered</option>
        </select>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="ml-auto px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg font-medium transition"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
