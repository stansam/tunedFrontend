"use client";

import { useState, useEffect, useCallback } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import {
  fetchDashboardKPIs, fetchDashboardAnalytics,
  fetchDashboardTracking, fetchDashboardAlerts,
} from "../_services/dashboard.service";
import type {
  KPIData, DashboardAnalytics, DashboardTracking, DashboardAlerts,
} from "../_types/dashboard.types";
import {
  FALLBACK_KPI, FALLBACK_ANALYTICS, FALLBACK_TRACKING, FALLBACK_ALERTS,
} from "../_fallback/dashboard.fallback";
import type { MilestoneOrder, ActionableAlert } from "../_types/dashboard.types";

export function useDashboardQueries() {
  const [kpis, setKpis] = useState<KPIData>(FALLBACK_KPI);
  const [analytics, setAnalytics] = useState<DashboardAnalytics>(FALLBACK_ANALYTICS);
  const [tracking, setTracking] = useState<DashboardTracking>(FALLBACK_TRACKING);
  const [alerts, setAlerts] = useState<DashboardAlerts>(FALLBACK_ALERTS);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [kpiRes, analyticsRes, trackingRes, alertRes] = await Promise.all([
      fetchDashboardKPIs(),
      fetchDashboardAnalytics(),
      fetchDashboardTracking(),
      fetchDashboardAlerts(),
    ]);
    setKpis(kpiRes.ok ? kpiRes.data : FALLBACK_KPI);
    setAnalytics(analyticsRes.ok ? analyticsRes.data : FALLBACK_ANALYTICS);
    setTracking(trackingRes.ok ? trackingRes.data : FALLBACK_TRACKING);
    setAlerts(alertRes.ok ? alertRes.data : FALLBACK_ALERTS);
    setLoading(false);
  }, []);

  useEffect(() => { void fetchAll(); }, [fetchAll]);

  useEffect(() => {
    const socket = webSocketService.connect();

    socket.on("order.updated", (data: MilestoneOrder) => {
      setTracking((prev) => {
        if (!prev.latest_order || prev.latest_order.id !== data.id) return prev;
        return { ...prev, latest_order: data };
      });
    });

    socket.on("actionable_alert.new", (data: ActionableAlert) => {
      setAlerts((prev) => ({ ...prev, alerts: [data, ...prev.alerts] }));
    });

    return () => {
      socket.off("order.updated");
      socket.off("actionable_alert.new");
    };
  }, []);

  return { kpis, analytics, tracking, alerts, loading, refresh: fetchAll };
}
