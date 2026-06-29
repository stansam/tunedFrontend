export type PaymentMethodCategory =
  | "credit_card"
  | "bank_transfer"
  | "digital_wallet"
  | "crypto"
  | "other";

export interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentMethodCategory;
  details: string | null;
  is_active: boolean;
}

export interface OrderItem {
  service_type?: string;
  pages?: number;
  academic_level?: string;
}

export interface OrderDetails {
  id: string;
  order_number: string;
  total_price: number;
  subtotal: number;
  discount_amount: number;
  tax?: number;
  status: string;
  paid: boolean;
  service_type?: string;
  pages?: number;
  academic_level?: string;
}

export type CheckoutAction = "redirect" | "manual";

export type ManualStatus = "pending_verification" | "pending_details";

export interface CheckoutResponse {
  action: CheckoutAction;
  redirect_url?: string;
  payment_id?: string;
  status?: ManualStatus;
  details?: string;
  payment_method_name?: string;
}

export type ActiveTab = "instant" | "direct";

export interface CheckoutFormState {
  cardholderName: string;
  saveCard: boolean;
}

export interface ResolvedPayment {
  id: string;
  payment_id: string;
  order_id: string;
  user_id: string;
  amount: number;
  status: string;
}