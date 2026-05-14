"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/api-client";
import { toast } from "sonner";
import { orderDetailQueryKey } from "./useOrderDetail";

export function useUploadOrderAttachment(orderNumber: string, orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(f => formData.append("files", f));
      const res = await apiPost(`/orders/${orderId}/upload-files`, formData);
      if (!res.ok) throw new Error(res.error.message);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Files uploaded successfully");
      // Clear pending upload if any
      sessionStorage.removeItem("pendingUpload");
      queryClient.invalidateQueries({ queryKey: orderDetailQueryKey(orderNumber) });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Upload failed. Please try again.");
    },
  });
}
