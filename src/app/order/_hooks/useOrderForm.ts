"use client";

import { useState, useCallback, useEffect, useDeferredValue } from "react";
import type { OrderFormState, OrderPriceState, OrderFormStep1, OrderFormStep2, OrderFormStep3 } from "@/app/order/_types/order.types";
import { calculateOrderPrice } from "@/app/order/_services/order.service";
import { computeDeadlineISO } from "@/app/order/_utils/order.utils";

const INITIAL_STATE: OrderFormState = {
  step: 1,
  step1: { serviceId: null, levelId: null, deadlineDate: null, deadlineTime: "23:59", reportType: null },
  step2: { title: "", wordCount: 275, lineSpacing: "double", formatStyle: "APA", sources: 0, instructions: "", files: [], submitLater: false },
  step3: { discountCode: "", pointsToRedeem: 0 },
};

export function useOrderForm(initialParams: Partial<OrderFormStep1>) {
  const [state, setState] = useState<OrderFormState>(() => ({
    ...INITIAL_STATE,
    step1: { ...INITIAL_STATE.step1, ...initialParams }
  }));

  const [priceState, setPriceState] = useState<OrderPriceState>({
    subtotal: 0, total: 0, discountAmount: 0, pointsDiscount: 0,
    isPriceLoading: false, priceError: null, priceDetails: null
  });

  const deferredStep1 = useDeferredValue(state.step1);
  const deferredWordCount = useDeferredValue(state.step2.wordCount);

  const fetchPrice = useCallback(async (signal?: AbortSignal) => {
    const { serviceId, levelId, deadlineDate, deadlineTime, reportType } = deferredStep1;
    if (!serviceId || !levelId || !deadlineDate) return;

    setPriceState(prev => ({ ...prev, isPriceLoading: true, priceError: null }));
    const deadline = computeDeadlineISO(deadlineDate, deadlineTime);

    const res = await calculateOrderPrice({
      service_id: serviceId, level_id: levelId, deadline,
      word_count: deferredWordCount, page_count: Math.ceil(deferredWordCount / 275),
      report_type: reportType || undefined
    }, signal);

    if (res.ok) {
      setPriceState(prev => ({
        ...prev, isPriceLoading: false, priceDetails: res.data,
        subtotal: res.data.total_price, total: res.data.total_price - prev.discountAmount - prev.pointsDiscount
      }));
    } else if (res.error.message !== "AbortError") {
      setPriceState(prev => ({ ...prev, isPriceLoading: false, priceError: res.error.message }));
    }
  }, [deferredStep1, deferredWordCount]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => fetchPrice(controller.signal), 500);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [fetchPrice]);

  const updateStep1 = (data: Partial<OrderFormStep1>) => setState(p => ({ ...p, step1: { ...p.step1, ...data } }));
  const updateStep2 = (data: Partial<OrderFormStep2>) => setState(p => ({ ...p, step2: { ...p.step2, ...data } }));
  const updateStep3 = (data: Partial<OrderFormStep3>) => setState(p => ({ ...p, step3: { ...p.step3, ...data } }));

  const validateStep1 = () => {
    const { serviceId, levelId, deadlineDate } = state.step1;
    if (!serviceId) return "Please select a service type";
    if (!levelId) return "Please select a project level";
    if (!deadlineDate) return "Please select a deadline date";
    return null;
  };

  const validateStep2 = () => {
    const { title, wordCount, instructions } = state.step2;
    if (!title || title.length < 5) return "Project title is too short";
    if (wordCount < 275) return "Minimum word count is 275";
    if (!instructions || instructions.length < 10) return "Please provide more detailed instructions";
    return null;
  };

  const nextStep = () => setState(p => ({ ...p, step: Math.min(p.step + 1, 3) as 1 | 2 | 3 }));
  const prevStep = () => setState(p => ({ ...p, step: Math.max(p.step - 1, 1) as 1 | 2 | 3 }));
  const goToStep = (step: 1 | 2 | 3) => setState(p => ({ ...p, step }));

  return { 
    state, setState, priceState, setPriceState, 
    updateStep1, updateStep2, updateStep3, 
    nextStep, prevStep, goToStep, validateStep1, validateStep2 
  };
}
