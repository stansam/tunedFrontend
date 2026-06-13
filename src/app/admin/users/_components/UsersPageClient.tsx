"use client";

import { useUserFilters } from "../_hooks/useUserFilters";
import { useUsersStats, useUsersList, useUsersGeography } from "../_hooks/useUsersData";
import { UsersHeader } from "./UsersHeader";
import { UsersStatsGrid } from "./UsersStatsGrid";
import { TopClientsCard } from "./TopClientsCard";
import { GeographicCard } from "./GeographicCard";
import { RetentionCard } from "./RetentionCard";
import { UsersPageSkeleton } from "./UsersPageSkeleton";
import { useUsersActions } from "../_hooks/useUsersActions";
import { useUsersSocket } from "../_hooks/useUsersSocket";
import { BroadcastDialog } from "./BroadcastDialog";
import { MessageUserDialog } from "./MessageUserDialog";

export function UsersPageClient() {
  // Setup websockets for live stats/list invalidation
  useUsersSocket();

  const { filters, setStatus, setSearch, setSort, setPage, isPending } = useUserFilters();
  const { data: stats, isLoading: statsLoading } = useUsersStats();
  const { data: listData, isLoading: listLoading } = useUsersList(filters);
  const { data: geoData, isLoading: geoLoading } = useUsersGeography();

  const {
    broadcastOpen,
    setBroadcastOpen,
    selectedUser,
    setSelectedUser,
    broadcastMessage,
    isBroadcasting,
    messageUser,
    isMessaging,
  } = useUsersActions();

  const handleExport = () => {
    window.location.href = "/admin/users/export";
  };

  // If everything is loading, show page skeleton
  if (statsLoading && listLoading && geoLoading) {
    return <UsersPageSkeleton />;
  }

  const handleBroadcastConfirm = async (msg: string) => {
    await broadcastMessage(msg);
  };

  const handleMessageUserConfirm = async (msg: string) => {
    if (!selectedUser) return;
    await messageUser({ userId: selectedUser.id, message: msg });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <UsersHeader
        onBroadcast={() => setBroadcastOpen(true)}
        onExport={handleExport}
      />

      {/* Stats Grid with progressive fallback */}
      {stats ? (
        <UsersStatsGrid stats={stats} isLoading={statsLoading} />
      ) : (
        <div className="h-32 animate-pulse bg-white/20 border border-white/10 rounded-2xl" />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {listData ? (
            <TopClientsCard
              filters={filters}
              users={listData.users}
              total={listData.total}
              isPending={isPending || listLoading}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
              onSortChange={setSort}
              onPageChange={setPage}
              onMessageAll={() => setBroadcastOpen(true)}
              onAction={(user) => setSelectedUser(user)}
            />
          ) : (
            <div className="h-96 animate-pulse bg-white/20 border border-white/10 rounded-2xl" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          {geoData ? (
            <GeographicCard items={geoData} isLoading={geoLoading} />
          ) : (
            <div className="h-64 animate-pulse bg-white/20 border border-white/10 rounded-2xl" />
          )}

          {stats ? (
            <RetentionCard rate={stats.client_retention_rate} isLoading={statsLoading} />
          ) : (
            <div className="h-32 animate-pulse bg-white/20 border border-white/10 rounded-2xl" />
          )}
        </div>
      </div>

      {/* Dialogs */}
      <BroadcastDialog
        open={broadcastOpen}
        onClose={() => setBroadcastOpen(false)}
        onConfirm={handleBroadcastConfirm}
        isPending={isBroadcasting}
      />

      <MessageUserDialog
        open={!!selectedUser}
        userId={selectedUser?.id ?? ""}
        userName={selectedUser?.name ?? ""}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleMessageUserConfirm}
        isPending={isMessaging}
      />
    </div>
  );
}
