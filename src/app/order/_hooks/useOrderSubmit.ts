"use client";

import { useMutation } from "@tanstack/react-query";
import { submitOrder, uploadOrderFiles } from "@/app/order/_services/order.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { OrderFormState, OrderPriceState } from "@/app/order/_types/order.types";
import { computeDeadlineISO } from "@/app/order/_utils/order.utils";

export function useOrderSubmit() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ state, priceState }: { state: OrderFormState; priceState: OrderPriceState }) => {
      const deadline = computeDeadlineISO(state.step1.deadlineDate!, state.step1.deadlineTime);

      const payload = {
        service_id: state.step1.serviceId,
        level_id: state.step1.levelId,
        deadline,
        report_type: state.step1.reportType,
        title: state.step2.title,
        word_count: state.step2.wordCount,
        page_count: state.step2.wordCount / 275,
        line_spacing: state.step2.lineSpacing.toLowerCase(),
        format_style: state.step2.formatStyle,
        sources: state.step2.sources,
        instructions: state.step2.instructions,
        discount_code: state.step3.discountCode,
        points_to_redeem: state.step3.pointsToRedeem,
        // total_price: priceState.total,
      };

      const res = await submitOrder(payload);
      if (!res.ok) throw new Error(res.error.message);

      if (state.step2.files.length > 0 && !state.step2.submitLater) {
        await uploadOrderFiles(res.data.order_id, state.step2.files);
      }

      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Order #${data.order_number} placed successfully!`);
      router.push(`/client/orders/${data.order_id}/pay` as never);
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
