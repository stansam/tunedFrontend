import { Suspense } from "react";
// import { redirect } from "next/navigation";
// import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { OrdersPageClient } from "./_components/OrdersPageClient";
import { OrdersPageSkeleton } from "./_components/OrdersPageSkeleton";

export default async function OrdersPage() {
  // const authResult = await getServerAuthUser();

  // if (!authResult.ok) {
  //   redirect("/login?next=/client/orders" as never);
  // }

  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPageClient />
    </Suspense>
  );
}
