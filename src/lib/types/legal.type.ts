export type PolicyType = "terms" | "privacy" | "refund" | "security";

export interface LegalModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly type: PolicyType | null;
}

export interface ConsentModalProps {
  readonly isOpen: boolean;
  readonly onAccept: () => void;
  readonly onDecline: () => void;
  readonly isLoading?: boolean;
  readonly isAccepting?: boolean;
}

export interface LegalModalContextValue {
  readonly isOpen: boolean;
  readonly type: PolicyType | null;
  readonly openModal: (type: PolicyType) => void;
  readonly closeModal: () => void;
  readonly showConsentPopup: boolean;
  readonly acceptAllPolicies: () => Promise<void>;
  readonly dismissConsentPopup: () => void;
  readonly isLoading: boolean;
  readonly isAccepting: boolean;
}
