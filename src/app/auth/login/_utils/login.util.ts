/**
 * @file login.util.ts
 * @description Shared callback-URL utilities for the auth flow.
 *
 * Security model
 * ──────────────
 * The callbackUrl parameter controls where a user is redirected after
 * successful authentication.  An attacker who controls this value can
 * perform an "Open Redirect" attack, sending the user to a malicious site.
 *
 * Defence-in-depth strategy applied here:
 *  1. Only relative paths are accepted (must start with exactly one "/").
 *  2. Protocol-relative URLs ("//evil.com") are explicitly blocked.
 *  3. Auth self-referencing loops ("/auth/…") are blocked.
 *  4. A strict character allowlist rejects any character that could form a
 *     protocol or host component (@, :, ;, ?, #, etc.).
 *  5. A maximum-length guard prevents excessively long paths.
 *
 * Characters allowed in the path after the leading "/":
 *   a-z  A-Z  0-9  /  -  _  .  ~  %  (percent-encoded sequences only)
 *
 * Any path that fails any guard falls back to DEFAULT_AUTHENTICATED_REDIRECT.
 */

// Allowlist: /  followed by any combination of safe path characters.
// A second consecutive "/" is rejected (blocks "//evil.com" and similar).
// "%" is allowed as the first character of a percent-encoded triplet; the
//  sanitizer does NOT validate the full %XX sequence — that would require
//  decoding + re-encoding, which is out of scope here.
const SAFE_RELATIVE_PATH_RE = /^\/(?:[a-zA-Z0-9\-._~%]|\/(?!\/))*$/;

export const DEFAULT_AUTHENTICATED_REDIRECT = "/client/dashboard";

export function sanitizeCallbackUrl(raw: string): string {
  const trimmed = raw.trim();

  // Guard 1 — empty input
  if (!trimmed) return DEFAULT_AUTHENTICATED_REDIRECT;

  // Guard 2 — maximum length (prevents overly long paths that could be
  //            used for denial-of-service via regex backtracking or log spam)
  if (trimmed.length > 512) return DEFAULT_AUTHENTICATED_REDIRECT;

  // Guard 3 — protocol-relative URL ("//evil.com")
  //            These look like paths but are treated as host-relative by
  //            browsers.  An extra leading "/" is blocked by the regex too,
  //            but this explicit guard makes the intent clear.
  if (trimmed.startsWith("//")) return DEFAULT_AUTHENTICATED_REDIRECT;

  // Guard 4 — self-referencing auth loop ("/auth/login", "/auth/register" …)
  if (trimmed.startsWith("/auth/")) return DEFAULT_AUTHENTICATED_REDIRECT;

  // Guard 5 — character allowlist (the primary open-redirect defence)
  if (!SAFE_RELATIVE_PATH_RE.test(trimmed)) return DEFAULT_AUTHENTICATED_REDIRECT;

  return trimmed;
}
