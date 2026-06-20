export type PaymentStatus =
  | "pending"
  | "pending_verification"
  | "completed"
  | "failed"
  | "refunded";

export interface AdminPayment {
  readonly id: string;
  readonly payment_id: string;
  readonly order_id: string;
  readonly user_id: string;
  readonly amount: number;
  readonly status: PaymentStatus;
  readonly accepted_method_id: string;
  readonly currency: string;
  readonly client_proof_reference?: string | null;
  readonly pesapal_tracking_id?: string | null;
  readonly admin_notes?: string | null;
  readonly client_marked_paid_at?: string | null;
  readonly admin_verified_at?: string | null;
  readonly created_at: string;
  readonly updated_at: string;
  // Enriched relationship fields (optional, handled gracefully)
  readonly client_name?: string | null;
  readonly client_email?: string | null;
  readonly order_number?: string | null;
  readonly payment_method_name?: string | null;
  readonly payment_method_category?: string | null;
}

export interface AdminPaymentsListResponse {
  readonly payments: readonly AdminPayment[];
  readonly total: number;
  readonly page: number;
  readonly per_page: number;
}

export interface AdminPaymentFiltersState {
  readonly status: PaymentStatus | "all";
  readonly q: string;
  readonly page: number;
}
