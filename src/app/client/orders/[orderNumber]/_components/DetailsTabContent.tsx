import { OrderRequirements } from "./OrderRequirements";
import { OrderComments } from "./OrderComments";
import type { DetailsTabContentProps } from "../_props";

export function DetailsTabContent({ order }: DetailsTabContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <OrderRequirements order={order} />
      <OrderComments orderId={order.id} />
    </div>
  );
}
