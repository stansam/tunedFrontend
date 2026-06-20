import type { ReactNode } from "react";
import type {
  AdminKPIData,
  AdminDashboardAnalytics,
  AdminDashboardTracking,
  AdminDashboardAlerts,
} from "../_types/dashboard.types";

export interface KPICardsProps {
  readonly data: AdminKPIData;
}

export interface KPICardProps {
  readonly title: string;
  readonly value: string | number;
  readonly description: string;
  readonly badgeLabel: string;
  readonly badgeClass: string;
  readonly icon: ReactNode;
}

export interface SpendingVelocityChartProps {
  readonly data: AdminDashboardAnalytics["spending_velocity"];
}

export interface ProjectLifecycleChartProps {
  readonly data: AdminDashboardAnalytics["project_lifecycle"];
}

export interface ServiceMixChartProps {
  readonly data: AdminDashboardAnalytics["service_mix"];
}

export interface ReferralGrowthChartProps {
  readonly data: AdminDashboardAnalytics["referral_growth"];
}

export interface UpcomingDeadlinesProps {
  readonly deadlines: AdminDashboardTracking["upcoming_deadlines"];
}

export interface RecentActivityFeedProps {
  readonly feed: AdminDashboardTracking["activity_feed"];
}

export interface ActionableAlertsProps {
  readonly alerts: AdminDashboardAlerts["alerts"];
}
