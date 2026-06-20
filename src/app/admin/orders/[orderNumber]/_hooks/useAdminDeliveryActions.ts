"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateAdminDeliveryStatus,
  markAdminClientNotified,
  deleteAdminDelivery,
} from "../_services/admin-delivery.service";
import { adminDeliveriesQueryKey } from "./useAdminOrderDeliveries";
import type { AdminDeliveryDTO } from "../_types";

export function useAdminDeliveryActions(orderId: string) {
  const queryClient = useQueryClient();

  const statusMutation = useMutation<
    AdminDeliveryDTO,
    Error,
    { deliveryId: string; status: string }
  >({
    mutationFn: async ({ deliveryId, status }) => {
      const result = await updateAdminDeliveryStatus(deliveryId, status);
      if (!result.ok) throw new Error(result.error?.message || "Failed to update status");
      return result.data as AdminDeliveryDTO;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => prev?.map((d) => (d.id === updated.id ? updated : d)) ?? [],
      );
    },
  });

  const notifyMutation = useMutation<AdminDeliveryDTO, Error, string>({
    mutationFn: async (deliveryId) => {
      const result = await markAdminClientNotified(deliveryId);
      if (!result.ok) throw new Error(result.error?.message || "Failed to notify client");
      return result.data as AdminDeliveryDTO;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => prev?.map((d) => (d.id === updated.id ? updated : d)) ?? [],
      );
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (deliveryId) => {
      const result = await deleteAdminDelivery(deliveryId);
      if (!result.ok) throw new Error(result.error?.message || "Failed to delete delivery");
    },
    onSuccess: (_, deliveryId) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => prev?.filter((d) => d.id !== deliveryId) ?? [],
      );
    },
  });

  return {
    updateStatus: statusMutation.mutateAsync,
    isUpdatingStatus: statusMutation.isPending,
    notifyClient: notifyMutation.mutateAsync,
    isNotifyingClient: notifyMutation.isPending,
    deleteDelivery: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
