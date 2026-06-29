"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRowProps } from "../_props";
import { formatRelativeTime } from "../_utils/format";

const CLV_BADGE: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-800 border-emerald-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-orange-100 text-orange-700 border-orange-200",
  normal: "bg-slate-100 text-slate-600 border-slate-200",
};

const CLV_LABEL: Record<string, string> = {
  high: "High Value",
  medium: "Medium",
  low: "Low Value",
  normal: "Normal",
};

export function UserRow({ user, onAction, isMobile }: UserRowProps) {
  const isDormant = user.status === "dormant";
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/20 bg-white/40 backdrop-blur-md shadow-xs">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className="h-8 w-8 border border-white/50">
              <AvatarImage src={user.avatar_url ?? ""} alt={user.name} />
              <AvatarFallback className="bg-slate-200 text-xs font-bold text-slate-600">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-slate-800 text-sm truncate">
              {user.name}
            </span>
          </div>
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold border",
            CLV_BADGE[user.clv_status]
          )}>
            {user.clv_status === "high" && <span aria-hidden="true">💎</span>}
            {CLV_LABEL[user.clv_status]}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
        <div className="flex justify-between items-center text-xs text-slate-600 mt-1">
          <span>
            {user.orders_count} orders · ${Number(user.total_spent).toLocaleString()}
          </span>
          <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 border text-[10px] font-semibold",
            isDormant
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          )}>
            <span className={cn("h-1 w-1 rounded-full", isDormant ? "bg-amber-500" : "bg-emerald-500")} />
            {isDormant ? "Dormant" : "Active"}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-500 mt-1 border-t border-slate-100/50 pt-2">
          <span>Last order: {formatRelativeTime(user.last_order_at)}</span>
          <Button
            size="sm"
            onClick={() => onAction(user)}
            className={cn(
              "rounded-xl px-3 py-1 text-xs font-bold transition-all duration-200 h-7",
              isDormant
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                : "border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-50"
            )}
          >
            {isDormant ? "Re-engage" : "Message"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <tr className="border-b border-slate-100 hover:bg-white/10 transition-colors">
      <td className="py-3.5 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-white/50">
            <AvatarImage src={user.avatar_url ?? ""} alt={user.name} />
            <AvatarFallback className="bg-slate-200 text-xs font-bold text-slate-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5 text-sm font-medium text-slate-500">{user.orders_count}</td>
      <td className="px-3 py-3.5 text-sm font-bold text-slate-900">${Number(user.total_spent).toLocaleString()}</td>
      <td className="px-3 py-3.5 text-sm">
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border",
          CLV_BADGE[user.clv_status]
        )}>
          {user.clv_status === "high" && <span aria-hidden="true">💎</span>}
          {CLV_LABEL[user.clv_status]}
        </span>
      </td>
      <td className="px-3 py-3.5 text-sm text-slate-500">{formatRelativeTime(user.last_order_at)}</td>
      <td className="px-3 py-3.5 text-sm">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold border",
          isDormant
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-emerald-50 text-emerald-700 border-emerald-200"
        )}>
          <span className={cn("h-1.5 w-1.5 rounded-full", isDormant ? "bg-amber-500" : "bg-emerald-500")} />
          {isDormant ? "Dormant" : "Active"}
        </span>
      </td>
      <td className="py-3.5 pl-3 pr-4 text-right">
        <Button
          size="sm"
          onClick={() => onAction(user)}
          className={cn(
            "rounded-xl px-4 py-1 text-xs font-bold transition-all duration-200",
            isDormant
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
              : "border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-50"
          )}
        >
          {isDormant ? "Re-engage" : "Message"}
        </Button>
      </td>
    </tr>
  );
}
