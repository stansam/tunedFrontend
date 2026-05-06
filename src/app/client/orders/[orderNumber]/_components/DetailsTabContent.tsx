import { OrderRequirements } from "./OrderRequirements";
import { OrderMessages } from "./OrderMessages";
import type { DetailsTabContentProps } from "../_props";

export function DetailsTabContent({ order }: DetailsTabContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <OrderRequirements order={order} />
      <OrderMessages orderId={order.id} />
    </div>
  );
}
