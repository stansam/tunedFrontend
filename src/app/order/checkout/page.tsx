import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CheckoutPage } from "./_components/CheckoutPage";
import { CheckoutSkeleton } from "./_components/skeletons/CheckoutSkeleton";

interface CheckoutPageProps {
  searchParams: Promise<{
    orderNumber?: string;
    OrderTrackingId?: string;
  }>;
}

export default async function CheckoutRoute({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const orderNumber = params.orderNumber?.trim();

  if (!orderNumber) {
    notFound();
  }

  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutPage orderNumber={orderNumber} pesapalTrackingId={params.OrderTrackingId} />
    </Suspense>
  );
}
