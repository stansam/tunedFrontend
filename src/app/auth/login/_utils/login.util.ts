export const SAFE_RELATIVE_PATH_RE = /^\/[a-zA-Z0-9/._~:@!$&'()*+,;=%-]*$/;
export const DEFAULT_AUTHENTICATED_REDIRECT = "/client";

export function sanitizeCallbackUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_AUTHENTICATED_REDIRECT;
  if (!SAFE_RELATIVE_PATH_RE.test(trimmed)) return DEFAULT_AUTHENTICATED_REDIRECT;
  if (trimmed.startsWith("/auth/")) return DEFAULT_AUTHENTICATED_REDIRECT;
  return trimmed;
}
