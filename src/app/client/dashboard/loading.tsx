import {
  KPICardsSkeleton,
  MilestoneTrackerSkeleton,
  ChartSkeleton,
  FeedSkeleton,
  AlertsSkeleton,
  UpcomingDeadlinesSkeleton,
} from "./_components/skeletons";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 py-6">
      {/* KPI Row */}
      <KPICardsSkeleton />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <MilestoneTrackerSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <UpcomingDeadlinesSkeleton />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white shadow-sm p-6 space-y-4">
            <h3 className="tracking-tight text-sm font-semibold">Actionable Alerts</h3>
            <AlertsSkeleton />
          </div>
          <FeedSkeleton />
        </div>
      </div>
    </div>
  );
}
