"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useDeferredValue,
} from "react";
import { calculatePrice } from "@/lib/services/quote.service";
import type {
  QuoteFormState,
  CalculatePriceResponse,
  CalculatePriceRequest,
} from "@/types/quote.type";
import type { CategoryTab } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const WORDS_PER_PAGE = Number(process.env.NEXT_PUBLIC_WORDS_PER_PAGE ?? 275);
const PRICE_DEBOUNCE_MS = 600;

// ─── useQuoteForm ─────────────────────────────────────────────────────────────

export interface UseQuoteFormReturn {
  formState: QuoteFormState;
  price: CalculatePriceResponse | null;
  isPriceLoading: boolean;
  priceError: string | null;
  wordsPerPage: number;
  setActiveTab: (tab: CategoryTab) => void;
  setServiceId: (id: string) => void;
  setLevelId: (id: string) => void;
  setDeadline: (isoUtc: string) => void;
  setPageCount: (count: number) => void;
}

export function useQuoteForm(): UseQuoteFormReturn {
  const [formState, setFormState] = useState<QuoteFormState>({
    activeTab: "writing",
    serviceId: null,
    levelId: null,
    deadline: null,
    pageCount: 1,
  });

  const [price, setPrice] = useState<CalculatePriceResponse | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Deferred so rapid slider changes don't thrash the API
  const deferredFormState = useDeferredValue(formState);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /** Returns true when all four fields are filled */
  const isComplete = useCallback((state: QuoteFormState): boolean => {
    return Boolean(
      state.serviceId &&
        state.levelId &&
        state.deadline &&
        state.pageCount >= 1
    );
  }, []);

  useEffect(() => {
    if (!isComplete(deferredFormState)) {
      setPrice(null);
      setPriceError(null);
      return;
    }

    // Debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      // Cancel in-flight request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const payload: CalculatePriceRequest = {
        service_id: deferredFormState.serviceId!,
        level_id: deferredFormState.levelId!,
        deadline: deferredFormState.deadline!,
        page_count: deferredFormState.pageCount,
        word_count: deferredFormState.pageCount * WORDS_PER_PAGE,
      };

      setIsPriceLoading(true);
      setPriceError(null);

      const result = await calculatePrice(payload);

      setIsPriceLoading(false);

      if (result.ok) {
        setPrice(result.data);
      } else {
        setPriceError(result.error.message);
        setPrice(null);
      }
    }, PRICE_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [deferredFormState, isComplete]);

  const setActiveTab = useCallback((tab: CategoryTab) => {
    setFormState((prev) => ({
      ...prev,
      activeTab: tab,
      // Reset service when switching category
      serviceId: null,
    }));
  }, []);

  const setServiceId = useCallback((id: string) => {
    setFormState((prev) => ({ ...prev, serviceId: id }));
  }, []);

  const setLevelId = useCallback((id: string) => {
    setFormState((prev) => ({ ...prev, levelId: id }));
  }, []);

  const setDeadline = useCallback((isoUtc: string) => {
    setFormState((prev) => ({ ...prev, deadline: isoUtc }));
  }, []);

  const setPageCount = useCallback((count: number) => {
    setFormState((prev) => ({
      ...prev,
      pageCount: Math.max(1, count),
    }));
  }, []);

  return {
    formState,
    price,
    isPriceLoading,
    priceError,
    wordsPerPage: WORDS_PER_PAGE,
    setActiveTab,
    setServiceId,
    setLevelId,
    setDeadline,
    setPageCount,
  };
}

// ─── useMinDeadline ───────────────────────────────────────────────────────────

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export function useMinDeadline(): Date {
  const [minDate, setMinDate] = useState<Date>(
    () => new Date(Date.now() + THREE_HOURS_MS)
  );

  useEffect(() => {
    // Refresh every minute so the min date stays accurate
    const id = setInterval(() => {
      setMinDate(new Date(Date.now() + THREE_HOURS_MS));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return minDate;
}
