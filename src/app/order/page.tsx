import { Suspense } from "react";
import { OrderWizard } from "./_components/OrderWizard";
import { Step1Skeleton } from "./_components/skeletons/Step1Skeleton";

interface OrderPageProps {
  searchParams: Promise<{
    service?: string;
    level?: string;
    pages?: string;
    deadline?: string;
  }>;
}

export default async function OrderPage({ searchParams }: OrderPageProps) {
  const params = await searchParams;

  const initialParams = {
    serviceId: params.service || null,
    levelId: params.level || null,
    deadlineDate: params.deadline ? new Date(params.deadline) : null,
  };

  return (
    <main className="flex-1">
      <Suspense fallback={<Step1Skeleton />}>
        <OrderWizard initialParams={initialParams} />
      </Suspense>
    </main>
  );
}
