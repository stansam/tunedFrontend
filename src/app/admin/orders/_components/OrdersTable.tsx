"use client";

import type { OrdersTableProps } from "../_props/orders.props";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderRow } from "./OrderRow";

export function OrdersTable({ orders, onActivate, onEscalate, isActivating }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 rounded-xl border border-dashed border-slate-300 bg-white/20">
        <p className="text-sm font-semibold">No orders found matching filters</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            onActivate={onActivate}
            onEscalate={onEscalate}
            isActivating={isActivating}
            isMobile
          />
        ))}
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/50 bg-white/30 backdrop-blur-md shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-white/40">
              <TableHead className="w-[100px] text-slate-800 font-semibold">ORDER ID</TableHead>
              <TableHead className="text-slate-800 font-semibold">CLIENT</TableHead>
              <TableHead className="text-slate-800 font-semibold">SERVICE</TableHead>
              <TableHead className="text-slate-800 font-semibold">DEADLINE</TableHead>
              <TableHead className="text-slate-800 font-semibold text-right">VALUE</TableHead>
              <TableHead className="text-slate-800 font-semibold text-center">STATUS</TableHead>
              <TableHead className="text-slate-800 font-semibold text-center">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onActivate={onActivate}
                onEscalate={onEscalate}
                isActivating={isActivating}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
