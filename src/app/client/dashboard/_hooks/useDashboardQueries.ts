"use client";

import { useState, useEffect, useCallback } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import {
  fetchDashboardKPIs,
  fetchDashboardAnalytics,
  fetchDashboardTracking,
  fetchDashboardAlerts,
} from "../_services/dashboard.service";
import type {
  KPIData,
  DashboardAnalytics,
  DashboardTracking,
  DashboardAlerts,
} from "../_types/dashboard.types";
import {
  FALLBACK_KPI,
  FALLBACK_ANALYTICS,
  FALLBACK_TRACKING,
  FALLBACK_ALERTS,
} from "../_fallback/dashboard.fallback";

export function useDashboardQueries() {
  const [kpis, setKpis] = useState<KPIData | null>(null);
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [tracking, setTracking] = useState<DashboardTracking | null>(null);
  const [alerts, setAlerts] = useState<DashboardAlerts | null>(null);

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

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const socket = webSocketService.connect();

    socket.on("order.updated", (data: any) => {
      setTracking((prev) => {
        if (!prev || !prev.latest_order) return prev;
        if (prev.latest_order.id === data.order_id) {
          return {
            ...prev,
            latest_order: {
              ...prev.latest_order,
              status: data.status,
              progress: data.progress,
              delivered_at: data.delivered_at,
            },
          };
        }
        return prev;
      });
    });

    socket.on("actionable_alert.new", (data: any) => {
      setAlerts((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          alerts: [data, ...prev.alerts],
        };
      });
    });

    return () => {
      socket.off("order.updated");
      socket.off("actionable_alert.new");
    };
  }, []);

  return {
    kpis,
    analytics,
    tracking,
    alerts,
    loading,
    refresh: fetchAll,
  };
}
