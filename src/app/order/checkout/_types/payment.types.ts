export interface CheckoutRequestPayload {
  order_id: string;
  payment_method_id: string;
  client_proof_reference?: string;
}

export interface PesapalCheckoutResult {
  action: "redirect";
  redirect_url: string;
  payment_id: string;
  order_tracking_id?: string;
  payment_ref?: string;
}

export interface ManualCheckoutResult {
  action: "manual";
  status: "pending_verification" | "pending_details";
  payment_id?: string;
  details?: string;
  payment_method_name?: string;
}

export type CheckoutResult = PesapalCheckoutResult | ManualCheckoutResult;

export type PesapalCheckoutState =
  | "idle"
  | "submitting"
  | "iframe_ready"
  | "iframe_complete"
  | "done";

export interface PesapalBridgeMessage {
  type: "pesapal_payment_complete";
  order_tracking_id: string;
  order_merchant_reference: string;
  order_payment_status?: string;
}

