import { apiGet, apiPost } from "@/api-client";
import { POLICY_VERSIONS } from "@/lib/constants/policy";

export interface PolicyStatusResponse {
  readonly needsAcceptance: boolean;
}

export interface AcceptPoliciesResponse {
  readonly success: boolean;
  readonly message?: string;
}

export async function checkPolicyStatus(): Promise<boolean> {
  const result = await apiGet<PolicyStatusResponse>("/legal/status", {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache, no-store" },
  });
  return result.ok ? result.data.needsAcceptance : false;
}

export async function acceptPolicies(terms: string, privacy: string): Promise<boolean> {
  const result = await apiPost<AcceptPoliciesResponse>("/legal/accept", { terms, privacy });
  return result.ok;
}

export function checkLocalConsent(): boolean {
  try {
    const data = JSON.parse(localStorage.getItem("tuned_consent_accepted") || "{}");
    return data.terms !== POLICY_VERSIONS.terms || data.privacy !== POLICY_VERSIONS.privacy;
  } catch {
    return true;
  }
}

export function saveLocalConsent(): void {
  try {
    localStorage.setItem(
      "tuned_consent_accepted",
      JSON.stringify({
        terms: POLICY_VERSIONS.terms,
        privacy: POLICY_VERSIONS.privacy,
        acceptedAt: new Date().toISOString(),
      })
    );
  } catch (err) {
    console.error("[legal.service] Failed to save consent in localStorage:", err);
  }
}
