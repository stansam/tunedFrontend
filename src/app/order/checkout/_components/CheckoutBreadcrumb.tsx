import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CheckoutBreadcrumbProps {
  orderNumber: string | undefined;
}

export function CheckoutBreadcrumb({ orderNumber }: CheckoutBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-xs text-muted-foreground">
        <li>
          <Link href="/client/orders" className="hover:text-foreground transition-colors">
            Orders
          </Link>
        </li>
        <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
        {orderNumber && (
          <>
            <li>
              <span className="font-medium">{orderNumber}</span>
            </li>
            <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
          </>
        )}
        <li aria-current="page">
          <span className="font-semibold text-foreground">Checkout</span>
        </li>
      </ol>
    </nav>
  );
}
