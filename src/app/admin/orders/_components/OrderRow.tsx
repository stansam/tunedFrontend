"use client";

import { AlertTriangle, UserPlus } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { OrderRowProps } from "../_props/orders.props";
import { cn } from "@/lib/utils";

const BADGE_CLASSES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  revision: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
};

interface RowViewProps extends OrderRowProps {
  readonly isMobile?: boolean;
}

export function OrderRow({ order, onAssign, onEscalate, isMobile }: RowViewProps) {
  const formattedDueDate = order.due_date ? new Date(order.due_date).toLocaleDateString() : "No deadline";
  const statusBadge = (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border", BADGE_CLASSES[order.status] ?? "bg-slate-100 border-slate-200 text-slate-800")}>
      {order.status === "active" ? "In Progress" : order.status.toUpperCase()}
    </span>
  );

  const actions = (
    <div className="flex gap-2 justify-end md:justify-center">
      {order.status === "pending" && !order.writer_id && (
        <Button size="sm" variant="outline" onClick={() => onAssign(order.id)} className="h-7 gap-1 rounded-lg text-xs bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white border-transparent">
          <UserPlus className="size-3" /> Assign
        </Button>
      )}
      {order.status === "overdue" && (
        <Button size="sm" variant="destructive" onClick={() => onEscalate(order.id)} className="h-7 gap-1 rounded-lg text-xs bg-red-600 hover:bg-red-700">
          <AlertTriangle className="size-3" /> Escalate
        </Button>
      )}
      <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg bg-white/40 border-white/50 hover:bg-white/60">
        View
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
          <div><span className="font-semibold text-slate-700">Writer:</span> {order.writer_name ?? "— unassigned —"}</div>
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
      <TableCell className="text-slate-600 text-sm">{order.writer_name ?? <span className="text-slate-400 italic">— unassigned —</span>}</TableCell>
      <TableCell className="text-slate-600 text-sm">{formattedDueDate}</TableCell>
      <TableCell className="text-right text-slate-800 font-semibold text-sm">${order.total_price}</TableCell>
      <TableCell className="text-center">{statusBadge}</TableCell>
      <TableCell className="text-center">{actions}</TableCell>
    </TableRow>
  );
}
