"use client";

import { Route } from "next";
import { useTransition, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useOrderDetail } from "../_hooks/useOrderDetail";
import { OrderDetailHeader } from "./OrderDetailHeader";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { OrderDetailTabs } from "./OrderDetailTabs";
import { DetailsTabContent } from "./DetailsTabContent";
import { ActivityTabContent } from "./ActivityTabContent";
import { DeliveryTabContent } from "./DeliveryTabContent";
import { OrderDetailSidebar } from "./OrderDetailSidebar";
import { OrderDetailSkeleton } from "./OrderDetailSkeleton";
import type { OrderTab } from "../_types";
import type { OrderDetailPageClientProps } from "../_props";

function DetailContent({ orderNumber }: { orderNumber: string }) {
  const { data: order } = useOrderDetail(orderNumber);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (!order) {
    return null;
  }

  const tabParam = searchParams.get("tab") as OrderTab | null;
  const activeTab: OrderTab = tabParam === "activity" || tabParam === "delivery" ? tabParam : "details";

  const handleTabChange = (tab: OrderTab) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("tab", tab);
    startTransition(() => {
      router.replace(`${pathname}?${p.toString()}` as Route, { scroll: false });
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <OrderDetailHeader orderNumber={order.order_number} />
      <OrderSummaryCard order={order} />
      <OrderDetailTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isPending={isPending}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <div className="min-w-0 flex-1 flex flex-col gap-4">
          {activeTab === "details" && <DetailsTabContent order={order} />}
          {activeTab === "activity" && <ActivityTabContent orderId={order.id} />}
          {activeTab === "delivery" && <DeliveryTabContent order={order} />}
        </div>

        <aside className="w-full lg:w-72 lg:shrink-0">
          <OrderDetailSidebar order={order} />
        </aside>
      </div>
    </div>
  );
}

export function OrderDetailPageClient({ orderNumber }: OrderDetailPageClientProps) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
    <DetailContent orderNumber={orderNumber} />
    </Suspense>
  );
}
