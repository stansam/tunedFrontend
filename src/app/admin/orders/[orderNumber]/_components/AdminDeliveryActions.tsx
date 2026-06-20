"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmActionModal } from "./ConfirmActionModal";
import type { AdminDeliveryActionsProps } from "../_props";
import { useAdminDeliveryActions } from "../_hooks/useAdminDeliveryActions";

export function AdminDeliveryActions({ delivery, orderId }: AdminDeliveryActionsProps) {
  const { updateStatus, isUpdatingStatus, notifyClient, isNotifyingClient, deleteDelivery, isDeleting } =
    useAdminDeliveryActions(orderId);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-slate-200/50 pt-4 mt-4 text-xs">
      {!delivery.client_notified && (
        <Button
          onClick={handleNotify}
          disabled={isNotifyingClient}
          size="sm"
          variant="outline"
          className="h-7 text-xs font-semibold rounded-lg bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
        >
          {isNotifyingClient ? "Notifying..." : "Mark Client Notified"}
        </Button>
      )}

      <div className="flex items-center space-x-2">
        <span className="text-slate-500 font-medium">Status:</span>
        <select
          value={delivery.delivery_status}
          onChange={handleStatusChange}
          disabled={isUpdatingStatus}
          className="bg-white/50 border border-slate-200 text-slate-800 rounded px-2 py-1 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30 text-xs cursor-pointer"
        >
          <option value="delivered">Delivered</option>
          <option value="revised">Revised</option>
          <option value="redelivered">Redelivered</option>
        </select>
      </div>

      <Button
        onClick={() => setIsDeleteOpen(true)}
        disabled={isDeleting}
        size="sm"
        variant="destructive"
        className="ml-auto h-7 text-xs font-semibold rounded-lg"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>

      <ConfirmActionModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          deleteDelivery(delivery.id);
          setIsDeleteOpen(false);
        }}
        title="Delete Delivery Package"
        description="Are you sure you want to delete this delivery package? This action cannot be undone."
        confirmText="Delete"
        isPending={isDeleting}
        variant="destructive"
      />
    </div>
  );
}
