import { z } from "zod";

export const PriorityZodSchema = z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]);
export const ActionableAlertTypeZodSchema = z.enum(["EXTENSION_REQUEST", "PENDING_REVIEW"]);

export const AdminKPIDataSchema = z.object({
  active_orders: z.number().int().nonnegative(),
  total_revenue: z.number().nonnegative(),
  total_clients: z.number().int().nonnegative(),
  pending_actions: z.number().int().nonnegative(),
});

export const SpendingVelocitySchema = z.object({
  month: z.string(),
  amount: z.number(),
});

export const ChartDataSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const AdminDashboardAnalyticsSchema = z.object({
  spending_velocity: z.array(SpendingVelocitySchema),
  project_lifecycle: z.array(ChartDataSchema),
  service_mix: z.array(ChartDataSchema),
  referral_growth: z.array(ChartDataSchema),
});

export const UpcomingDeadlineSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  title: z.string().nullable(),
  due_date: z.string(),
  priority: PriorityZodSchema,
});

export const ActivityLogEntrySchema = z.object({
  id: z.string(),
  action: z.string(),
  entity_type: z.string().nullable(),
  entity_id: z.string().nullable(),
  created_at: z.string(),
});

export const AdminDashboardTrackingSchema = z.object({
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

export const AdminDashboardAlertsSchema = z.object({
  alerts: z.array(ActionableAlertSchema),
});

export const AdminOrderCreatedSchema = z.object({
  order_number: z.string(),
  client_id:    z.string(),
});

export const AdminPaymentVerificationSchema = z.object({
  payment_id:   z.string(),
  order_number: z.string(),
  client_name:  z.string(),
});

export const AdminRevisionRequestedSchema = z.object({
  order_id:     z.string(),
  order_number: z.string(),
  revision_id:  z.string(),
});

export const AdminOrderEscalatedSchema = z.object({
  order_id:     z.string(),
  order_number: z.string(),
});

export const AdminExtensionRespondedSchema = z.object({
  order_id:     z.string(),
  order_number: z.string(),
  response:     z.enum(["approved", "rejected"]),
});
