"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDashboardSocket } from "./useDashboardSocket";
import {
  fetchAdminKPIs, fetchAdminAnalytics, fetchAdminTracking, fetchAdminAlerts
} from "../_services/dashboard.service";
import {
  FALLBACK_ADMIN_KPI, FALLBACK_ADMIN_ANALYTICS, FALLBACK_ADMIN_TRACKING, FALLBACK_ADMIN_ALERTS
} from "../_fallbacks/dashboard.fallback";
import type {
  AdminDashboardTracking, UpcomingDeadline
} from "../_types/dashboard.types";

export function useDashboardQueries() {
  const queryClient = useQueryClient();

  const wrap = <T>(fn: () => Promise<{ ok: boolean; data?: T; error?: unknown }>, fb: T) =>
    fn().then((r) => {
      if (!r.ok) {
        if (process.env.NODE_ENV !== "production") return fb;
        throw new Error((r.error as { message?: string })?.message || "Error");
      }
      return r.data as T;
    });

  const kpisQ = useQuery({ queryKey: ["admin", "kpis"], queryFn: () => wrap(fetchAdminKPIs, FALLBACK_ADMIN_KPI), staleTime: 30_000, gcTime: 300_000 });
  const analyticsQ = useQuery({ queryKey: ["admin", "analytics"], queryFn: () => wrap(fetchAdminAnalytics, FALLBACK_ADMIN_ANALYTICS), staleTime: 60_000, gcTime: 300_000 });
  const trackingQ = useQuery({ queryKey: ["admin", "tracking"], queryFn: () => wrap(fetchAdminTracking, FALLBACK_ADMIN_TRACKING), staleTime: 15_000, refetchInterval: 30_000, gcTime: 300_000 });
  const alertsQ = useQuery({ queryKey: ["admin", "alerts"], queryFn: () => wrap(fetchAdminAlerts, FALLBACK_ADMIN_ALERTS), staleTime: 10_000, refetchInterval: 20_000, gcTime: 300_000 });

  const handleOrderUpdate = useCallback((data: UpcomingDeadline) => {
    queryClient.setQueryData(["admin", "tracking"], (old: AdminDashboardTracking | undefined) =>
      old ? { ...old, upcoming_deadlines: old.upcoming_deadlines.map((o) => (o.id === data.id ? data : o)) } : old
    );
  }, [queryClient]);

  useDashboardSocket(handleOrderUpdate);

  const refresh = useCallback(() =>
    queryClient.invalidateQueries({ queryKey: ["admin"] }).then(() => {}),
    [queryClient]
  );

  return {
    kpis: kpisQ.data, analytics: analyticsQ.data, tracking: trackingQ.data, alerts: alertsQ.data,
    loadingKpis: kpisQ.isLoading, loadingAnalytics: analyticsQ.isLoading, loadingTracking: trackingQ.isLoading, loadingAlerts: alertsQ.isLoading,
    errorKpis: kpisQ.error, errorAnalytics: analyticsQ.error, errorTracking: trackingQ.error, errorAlerts: alertsQ.error,
    refresh,
  };
}
