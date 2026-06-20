"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRow } from "./UserRow";
import { Search } from "lucide-react";
import type { TopClientsCardProps } from "../_props";
import type { StatusFilter, SortField, SortOrder } from "../_types";

export function TopClientsCard({
  filters,
  users,
  total,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onPageChange,
  onMessageAll,
  onAction,
}: TopClientsCardProps) {
  const totalPages = Math.max(1, Math.ceil(total / 5)); // 5 per page

  return (
    <div className="rounded-2xl border border-white/20 bg-white/40 p-5 backdrop-blur-md shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-slate-900">Top Clients by Spending</h2>
        <Button
          onClick={onMessageAll}
          size="sm"
          className="rounded-xl border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-50 text-xs font-bold self-start sm:self-auto"
        >
          Message All
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search clients..."
            defaultValue={filters.q}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-xl border-slate-200 bg-white/50 pl-10 pr-4 text-sm focus-visible:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={filters.status}
            onValueChange={(val) => onStatusChange(val as StatusFilter)}
          >
            <SelectTrigger className="w-1/2 sm:w-36 rounded-xl border-slate-200 bg-white/50 text-sm">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="dormant">Dormant</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${filters.sort}-${filters.sortOrder}`}
            onValueChange={(val) => {
              const [sortField, sortOrder] = val.split("-") as [SortField, SortOrder];
              onSortChange(sortField, sortOrder);
            }}
          >
            <SelectTrigger className="w-1/2 sm:w-40 rounded-xl border-slate-200 bg-white/50 text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="total_spent-desc">Highest Spend</SelectItem>
              <SelectItem value="orders_count-desc">Most Orders</SelectItem>
              <SelectItem value="created_at-desc">Newest First</SelectItem>
              <SelectItem value="last_order_at-desc">Last Ordered First</SelectItem>
              <SelectItem value="name-asc">Alphabetical A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="grid grid-cols-1 gap-3 sm:hidden">
        {users.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500">No clients found matching the query.</div>
        ) : (
          users.map((user) => (
            <UserRow key={user.id} user={user} onAction={onAction} isMobile />
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-100 bg-white/20">
        <table className="w-full min-w-[600px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-white/30 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 pl-4 pr-3">Client</th>
              <th className="px-3 py-3">Orders</th>
              <th className="px-3 py-3">Total Spent</th>
              <th className="px-3 py-3">CLV</th>
              <th className="px-3 py-3">Last Order</th>
              <th className="px-3 py-3">Status</th>
              <th className="py-3 pl-3 pr-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-slate-500">
                  No clients found matching the query.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow key={user.id} user={user} onAction={onAction} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-2 px-1">
          <Button
            disabled={filters.page <= 1}
            onClick={() => onPageChange(filters.page - 1)}
            variant="ghost"
            size="sm"
            className="rounded-xl text-xs font-semibold"
          >
            Previous
          </Button>
          <span className="text-xs text-slate-500 font-semibold">
            Page {filters.page} of {totalPages}
          </span>
          <Button
            disabled={filters.page >= totalPages}
            onClick={() => onPageChange(filters.page + 1)}
            variant="ghost"
            size="sm"
            className="rounded-xl text-xs font-semibold"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
