import { Lock, Fingerprint, CreditCard, Trash2, LucideIcon } from "lucide-react";

export interface SecurityBlock {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly tagline: string;
  readonly details: readonly string[];
}

export const SECURITY_BLOCKS: Record<string, SecurityBlock> = {
  "data-protection": {
    title: "Data Protection",
    icon: Lock,
    tagline: "Bank-grade protection for your files and personal details.",
    details: [
      "TLS 1.3 Encryption: All network communication to our servers is encrypted in transit using cryptographic protocols.",
      "AES-256 Storage Encryption: Uploaded documents and database records are securely encrypted at rest.",
      "Strict Access Controls: Only your explicitly assigned editor and security admins are authorized to open uploaded documents.",
    ],
  },
  authentication: {
    title: "Authentication",
    icon: Fingerprint,
    tagline: "Ensuring only you can access your essays and account dashboard.",
    details: [
      "Cryptographic Hashing: Passwords are hashed using modern, secure algorithms (Argon2 / bcrypt) to prevent unauthorized decrypting.",
      "Secure Sessions: HttpOnly, Secure, and SameSite cookie parameters protect your authentication sessions from XSS/CSRF hijacks.",
      "Failed Login Lockouts: Temporary account locks prevent brute force login attempts.",
    ],
  },
  payments: {
    title: "PCI-Compliant Payments",
    icon: CreditCard,
    tagline: "We partner with global payment processors so we never store raw card details.",
    details: [
      "Direct Processing: All credit card details are securely handled directly by PCI-DSS compliant partner gateways.",
      "Encrypted Tokens: Payment details are tokenized securely (using standard Braintree or Stripe protocols).",
      "Fraud Prevention: Advanced 3D Secure verification detects and drops suspicious billing actions.",
    ],
  },
  deletion: {
    title: "Data Deletion & Ownership",
    icon: Trash2,
    tagline: "You retain full ownership and control of your records.",
    details: [
      "User-Controlled Purging: You can request complete removal of your profile and essay order archives at any time.",
      "Automatic Expirations: Document uploads are automatically scheduled for permanent deletion from active servers after order completion plus revision limits.",
      "No External Backups: Deleted client records are scrubbed from secondary databases and log storage blocks within 30 days.",
    ],
  },
};
