"use client";

import { Route } from "next";
import { useMutation } from "@tanstack/react-query";
import { submitOrder, uploadOrderFiles } from "@/app/order/_services/order.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { OrderFormState } from "@/app/order/_types/order.types";
import { computeDeadlineISO } from "@/app/order/_utils/order.utils";

export function useOrderSubmit() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ state }: { state: OrderFormState; }) => {
      if(!state.step1.deadlineDate) throw new Error("Deadline date is required");
      if(!state.step1.deadlineTime) throw new Error("Deadline time is required");
      const deadline = computeDeadlineISO(state.step1.deadlineDate, state.step1.deadlineTime);

      const payload = {
        service_id: state.step1.serviceId,
        level_id: state.step1.levelId,
        deadline,
        report_type: state.step1.reportType,
        title: state.step2.title,
        word_count: state.step2.wordCount,
        page_count: Math.ceil((state.step2.wordCount ?? 0) / 275),
        line_spacing: state.step2.lineSpacing,
        format_style: state.step2.formatStyle,
        sources: state.step2.sources,
        instructions: state.step2.instructions,
        discount_code: state.step3.discountCode,
        points_to_redeem: state.step3.pointsToRedeem,
      };

      const res = await submitOrder(payload);
      if (!res.ok) throw new Error(res.error.message);

      let uploadError: string | null = null;
      if (state.step2.files.length > 0 && !state.step2.submitLater) {
        const uploadRes = await uploadOrderFiles(res.data.order_id, state.step2.files);
        if (!uploadRes.ok) {
          uploadError = uploadRes.error.message || "Failed to upload files.";
        }
      }

      return { ...res.data, uploadError };
    },
    onSuccess: (data) => {
      if (data.uploadError) {
        sessionStorage.setItem(
          "pendingUpload",
          JSON.stringify({ orderId: data.order_id, orderNumber: data.order_number })
        );
        toast.warning("Order placed! File upload failed — you can retry from your order page.", {
          duration: 8000,
          action: {
            label: "Go to Order",
            onClick: () => router.push(`/client/orders/${data.order_number}` as Route),
          },
        });
      } else {
        toast.success(`Order #${data.order_number} placed successfully!`);
      }
      router.push(`/order/checkout?orderNumber=${data.order_number}` as Route);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to place order");
    }
  });

  return {
    submit: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
