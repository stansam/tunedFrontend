import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserRowProps } from "../_props";

export function UserRow({ user, onAction }: UserRowProps) {
  const isDormant = user.status === "dormant";
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <tr className="border-b border-slate-100 hover:bg-white/10 transition-colors">
      <td className="py-3.5 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-white/50">
            <AvatarImage src={user.avatar_url} alt={user.name} />
            <AvatarFallback className="bg-slate-200 text-xs font-bold text-slate-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-3.5 text-sm font-medium text-slate-500">{user.orders_count}</td>
      <td className="px-3 py-3.5 text-sm font-bold text-slate-900">${Number(user.total_spent).toLocaleString()}</td>
      <td className="px-3 py-3.5 text-sm">
        <span className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold",
          user.clv_status === "high" ? "text-purple-600" : "text-slate-500"
        )}>
          {user.clv_status === "high" && <span aria-hidden="true">💎</span>}
          {user.clv_status === "high" ? "High" : "Normal"}
        </span>
      </td>
      <td className="px-3 py-3.5 text-sm text-slate-500">{user.last_order_at || "Never"}</td>
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
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              : "border border-slate-200 bg-white/60 text-slate-700 hover:bg-slate-50"
          )}
        >
          {isDormant ? "Re-engage" : "Message"}
        </Button>
      </td>
    </tr>
  );
}
