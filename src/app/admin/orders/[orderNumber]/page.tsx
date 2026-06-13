import { Suspense } from "react";
import { AdminOrderDetailPageClient } from "./_components/AdminOrderDetailPageClient";
import { AdminOrderDetailSkeleton } from "./_components/AdminOrderDetailSkeleton";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { orderNumber } = await params;

  return (
    <Suspense fallback={<AdminOrderDetailSkeleton />}>
      <AdminOrderDetailPageClient orderNumber={orderNumber} />
    </Suspense>
  );
}
