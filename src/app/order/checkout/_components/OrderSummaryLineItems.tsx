import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "../_utils/format.utils";

interface OrderSummaryLineItemsProps {
  subtotal: number;
  tax: number;
  total: number;
}

export function OrderSummaryLineItems({ subtotal, tax, total }: OrderSummaryLineItemsProps) {
  return (
    <>
      <Separator />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <span className="font-bold text-foreground">Total</span>
        <span className="text-xl font-bold text-foreground">{formatCurrency(total)}</span>
      </div>
    </>
  );
}
