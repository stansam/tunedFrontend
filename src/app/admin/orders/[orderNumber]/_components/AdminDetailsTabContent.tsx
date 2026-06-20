"use client";

import type { AdminDetailsTabContentProps } from "../_props";
import { AdminOrderRequirements } from "./AdminOrderRequirements";

export function AdminDetailsTabContent({ order }: AdminDetailsTabContentProps) {
  return (
    <div className="space-y-6">
      <AdminOrderRequirements order={order} />
    </div>
  );
}
