import { z } from "zod";

export const OrderStatusZodSchema = z.enum([
  "PENDING", "ACTIVE", "COMPLETED_PENDING_REVIEW", "COMPLETED", "OVERDUE", "CANCELED", "REVISION"
]);

export const PriorityZodSchema = z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]);

export const ActionableAlertTypeZodSchema = z.enum(["EXTENSION_REQUEST", "PENDING_REVIEW"]);

export const KPIDataSchema = z.object({
  active_projects: z.number(),
  portfolio_value: z.number(),
  reward_points: z.number(),
  next_deadline: z.string().nullable(),
});

export const ChartDataSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const SpendingVelocitySchema = z.object({
  month: z.string(),
  amount: z.number(),
});

export const DashboardAnalyticsSchema = z.object({
  spending_velocity: z.array(SpendingVelocitySchema),
  project_lifecycle: z.array(ChartDataSchema),
  service_mix: z.array(ChartDataSchema),
  referral_growth: z.array(ChartDataSchema),
});

export const MilestoneOrderSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  status: OrderStatusZodSchema,
  progress: z.number().min(0).max(100),
  delivered_at: z.string().nullable(),
});

export const UpcomingDeadlineSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  title: z.string().nullable(),
  due_date: z.string(),
  priority: PriorityZodSchema,
});

export const ActivityLogEntrySchema = z.object({
  id:          z.string(),
  action:      z.string(),
  entity_type: z.string().nullable(),
  entity_id:   z.string().nullable(),
  created_at:  z.string(),
});

export const DashboardTrackingSchema = z.object({
  latest_order: MilestoneOrderSchema.nullable(),
  upcoming_deadlines: z.array(UpcomingDeadlineSchema),
  activity_feed: z.array(ActivityLogEntrySchema),
});

export const ActionableAlertSchema = z.object({
  id: z.string(),
  type: ActionableAlertTypeZodSchema,
  message: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
  created_at: z.string().default(""),
});

export const DashboardAlertsSchema = z.object({
  alerts: z.array(ActionableAlertSchema),
});

export const PaymentUpdatedSchema = z.object({
  payment_id: z.string(),
  status:     z.string(),
});

export const RefundProcessedSchema = z.object({
  refund_id: z.string(),
  amount:    z.string(),
});

export const RevisionStatusSchema = z.object({
  order_id:    z.string(),
  revision_id: z.string(),
  new_status:  z.string(),
});

export const DraftSavedSchema = z.object({
  draft_id: z.string(),
});

export const OrderDeliveryFileSchema = z.object({
  id: z.string(),
  delivery_id: z.string(),
  filename: z.string(),
  original_filename: z.string(),
  file_path: z.string(),
  file_type: z.string(),
  file_format: z.string(),
  description: z.string().nullable(),
  file_size: z.number(),
  is_plagiarism_report: z.boolean(),
  file_icon: z.string(),
  created_at: z.string(),
});

export const OrderDeliverySchema = z.object({
  id: z.string(),
  order_id: z.string(),
  delivery_status: z.string(),
  status_color: z.string(),
  client_notified: z.boolean(),
  client_notified_at: z.string().nullable(),
  has_plagiarism_report: z.boolean(),
  delivery_files_count: z.number(),
  files: z.array(OrderDeliveryFileSchema),
  created_at: z.string(),
});

