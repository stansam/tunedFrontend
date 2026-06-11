import { Suspense } from "react";
import { OrdersPageClient } from "./_components/OrdersPageClient";
import { OrdersPageSkeleton } from "./_components/OrdersPageSkeleton";

export default async function AdminOrdersPage() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPageClient />
    </Suspense>
  );
}
