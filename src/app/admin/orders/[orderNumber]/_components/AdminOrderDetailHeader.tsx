"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConfirmActionModal } from "./ConfirmActionModal";
import type { AdminOrderDetailHeaderProps } from "../_props";

export function AdminOrderDetailHeader({
  order,
  onActivate,
  onEscalate,
  isActivating,
  isEscalating,
}: AdminOrderDetailHeaderProps) {
  const isPending = order.status === "pending";
  const isOverdue = order.status === "overdue";

  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isEscalateOpen, setIsEscalateOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/admin/dashboard" className="hover:text-emerald-700 transition">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/orders" className="hover:text-emerald-700 transition">
            Orders
          </Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">Details</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          Order #{order.order_number}
          {order.escalated && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 animate-pulse">
              Escalated
            </span>
          )}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {isPending && (
          <>
            <Button
              onClick={() => setIsActivateOpen(true)}
              disabled={isActivating}
              className="w-full sm:w-auto px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
            >
              {isActivating ? "Activating..." : "Activate Order"}
            </Button>
            <ConfirmActionModal
              isOpen={isActivateOpen}
              onClose={() => setIsActivateOpen(false)}
              onConfirm={() => {
                onActivate();
                setIsActivateOpen(false);
              }}
              title="Activate Order"
              description={`Are you sure you want to activate order #${order.order_number}? This will transition its status to Active (In Progress).`}
              confirmText="Confirm Activation"
              isPending={isActivating}
              variant="emerald"
            />
          </>
        )}
        {isOverdue && !order.escalated && (
          <>
            <Button
              onClick={() => setIsEscalateOpen(true)}
              disabled={isEscalating}
              className="w-full sm:w-auto px-4 h-9 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition"
            >
              {isEscalating ? "Escalating..." : "Escalate Order"}
            </Button>
            <ConfirmActionModal
              isOpen={isEscalateOpen}
              onClose={() => setIsEscalateOpen(false)}
              onConfirm={() => {
                onEscalate();
                setIsEscalateOpen(false);
              }}
              title="Escalate Order"
              description={`Are you sure you want to escalate order #${order.order_number}? This will flag the order for urgent attention.`}
              confirmText="Confirm Escalation"
              isPending={isEscalating}
              variant="destructive"
            />
          </>
        )}
      </div>
    </div>
  );
}
