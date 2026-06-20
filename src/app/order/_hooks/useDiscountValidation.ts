"use client";

import { useMutation } from "@tanstack/react-query";
import { validateDiscount } from "../_services/order.service";
import { toast } from "sonner";

export function useDiscountValidation(subtotal: number, onSuccess: (amount: number) => void) {
  const mutation = useMutation({
    mutationFn: (code: string) => validateDiscount(code, subtotal),
    onSuccess: (res) => {
      if (res.ok && res.data.valid) {
        onSuccess(res.data.discount_amount);
        toast.success(`Discount applied: ${res.data.description || "Success"}`);
      } else {
        toast.error(res.ok ? "Invalid discount code" : res.error.message);
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to validate discount");
    }
  });

  return {
    validate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
