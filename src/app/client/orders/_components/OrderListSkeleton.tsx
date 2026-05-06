import { OrderCardSkeleton } from "./OrderCardSkeleton";
import { SKELETON_COUNT } from "../_fallback";

export function OrderListSkeleton() {
  return (
    <div
      className="flex flex-col gap-3"
      aria-busy="true"
      aria-label="Loading orders"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}
