"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitAdminDelivery } from "../_services/admin-delivery.service";
import { adminDeliveriesQueryKey } from "./useAdminOrderDeliveries";
import type { AdminDeliveryDTO } from "../_types";

export function useAdminSubmitDelivery(orderId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const [deliveryFiles, setDeliveryFiles] = useState<File[]>([]);
  const [plagiarismFiles, setPlagiarismFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<AdminDeliveryDTO, Error, FormData>({
    mutationFn: async (formData) => {
      const result = await submitAdminDelivery(orderId, formData);
      if (!result.ok) throw new Error(result.error?.message || "Delivery submission failed");
      return result.data as AdminDeliveryDTO;
    },
    onSuccess: (newDelivery) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => {
          if (!prev) return [newDelivery];
          if (prev.some((d) => d.id === newDelivery.id)) return prev;
          return [...prev, newDelivery];
        },
      );
      setDeliveryFiles([]);
      setPlagiarismFiles([]);
      setError(null);
      if (onSuccess) onSuccess();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const submit = async () => {
    if (deliveryFiles.length === 0) {
      setError("At least one delivery file is required.");
      return;
    }
    setError(null);
    const formData = new FormData();
    deliveryFiles.forEach((file) => {
      formData.append("delivery_files", file);
    });
    plagiarismFiles.forEach((file) => {
      formData.append("plagiarism_reports", file);
    });
    await mutation.mutateAsync(formData);
  };

  return {
    deliveryFiles,
    setDeliveryFiles,
    plagiarismFiles,
    setPlagiarismFiles,
    submit,
    isSubmitting: mutation.isPending,
    error,
    setError,
  };
}
