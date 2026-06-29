import { NotificationSkeleton } from "@/app/(main)/_components/NotificationSkeleton";

export default function AdminNotificationsLoading() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      <div className="h-8 w-48 bg-slate-100 rounded-md animate-pulse" />
      <NotificationSkeleton />
    </div>
  );
}
