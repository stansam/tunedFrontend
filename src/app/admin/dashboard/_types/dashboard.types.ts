import { z } from "zod";
import * as schemas from "../_schemas/dashboard.schema";

export type Priority = z.infer<typeof schemas.PriorityZodSchema>;
export type ActionableAlertType = z.infer<typeof schemas.ActionableAlertTypeZodSchema>;

export type AdminKPIData = z.infer<typeof schemas.AdminKPIDataSchema>;
export type SpendingVelocity = z.infer<typeof schemas.SpendingVelocitySchema>;
export type ChartData = z.infer<typeof schemas.ChartDataSchema>;
export type AdminDashboardAnalytics = z.infer<typeof schemas.AdminDashboardAnalyticsSchema>;

export type UpcomingDeadline = z.infer<typeof schemas.UpcomingDeadlineSchema>;
export type ActivityLogEntry = z.infer<typeof schemas.ActivityLogEntrySchema>;
export type AdminDashboardTracking = z.infer<typeof schemas.AdminDashboardTrackingSchema>;

export type ActionableAlert = z.infer<typeof schemas.ActionableAlertSchema>;
export type AdminDashboardAlerts = z.infer<typeof schemas.AdminDashboardAlertsSchema>;

export type AdminOrderCreated = z.infer<typeof schemas.AdminOrderCreatedSchema>;
export type AdminPaymentVerification = z.infer<typeof schemas.AdminPaymentVerificationSchema>;
export type AdminRevisionRequested = z.infer<typeof schemas.AdminRevisionRequestedSchema>;
export type AdminOrderEscalated = z.infer<typeof schemas.AdminOrderEscalatedSchema>;
export type AdminExtensionResponded = z.infer<typeof schemas.AdminExtensionRespondedSchema>;
