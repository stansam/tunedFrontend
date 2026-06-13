"use client";

import type { AdminActivityTabContentProps } from "../_props";
import { AdminActivityFeed } from "./AdminActivityFeed";

export function AdminActivityTabContent({ orderId }: AdminActivityTabContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <AdminActivityFeed orderId={orderId} />
    </div>
  );
}
