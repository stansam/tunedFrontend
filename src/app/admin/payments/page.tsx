import { Suspense } from "react";
import { PaymentsPageClient } from "./_components/PaymentsPageClient";
import { PaymentsSkeleton } from "./_components/PaymentsSkeleton";

export default async function AdminPaymentsPage() {
  return (
    <Suspense fallback={<PaymentsSkeleton />}>
      <PaymentsPageClient />
    </Suspense>
  );
}
