"use client";

import { Suspense } from "react";
import { ActivityFeed } from "./ActivityFeed";
import { ActivityTabSkeleton } from "./ActivityTabSkeleton";
import type { ActivityTabContentProps } from "../_props";

export function ActivityTabContent({ orderId }: ActivityTabContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<ActivityTabSkeleton />}>
        <ActivityFeed orderId={orderId} />
      </Suspense>
    </div>
  );
}
