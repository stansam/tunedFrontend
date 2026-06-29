export const POLICY_VERSIONS = {
  terms: "1.0.0",
  privacy: "1.0.0",
  refund: "1.0.0",
} as const;

export type PolicyType = "terms" | "privacy" | "refund" | "security";
