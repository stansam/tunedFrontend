import { Suspense } from "react";
// import { redirect } from "next/navigation";
// import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { OrderDetailPageClient } from "./_components/OrderDetailPageClient";
import { OrderDetailSkeleton } from "./_components/OrderDetailSkeleton";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;

  // const authResult = await getServerAuthUser();
  // if (!authResult.ok) {
  //   redirect(`/login?next=/client/orders/${encodeURIComponent(orderNumber)}` as never);
  // }

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailPageClient orderNumber={orderNumber} />
    </Suspense>
  );
}
