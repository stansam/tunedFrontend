import { z } from "zod";
import * as schemas from "../_schemas/dashboard.schema";

export type OrderStatus = z.infer<typeof schemas.OrderStatusZodSchema>;
export type Priority = z.infer<typeof schemas.PriorityZodSchema>;
export type ActionableAlertType = z.infer<typeof schemas.ActionableAlertTypeZodSchema>;

export type KPIData = z.infer<typeof schemas.KPIDataSchema>;
export type ChartData = z.infer<typeof schemas.ChartDataSchema>;
export type SpendingVelocity = z.infer<typeof schemas.SpendingVelocitySchema>;
export type DashboardAnalytics = z.infer<typeof schemas.DashboardAnalyticsSchema>;
export type MilestoneOrder = z.infer<typeof schemas.MilestoneOrderSchema>;
export type UpcomingDeadline = z.infer<typeof schemas.UpcomingDeadlineSchema>;
export type ActivityLogEntry = z.infer<typeof schemas.ActivityLogEntrySchema>;
export type DashboardTracking = z.infer<typeof schemas.DashboardTrackingSchema>;
export type ActionableAlert = z.infer<typeof schemas.ActionableAlertSchema>;
export type DashboardAlerts = z.infer<typeof schemas.DashboardAlertsSchema>;

export type PaymentUpdated = z.infer<typeof schemas.PaymentUpdatedSchema>;
export type RefundProcessed = z.infer<typeof schemas.RefundProcessedSchema>;
export type RevisionStatus = z.infer<typeof schemas.RevisionStatusSchema>;
export type DraftSaved = z.infer<typeof schemas.DraftSavedSchema>;
export type OrderDeliveryFile = z.infer<typeof schemas.OrderDeliveryFileSchema>;
export type OrderDelivery = z.infer<typeof schemas.OrderDeliverySchema>;
