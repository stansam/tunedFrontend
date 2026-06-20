import type { AdminPayment, PaymentStatus } from "../_types/payments.types";

export interface PaymentStatusBadgeProps {
  readonly status: PaymentStatus;
}

export interface RejectPaymentModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: (reason: string) => void;
  readonly isSubmitting: boolean;
}

export interface PaymentDetailsExpandedProps {
  readonly payment: AdminPayment;
  readonly onVerify: () => void;
  readonly onReject: () => void;
  readonly isActionPending: boolean;
}

export interface PaymentCardProps {
  readonly payment: AdminPayment;
  readonly isExpanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onVerify: () => void;
  readonly onReject: () => void;
  readonly isActionPending: boolean;
}

export interface PaymentsToolbarProps {
  readonly searchValue: string;
  readonly onSearchChange: (val: string) => void;
  readonly statusValue: PaymentStatus | "all";
  readonly onStatusChange: (val: PaymentStatus | "all") => void;
}

export interface PaymentsPaginationProps {
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
}
