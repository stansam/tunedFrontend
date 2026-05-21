import type { OrderDetails, PaymentMethod, ActiveTab } from "../_types/checkout.types";

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
  cardholderName: string;
  onCardholderNameChange: (value: string) => void;
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
}
