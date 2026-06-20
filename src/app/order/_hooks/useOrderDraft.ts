"use client";
import { useMutation } from "@tanstack/react-query";
import { saveDraft } from "@/app/order/_services/order.service";
import { toast } from "sonner";
import type { OrderFormState } from "@/app/order/_types/order.types";

export function useOrderDraft() {
  const mutation = useMutation({
    mutationFn: (state: OrderFormState) => saveDraft(state),
    onSuccess: () => toast.success("Draft saved successfully"),
    onError: () => toast.error("Failed to save draft. Please try again."),
  });

  return {
    saveDraft: mutation.mutate,
    isSaving: mutation.isPending,
    lastSaved: mutation.data?.ok ? mutation.data.data.updated_at : null,
  };
}
