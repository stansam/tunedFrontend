import type { Priority, OrderStatus } from "../_types/dashboard.types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatDeadlineDate(isoDate: string | null): string {
  if (!isoDate) return "None";
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

const PRIORITY_COLORS = {
  LOW: "bg-slate-100 text-slate-700",
  NORMAL: "bg-blue-100 text-blue-700",
  HIGH: "bg-amber-100 text-amber-700",
  URGENT: "bg-red-100 text-red-700",
} as const;

export function getPriorityColorClass(priority: Priority): string {
  return PRIORITY_COLORS[priority] ?? PRIORITY_COLORS.NORMAL;
}

export function getOrderProgressPercent(status: OrderStatus): number {
  const map: Record<OrderStatus, number> = {
    PENDING: 10,
    ACTIVE: 45,
    REVISION: 65,
    COMPLETED_PENDING_REVIEW: 85,
    COMPLETED: 100,
    OVERDUE: 45,
    CANCELED: 0,
  };
  return map[status] ?? 0;
}

export const ACTION_LABELS: Record<string, string> = {
  order_created:        "New order submitted",
  order_updated:        "Order updated",
  order_completed:      "Order marked as completed",
  order_reordered:      "Order resubmitted",
  payment_confirmed:    "Payment confirmed",
  payment_failed:       "Payment failed",
  user_login:           "You signed in",
  user_register:        "Account created",
  email_verification:   "Email verified",
  extension_requested:  "Deadline extension requested",
  revision_requested:   "Revision requested",
};

export function humanizeAction(action: string): string {
  return ACTION_LABELS[action] ?? action.replace(/_/g, " ");
}

export const CHART_COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];

export const MILESTONE_STEPS = [
  { label: "Pending",   threshold: 0,   completedAt: 25  },
  { label: "Active",    threshold: 25,  completedAt: 75  },
  { label: "Review",    threshold: 75,  completedAt: 90  },
  { label: "Completed", threshold: 90,  completedAt: 100 },
] as const;

