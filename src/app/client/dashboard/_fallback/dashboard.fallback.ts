import type {
  KPIData,
  DashboardAnalytics,
  DashboardTracking,
  DashboardAlerts,
} from "../_types/dashboard.types";

export const FALLBACK_KPI: KPIData = {
  active_projects: 3,
  portfolio_value: 450.50,
  reward_points: 1250,
  next_deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
};

export const FALLBACK_ANALYTICS: DashboardAnalytics = {
  spending_velocity: [
    { month: "Jan", amount: 150 },
    { month: "Feb", amount: 320 },
    { month: "Mar", amount: 200 },
    { month: "Apr", amount: 450 },
    { month: "May", amount: 380 },
    { month: "Jun", amount: 590 },
  ],
  project_lifecycle: [
    { name: "Pending", value: 2 },
    { name: "Active", value: 3 },
    { name: "Revision", value: 1 },
    { name: "Completed", value: 12 },
  ],
  service_mix: [
    { name: "Case Study", value: 4 },
    { name: "Research Paper", value: 6 },
    { name: "Presentation", value: 2 },
    { name: "Editing", value: 8 },
  ],
  referral_growth: [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 15 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 75 },
    { name: "May", value: 120 },
    { name: "Jun", value: 210 },
  ],
};

export const FALLBACK_TRACKING: DashboardTracking = {
  latest_order: {
    id: "ord_123",
    order_number: "ORD-9876-TYQ",
    status: "ACTIVE",
    progress: 45,
    delivered_at: null,
  },
  upcoming_deadlines: [
    {
      id: "ord_123",
      order_number: "ORD-9876-TYQ",
      title: "Strategic Management Analysis",
      due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
      priority: "HIGH",
    },
    {
      id: "ord_124",
      order_number: "ORD-4567-XYZ",
      title: "Market Research Report",
      due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      priority: "NORMAL",
    },
  ],
  activity_feed: [
    {
      id: "act_1",
      action: "order_created",
      message: "You submitted a new order ORD-9876-TYQ.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: "act_2",
      action: "payment_confirmed",
      message: "Payment of $150.00 confirmed.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
    {
      id: "act_3",
      action: "order_completed",
      message: "Order ORD-1234-ABC was marked as completed.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    },
  ],
};

export const FALLBACK_ALERTS: DashboardAlerts = {
  alerts: [
    {
      id: "alert_1",
      type: "EXTENSION_REQUEST",
      message: "You have 1 pending extension request from admin on order ORD-4567-XYZ.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      metadata: { order_id: "ord_124" },
    },
  ],
};
