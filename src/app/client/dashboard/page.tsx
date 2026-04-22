"use client";

import { useDashboardQueries } from "./_hooks/useDashboardQueries";
import { KPICards } from "./_components/KPICards";
import { OrderMilestoneTracker } from "./_components/OrderMilestoneTracker";
import { ActionableAlerts } from "./_components/ActionableAlerts";
import { RecentActivityFeed } from "./_components/RecentActivityFeed";
import { UpcomingDeadlines } from "./_components/UpcomingDeadlines";
import { SpendingVelocityChart } from "./_components/SpendingVelocityChart";
import { ProjectLifecycleChart } from "./_components/ProjectLifecycleChart";
import { ServiceMixChart } from "./_components/ServiceMixChart";
import { ReferralGrowthChart } from "./_components/ReferralGrowthChart";
import {
  KPICardsSkeleton,
  ChartSkeleton,
  MilestoneTrackerSkeleton,
  FeedSkeleton,
  AlertsSkeleton
} from "./_components/skeletons";

export default function DashboardPage() {
  const { kpis, analytics, tracking, alerts, loading } = useDashboardQueries();

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-8">
        {loading || !kpis ? <KPICardsSkeleton /> : <KPICards data={kpis} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {loading || !tracking ? (
              <MilestoneTrackerSkeleton />
            ) : (
              <OrderMilestoneTracker order={tracking.latest_order} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {loading || !analytics ? <ChartSkeleton /> : <SpendingVelocityChart data={analytics.spending_velocity} />}
              {loading || !analytics ? <ChartSkeleton /> : <ProjectLifecycleChart data={analytics.project_lifecycle} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {loading || !analytics ? <ChartSkeleton /> : <ServiceMixChart data={analytics.service_mix} />}
              {loading || !analytics ? <ChartSkeleton /> : <ReferralGrowthChart data={analytics.referral_growth} />}
            </div>
            
            {loading || !tracking ? (
               <ChartSkeleton />
            ) : (
               <UpcomingDeadlines deadlines={tracking.upcoming_deadlines} />
            )}
          </div>

          <div className="space-y-4 md:space-y-8">
             {loading || !alerts ? (
               <AlertsSkeleton />
             ) : (
               <ActionableAlerts alerts={alerts.alerts} />
             )}

             {loading || !tracking ? (
               <FeedSkeleton />
             ) : (
               <RecentActivityFeed feed={tracking.activity_feed} />
             )}
          </div>
        </div>
      </div>
    </>
  );
}
