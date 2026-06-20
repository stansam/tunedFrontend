"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadOrderFiles } from "@/app/order/_services/order.service";

export function useOrderFileUpload() {
  const queryClient = useQueryClient();

  return useMutation<
    { uploaded_count: number; file_ids: string[] },
    Error,
    { orderId: string; files: File[] }
  >({
    mutationFn: async ({ orderId, files }) => {
      const result = await uploadOrderFiles(orderId, files);
      if (!result.ok) throw new Error(result.error?.message || "Upload failed");
      return result.data as { uploaded_count: number; file_ids: string[] };
    },
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
    },
  });
}
