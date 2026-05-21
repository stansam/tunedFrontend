export interface CheckoutRequestPayload {
  order_id: string;
  payment_method_id: string;
  client_proof_reference?: string;
}

export interface PesapalCheckoutResult {
  action: "redirect";
  redirect_url: string;
  payment_id: string;
}

export interface ManualCheckoutResult {
  action: "manual";
  status: "pending_verification" | "pending_details";
  payment_id?: string;
  details?: string;
  payment_method_name?: string;
}

export type CheckoutResult = PesapalCheckoutResult | ManualCheckoutResult;

export interface PaymentMethodsApiResponse {
  id: string;
  name: string;
  category: string;
  details: string | null;
  is_active: boolean;
}

export interface OrderApiResponse {
  id: string;
  order_number: string;
  total_price: string | number;
  subtotal: string | number;
  discount_amount: string | number;
  tax?: string | number;
  status: string;
  paid: boolean;
  service_type?: string;
  pages?: number;
  academic_level?: string;
}
