"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Folder01Icon, Wallet01Icon, UserIcon, GearsIcon,
} from "@hugeicons/core-free-icons";
import { KPICard } from "./KPICard";
import type { KPICardsProps } from "../_props/dashboard.props";

const containerClass = [
  "grid grid-cols-1 gap-4 px-4 lg:px-6",
  "*:data-[slot=card]:bg-linear-to-t",
  "*:data-[slot=card]:from-emerald-500/5",
  "*:data-[slot=card]:to-card",
  "*:data-[slot=card]:shadow-xs",
  "md:grid-cols-2",
  "lg:grid-cols-4",
].join(" ");

const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className={containerClass}>
      <KPICard
        title="Active Orders"
        value={data.active_orders}
        description="Global academic projects currently in progress"
        badgeLabel="Active"
        badgeClass="text-emerald-600 bg-emerald-50"
        icon={<HugeiconsIcon icon={Folder01Icon} strokeWidth={2} className="size-3 mr-1" />}
      />
      <KPICard
        title="Total Revenue"
        value={fmt(data.total_revenue)}
        description="Gross volume processed via Braintree"
        badgeLabel="Revenue"
        badgeClass="text-blue-600 bg-blue-50"
        icon={<HugeiconsIcon icon={Wallet01Icon} strokeWidth={2} className="size-3 mr-1" />}
      />
      <KPICard
        title="Total Clients"
        value={data.total_clients}
        description="Registered client profiles in user database"
        badgeLabel="Clients"
        badgeClass="text-amber-600 bg-amber-50"
        icon={<HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-3 mr-1" />}
      />
      <KPICard
        title="Pending Actions"
        value={data.pending_actions}
        description="Reviews, extensions, and approval actions"
        badgeLabel="Required"
        badgeClass="text-red-600 bg-red-50"
        icon={<HugeiconsIcon icon={GearsIcon} strokeWidth={2} className="size-3 mr-1" />}
      />
    </div>
  );
}
