import type { DashboardTracking, DashboardAlerts } from "../_types/dashboard.types";

const H = 1000 * 60 * 60;

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
      due_date: new Date(Date.now() + H * 24 * 2).toISOString(),
      priority: "HIGH",
    },
    {
      id: "ord_124",
      order_number: "ORD-4567-XYZ",
      title: "Market Research Report",
      due_date: new Date(Date.now() + H * 24 * 5).toISOString(),
      priority: "NORMAL",
    },
  ],
  activity_feed: [
    {
      id: "act_1",
      action: "order_created",
      entity_type: "Order",
      entity_id: "ord_123",
      created_at: new Date(Date.now() - H * 5).toISOString(),
    },
    {
      id: "act_2",
      action: "payment_confirmed",
      entity_type: "Payment",
      entity_id: "pay_001",
      created_at: new Date(Date.now() - H * 48).toISOString(),
    },
    {
      id: "act_3",
      action: "order_completed",
      entity_type: "Order",
      entity_id: "ord_100",
      created_at: new Date(Date.now() - H * 96).toISOString(),
    },
  ],
};

export const FALLBACK_ALERTS: DashboardAlerts = {
  alerts: [
    {
      id: "alert_1",
      type: "EXTENSION_REQUEST",
      message: "You have 1 pending extension request from admin on order ORD-4567-XYZ.",
      created_at: new Date(Date.now() - H).toISOString(),
      metadata: { order_id: "ord_124" },
    },
  ],
};
