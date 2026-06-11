"use client";

import { useState, useEffect } from "react";
import { fetchNavStats } from "../_services/nav.service";
import type { AdminNavStatsState } from "../_types/nav.type";

const FALLBACK_STATE: AdminNavStatsState = {
  activeOrdersCount: 0,
  paymentsCount: 0,
  chatCount: 0,
  testimonialsCount: 0,
  isLoading: true,
};

export function useNavStats(): AdminNavStatsState {
  const [state, setState] = useState<AdminNavStatsState>(FALLBACK_STATE);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetchNavStats();

      if (cancelled) return;

      if (res.ok) {
        setState({
          activeOrdersCount: res.data.active_orders,
          paymentsCount: res.data.payments,
          chatCount: res.data.chats,
          testimonialsCount: res.data.testimonials,
          isLoading: false,
        });
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[useNavStats] Failed to fetch nav stats:", res.error.message);
        }
        setState({ activeOrdersCount: 0, paymentsCount: 0, chatCount: 0, testimonialsCount: 0, isLoading: false });
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  return state;
}
