import type { OrderDetails, PaymentMethod } from "../_types/checkout.types";

export interface CheckoutPageContainerProps {
  orderNumber: string;
}

export interface CheckoutPageClientProps {
  orderNumber: string;
  pesapalTrackingId?: string;
  initialOrder?: OrderDetails | null;
  initialMethods?: PaymentMethod[] | null;
}

