"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  approveDelivery,
  requestDeliveryRevision,
} from "../_services/delivery.service";
import { deliveriesQueryKey } from "./useOrderDeliveries";

export function useDeliveryActions(orderId: string, deliveryId: string) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const invalidateDeliveries = () => {
    queryClient.invalidateQueries({ queryKey: deliveriesQueryKey(orderId) });
  };

  const approve = async () => {
    setIsLoading(true);
    try {
      const result = await approveDelivery(orderId, deliveryId);
      if (result.ok) {
        invalidateDeliveries();
        toast.success("Delivery approved successfully!");
      } else {
        toast.error(result.error?.message ?? "Failed to approve delivery.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestRevision = async () => {
    setIsLoading(true);
    try {
      const result = await requestDeliveryRevision(orderId, deliveryId);
      if (result.ok) {
        invalidateDeliveries();
        toast.success("Revision requested successfully!");
      } else {
        toast.error(result.error?.message ?? "Failed to request revision.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { approve, requestRevision, isLoading };
}
