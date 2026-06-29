import type { OrderDetails, PaymentMethod, ActiveTab } from "../_types/checkout.types";
import type { UsePesapalIframeReturn } from "../_hooks/usePesapalIframe";

export interface PaymentMethodTabsProps {
  methods: PaymentMethod[];
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  instantMethod: PaymentMethod | null;
  directMethod: PaymentMethod | null;
}

export interface InstantPaymentFormProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export interface ExtendedInstantPaymentFormProps extends InstantPaymentFormProps {
  pesapalIframe: UsePesapalIframeReturn;
}

export interface DirectTransferPanelProps {
  method: PaymentMethod | null;
  onSubmit: (proofReference: string) => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  paymentId: string | null;
}

export interface OrderSummaryCardProps {
  order: OrderDetails | null;
  isLoading: boolean;
  onCompletePayment: () => void;
  isSubmitting: boolean;
  activeTab: ActiveTab;
  hideCTA?: boolean;
}

