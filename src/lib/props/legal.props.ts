import type { PolicyType } from "@/lib/constants/policy";

export interface LegalModalContextValue {
  readonly isOpen: boolean;
  readonly type: PolicyType | null;
  readonly openModal: (type: PolicyType) => void;
  readonly closeModal: () => void;
  readonly showConsentPopup: boolean;
  readonly acceptAllPolicies: () => Promise<void>;
  readonly dismissConsentPopup: () => void;
}

export interface LegalModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly type: PolicyType | null;
}

export interface ConsentModalProps {
  readonly isOpen: boolean;
  readonly onAccept: () => void;
  readonly onDecline: () => void;
}