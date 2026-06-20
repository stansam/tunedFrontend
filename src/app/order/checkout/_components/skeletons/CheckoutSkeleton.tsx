import { Skeleton } from "@/components/ui/skeleton";
import { PaymentFormSkeleton } from "./PaymentFormSkeleton";
import { OrderSummarySkeleton } from "./OrderSummarySkeleton";

export function CheckoutSkeleton() {
  return (
    <main className="flex-1 bg-[#e8e6e1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-6 space-y-1">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-44" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Skeleton className="h-[88px] rounded-2xl" />
              <Skeleton className="h-[88px] rounded-2xl" />
            </div>

            <PaymentFormSkeleton />

            <div className="flex items-center justify-center gap-4 pt-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-1" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <OrderSummarySkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}
