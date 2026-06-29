import { AlertTriangle, Play, Loader2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { OrderRowProps } from "../_props/orders.props";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Route } from "next";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  pending: "Pending",
  active: "In Progress",
  "completed pending review": "Pending Review",
  completed: "Completed",
  overdue: "Overdue",
  canceled: "Canceled",
  revision: "Revision",
};

const BADGE_CLASSES: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  revision: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
  canceled: "bg-slate-100 text-slate-500 border-slate-200",
  "completed pending review": "bg-orange-100 text-orange-800 border-orange-200",
};

interface RowViewProps extends OrderRowProps {
  readonly isMobile?: boolean;
}

export function OrderRow({ order, onActivate, onEscalate, isActivating, isMobile }: RowViewProps) {
  const formattedDueDate = order.due_date ? new Date(order.due_date).toLocaleDateString() : "No deadline";
  const statusBadge = (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border", BADGE_CLASSES[order.status] ?? "bg-slate-100 border-slate-200 text-slate-800")}>
      {STATUS_LABELS[order.status] ?? order.status.toUpperCase()}
    </span>
  );

  const actions = (
    <div className="flex gap-2 justify-end md:justify-center">
      {order.status === "pending" && (
        <Button
          size="sm"
          variant="outline"
          disabled={isActivating}
          onClick={() => onActivate(order.id)}
          className="h-7 gap-1 rounded-lg text-xs bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white border-transparent disabled:opacity-50"
        >
          {isActivating ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <Play className="size-3 fill-white" />
          )}
          {isActivating ? "Activating..." : "Activate"}
        </Button>
      )}
      {order.status === "overdue" && (
        <Button size="sm" variant="destructive" onClick={() => onEscalate(order.id)} className="h-7 gap-1 rounded-lg text-xs bg-red-600 hover:bg-red-700">
          <AlertTriangle className="size-3" /> Escalate
        </Button>
      )}
      <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg bg-white/40 border-white/50 hover:bg-white/60">
        <Link href={`/admin/orders/${order.order_number}` as Route}>
          View
        </Link>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-emerald-700 text-sm">{order.order_number}</span>
          {statusBadge}
        </div>
        <div className="text-xs space-y-1 text-slate-600">
          <div><span className="font-semibold text-slate-700">Client:</span> {order.client_name}</div>
          <div><span className="font-semibold text-slate-700">Service:</span> {order.service_name}</div>
          <div><span className="font-semibold text-slate-700">Deadline:</span> {formattedDueDate}</div>
          <div><span className="font-semibold text-slate-700">Value:</span> ${order.total_price}</div>
        </div>
        <div className="pt-2 border-t border-slate-200/50">{actions}</div>
      </div>
    );
  }

  return (
    <TableRow className="border-white/40 hover:bg-white/10 transition-colors">
      <TableCell className="font-semibold text-emerald-700">{order.order_number}</TableCell>
      <TableCell className="text-slate-800 text-sm font-medium">{order.client_name}</TableCell>
      <TableCell className="text-slate-600 text-sm">{order.service_name}</TableCell>
      <TableCell className="text-slate-600 text-sm">{formattedDueDate}</TableCell>
      <TableCell className="text-right text-slate-800 font-semibold text-sm">${order.total_price}</TableCell>
      <TableCell className="text-center">{statusBadge}</TableCell>
      <TableCell className="text-center">{actions}</TableCell>
    </TableRow>
  );
}
