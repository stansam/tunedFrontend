import type { OrderStatus, TrackingStep } from "../_types";

const TRACKING_STEPS = [
  "Order Placed",
  "Requirements Submitted",
  "Order in progress",
  "Review Completed Order",
  "Complete Order",
] as const;

const STATUS_ACTIVE_COUNT: Record<OrderStatus, number> = {
  draft: 1,
  pending: 2,
  active: 3,
  completed: 5,
  overdue: 3,
  cancelled: 1,
};

export function getTrackingSteps(status: OrderStatus): TrackingStep[] {
  const activeCount = STATUS_ACTIVE_COUNT[status] ?? 1;

  return TRACKING_STEPS.map((label, idx) => ({
    label,
    status:
      idx < activeCount - 1
        ? "completed"
        : idx === activeCount - 1
          ? "active"
          : "pending",
  }));
}
