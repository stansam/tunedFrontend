import type {
  AdminKPIData,
  AdminDashboardAnalytics,
  AdminDashboardTracking,
  AdminDashboardAlerts,
} from "../_types/dashboard.types";

export const FALLBACK_ADMIN_KPI: AdminKPIData = {
  active_orders: 12,
  total_revenue: 12450.5,
  total_clients: 89,
  pending_actions: 5,
};

export const FALLBACK_ADMIN_ANALYTICS: AdminDashboardAnalytics = {
  spending_velocity: [
    { month: "2026-01", amount: 1500 },
    { month: "2026-02", amount: 3200 },
    { month: "2026-03", amount: 2800 },
    { month: "2026-04", amount: 4500 },
    { month: "2026-05", amount: 3800 },
    { month: "2026-06", amount: 5900 },
  ],
  project_lifecycle: [
    { name: "PENDING", value: 3 },
    { name: "ACTIVE", value: 8 },
    { name: "REVISION", value: 2 },
    { name: "COMPLETED", value: 45 },
  ],
  service_mix: [
    { name: "Case Study", value: 12 },
    { name: "Research Paper", value: 18 },
    { name: "Presentation", value: 8 },
    { name: "Editing", value: 20 },
  ],
  referral_growth: [
    { name: "2026-01", value: 10 },
    { name: "2026-02", value: 25 },
    { name: "2026-03", value: 45 },
    { name: "2026-04", value: 60 },
    { name: "2026-05", value: 78 },
    { name: "2026-06", value: 89 },
  ],
};

export const FALLBACK_ADMIN_TRACKING: AdminDashboardTracking = {
  upcoming_deadlines: [
    {
      id: "ord_101",
      order_number: "ORD-8947-WTR",
      title: "Blockchain Integration Report",
      due_date: "2026-06-12T15:00:00.000Z",
      priority: "URGENT",
    },
    {
      id: "ord_102",
      order_number: "ORD-3321-PLA",
      title: "Deep Learning Model Optimization",
      due_date: "2026-06-15T12:00:00.000Z",
      priority: "HIGH",
    },
    {
      id: "ord_103",
      order_number: "ORD-9481-NVC",
      title: "Microservices Deployment Guide",
      due_date: "2026-06-18T18:00:00.000Z",
      priority: "NORMAL",
    },
  ],
  activity_feed: [
    {
      id: "act_101",
      action: "client_registered",
      entity_type: "User",
      entity_id: "usr_404",
      created_at: "2026-06-11T01:30:00.000Z",
    },
    {
      id: "act_102",
      action: "order_created",
      entity_type: "Order",
      entity_id: "ord_101",
      created_at: "2026-06-11T00:15:00.000Z",
    },
    {
      id: "act_103",
      action: "payment_completed",
      entity_type: "Payment",
      entity_id: "pay_901",
      created_at: "2026-06-10T22:45:00.000Z",
    },
  ],
};

export const FALLBACK_ADMIN_ALERTS: AdminDashboardAlerts = {
  alerts: [
    {
      id: "alert_101",
      type: "EXTENSION_REQUEST",
      message: "Extension request of 24h on ORD-8947-WTR requires review.",
      created_at: "2026-06-11T01:00:00.000Z",
      metadata: { order_id: "ord_101" },
    },
    {
      id: "alert_102",
      type: "PENDING_REVIEW",
      message: "Order ORD-3321-PLA delivery is pending administrator review.",
      created_at: "2026-06-10T23:30:00.000Z",
      metadata: { order_id: "ord_102" },
    },
  ],
};
