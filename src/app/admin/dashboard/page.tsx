"use client";

import dynamic from "next/dynamic";
import { AlertTriangle } from "lucide-react";
import { useDashboardQueries } from "./_hooks/useDashboardQueries";
import { KPICards } from "./_components/KPICards";
import { ActionableAlerts } from "./_components/ActionableAlerts";
import { RecentActivityFeed } from "./_components/RecentActivityFeed";
import { UpcomingDeadlines } from "./_components/UpcomingDeadlines";
import {
  ChartSkeleton,
  KPICardsSkeleton,
  FeedSkeleton,
  AlertsSkeleton,
  UpcomingDeadlinesSkeleton,
} from "./_components/skeletons";

const RevenueVelocityChart = dynamic(
  () => import("./_components/RevenueVelocityChart").then((m) => m.RevenueVelocityChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const ProjectLifecycleChart = dynamic(
  () => import("./_components/ProjectLifecycleChart").then((m) => m.ProjectLifecycleChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const ServiceMixChart = dynamic(
  () => import("./_components/ServiceMixChart").then((m) => m.ServiceMixChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const ClientGrowthChart = dynamic(
  () => import("./_components/ClientGrowthChart").then((m) => m.ClientGrowthChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const Err = ({ m }: { readonly m: string }) => (
  <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-xs text-red-700 flex items-center gap-2 font-semibold">
    <AlertTriangle className="h-4 w-4 shrink-0" />
    <span>{m}</span>
  </div>
);

export default function DashboardPage() {
  const q = useDashboardQueries();

  return (
    <div className="@container/main flex min-h-screen flex-col gap-6 overflow-auto py-6">
      {q.loadingKpis ? <KPICardsSkeleton /> : q.errorKpis ? <Err m="Failed to load KPIs" /> : q.kpis && <KPICards data={q.kpis} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
        <div className="lg:col-span-2 space-y-6 order-last lg:order-first">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {q.loadingAnalytics ? Array.from({ length: 4 }).map((_, i) => <ChartSkeleton key={i} />) : q.errorAnalytics ? <div className="col-span-full"><Err m="Failed to load analytics" /></div> : q.analytics && (
              <>
                <RevenueVelocityChart data={q.analytics.spending_velocity} />
                <ProjectLifecycleChart data={q.analytics.project_lifecycle} />
                <ServiceMixChart data={q.analytics.service_mix} />
                <ClientGrowthChart data={q.analytics.referral_growth} />
              </>
            )}
          </div>

          {q.loadingTracking ? <UpcomingDeadlinesSkeleton /> : q.errorTracking ? <Err m="Failed to load deadlines" /> : q.tracking && <UpcomingDeadlines deadlines={q.tracking.upcoming_deadlines} />}
        </div>

        <div className="space-y-6 order-first lg:order-last">
          {q.loadingAlerts ? <AlertsSkeleton /> : q.errorAlerts ? <Err m="Failed to load alerts" /> : q.alerts && <ActionableAlerts alerts={q.alerts.alerts} />}
          {q.loadingTracking ? <FeedSkeleton /> : q.errorTracking ? <Err m="Failed to load activity feed" /> : q.tracking && <RecentActivityFeed feed={q.tracking.activity_feed} />}
        </div>
      </div>
    </div>
  );
}
