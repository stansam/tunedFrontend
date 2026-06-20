"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDashboardSocket } from "./useDashboardSocket";
import {
  fetchDashboardKPIs,
  fetchDashboardAnalytics,
  fetchDashboardTracking,
  fetchDashboardAlerts,
} from "../_services/dashboard.service";
import type {
  DashboardTracking,
  DashboardAlerts,
  MilestoneOrder,
  ActionableAlert,
} from "../_types/dashboard.types";

export function useDashboardQueries() {
  const queryClient = useQueryClient();
  const wrap = <T>(fn: () => Promise<{ ok: boolean; data?: T; error?: unknown }>) =>
    fn().then((r) => {
      if (!r.ok) throw new Error((r.error as { message?: string })?.message || "Error");
      return r.data as T;
    });

  const kpisQ = useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: () => wrap(fetchDashboardKPIs),
    staleTime: 30_000,
    gcTime: 300_000,
  });
  const analyticsQ = useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: () => wrap(fetchDashboardAnalytics),
    staleTime: 60_000,
    gcTime: 300_000,
  });
  const trackingQ = useQuery({
    queryKey: ["dashboard", "tracking"],
    queryFn: () => wrap(fetchDashboardTracking),
    staleTime: 15_000,
    refetchInterval: 30_000,
    gcTime: 300_000,
  });
  const alertsQ = useQuery({
    queryKey: ["dashboard", "alerts"],
    queryFn: () => wrap(fetchDashboardAlerts),
    staleTime: 10_000,
    refetchInterval: 20_000,
    gcTime: 300_000,
  });

  const handleOrderUpdate = useCallback((data: MilestoneOrder) => {
    queryClient.setQueryData(["dashboard", "tracking"], (old: DashboardTracking | undefined) => {
      if (!old || !old.latest_order || old.latest_order.id !== data.id) return old;
      return { ...old, latest_order: data };
    });
  }, [queryClient]);

  const handleAlertNew = useCallback((data: ActionableAlert) => {
    queryClient.setQueryData(["dashboard", "alerts"], (old: DashboardAlerts | undefined) => ({
      alerts: old ? [data, ...old.alerts] : [data],
    }));
  }, [queryClient]);

  useDashboardSocket(handleOrderUpdate, handleAlertNew);

  const refresh = useCallback(() =>
    queryClient.invalidateQueries({ queryKey: ["dashboard"] }).then(() => {}),
    [queryClient]
  );

  return {
    kpis: kpisQ.data,
    analytics: analyticsQ.data,
    tracking: trackingQ.data,
    alerts: alertsQ.data,
    loadingKpis: kpisQ.isLoading,
    loadingAnalytics: analyticsQ.isLoading,
    loadingTracking: trackingQ.isLoading,
    loadingAlerts: alertsQ.isLoading,
    errorKpis: kpisQ.error,
    errorAnalytics: analyticsQ.error,
    errorTracking: trackingQ.error,
    errorAlerts: alertsQ.error,
    refresh,
  };
}
