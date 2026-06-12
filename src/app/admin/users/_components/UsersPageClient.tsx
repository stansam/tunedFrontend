"use client";

import { toast } from "sonner";
import { useUserFilters } from "../_hooks/useUserFilters";
import { useUsersStats, useUsersList, useUsersGeography } from "../_hooks/useUsersData";
import { UsersHeader } from "./UsersHeader";
import { UsersStatsGrid } from "./UsersStatsGrid";
import { TopClientsCard } from "./TopClientsCard";
import { GeographicCard } from "./GeographicCard";
import { RetentionCard } from "./RetentionCard";
import { UsersPageSkeleton } from "./UsersPageSkeleton";
import { broadcastMessage } from "../_services/users.service";

export function UsersPageClient() {
  const { filters, setStatus, setSearch, setSort, setPage, isPending } = useUserFilters();
  const { data: stats, isLoading: statsLoading } = useUsersStats();
  const { data: listData, isLoading: listLoading } = useUsersList(filters);
  const { data: geoData, isLoading: geoLoading } = useUsersGeography();

  const handleBroadcast = async () => {
    toast.promise(broadcastMessage("Admin Broadcast"), {
      loading: "Sending broadcast message...",
      success: "Broadcast sent successfully to all clients!",
      error: "Failed to send broadcast.",
    });
  };

  const handleExport = () => {
    toast.success("Exporting client insights database to CSV...");
  };

  if (statsLoading || listLoading || geoLoading || !stats || !listData || !geoData) {
    return <UsersPageSkeleton />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <UsersHeader onBroadcast={handleBroadcast} onExport={handleExport} />
      <UsersStatsGrid stats={stats} isLoading={statsLoading} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TopClientsCard
            filters={filters}
            users={listData.users}
            total={listData.total}
            isPending={isPending}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onSortChange={setSort}
            onPageChange={setPage}
            onMessageAll={handleBroadcast}
          />
        </div>
        <div className="flex flex-col gap-6">
          <GeographicCard items={geoData} isLoading={geoLoading} />
          <RetentionCard rate={stats.client_retention_rate} isLoading={statsLoading} />
        </div>
      </div>
    </div>
  );
}
export default UsersPageClient;
