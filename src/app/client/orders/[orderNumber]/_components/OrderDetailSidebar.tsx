import { OrderInfoCard } from "./OrderInfoCard";
import { OrderTrackingStepper } from "./OrderTrackingStepper";
import type { OrderDetailSidebarProps } from "../_props";

export function OrderDetailSidebar({ order }: OrderDetailSidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <OrderInfoCard order={order} />
      <OrderTrackingStepper status={order.status} />
    </div>
  );
}
