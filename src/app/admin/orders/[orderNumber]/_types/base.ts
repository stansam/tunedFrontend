export type AdminOrderTab = "details" | "activity" | "delivery" | "actions";
export type TrackingStepStatus = "completed" | "active" | "pending";

export interface AdminOrderFileDTO {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
}

export interface TrackingStep {
  label: string;
  status: TrackingStepStatus;
}
