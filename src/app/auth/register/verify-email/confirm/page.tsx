"use client";

/**
 * verify-email/confirm/page.tsx — Client Component
 *
 * Landing target for the link in the verification email:
 *   /auth/register/verify-email/confirm?uid=…&token=…
 *
 * Architecture notes:
 * - `useSearchParams()` MUST be inside a <Suspense> boundary per Next.js rules.
 *   We split into ConfirmPageInner (reads params, fires network call) and the
 *   outer page shell (provides the Suspense boundary + card chrome).
 * - `dynamic = 'force-dynamic'` prevents Next.js from attempting a static
 *   prerender at build time — this page's content depends entirely on
 *   runtime query params embedded in the email link.
 * - No auto-login on success; user is prompted to sign in manually.
 */
export const dynamic = "force-dynamic";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { confirmEmailVerification } from "../_services/verify-email.service";

// ── Types ────────────────────────────────────────────────────────────────────

type ConfirmStatus = "verifying" | "success" | "already_verified" | "error";

interface ConfirmState {
  readonly status: ConfirmStatus;
  readonly message: string | null;
}

// ── Reason → user-friendly message map ───────────────────────────────────────

const REASON_MESSAGES: Readonly<Record<string, string>> = {
  expired: "This verification link has expired. Please request a new one.",
  invalid: "This verification link is invalid or has already been used.",
  not_found: "We couldn't find your account. Please register again.",
  no_token: "No verification token found. Please request a new verification email.",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function VerifyingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 text-center" aria-busy="true">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-emerald-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <p className="text-slate-600 font-medium">Verifying your email…</p>
    </div>
  );
}

function SuccessContent({ alreadyVerified }: { readonly alreadyVerified: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-emerald-600"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">
          {alreadyVerified ? "Already verified!" : "Email verified!"}
        </h1>
        <p className="text-slate-500 text-sm max-w-xs">
          {alreadyVerified
            ? "Your email was already verified. You can sign in now."
            : "Your account is now active. Sign in to get started with TunedEssays."}
        </p>
      </div>
      <Link
        href="/auth/login"
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold px-8 py-3 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        Sign in to your account
      </Link>
    </div>
  );
}

function ErrorContent({ message }: { readonly message: string }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 text-red-500"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900">Verification failed</h1>
        <p className="text-slate-500 text-sm max-w-xs">{message}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-6 py-3 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          Back to register
        </Link>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-bold px-6 py-3 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

/**
 * ConfirmPageInner — must be a child of <Suspense>.
 *
 * Reads uid + token from URL via useSearchParams() (CSR-only hook),
 * then calls the verification API once on mount. The parent page
 * wraps this in <Suspense> to satisfy Next.js SSR requirements.
 */
function ConfirmPageInner() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") ?? "";
  const token = searchParams.get("token") ?? "";

  const [state, setState] = useState<ConfirmState>({
    status: "verifying",
    message: null,
  });

  // Guard against StrictMode double-invoke and component re-mounts
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    if (!uid || !token) {
      setState({
        status: "error",
        message: "Missing verification parameters. Please use the link from your email.",
      });
      return;
    }

    confirmEmailVerification(uid, token).then(({ verified, reason }) => {
      if (verified) {
        setState({ status: "success", message: null });
      } else if (reason === "already_verified") {
        setState({ status: "already_verified", message: null });
      } else {
        setState({
          status: "error",
          message:
            REASON_MESSAGES[reason ?? ""] ??
            "Verification failed. Please try again or request a new link.",
        });
      }
    });
  }, [uid, token]);

  if (state.status === "verifying") {
    return <VerifyingSpinner />;
  }

  if (state.status === "success" || state.status === "already_verified") {
    return <SuccessContent alreadyVerified={state.status === "already_verified"} />;
  }

  return <ErrorContent message={state.message ?? "Verification failed."} />;
}

/**
 * Suspense fallback — shown during static SSR before client hydration.
 * Matches the card dimensions to prevent layout shift.
 */
function ConfirmSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-4"
      aria-busy="true"
      aria-label="Verifying your email…"
    >
      <div className="w-20 h-20 rounded-full bg-emerald-50 animate-pulse" />
      <div className="h-5 w-40 rounded-full bg-slate-100 animate-pulse" />
      <div className="h-4 w-56 rounded-full bg-slate-100 animate-pulse" />
    </div>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────

export default function VerifyEmailConfirmPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 md:py-16"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Emerald accent bar */}
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500" />

            <div className="flex flex-col items-center px-6 py-12 md:px-10">
              {/*
               * Suspense is required here: useSearchParams() in ConfirmPageInner
               * triggers a CSR bailout without a boundary, failing the build.
               * The skeleton fallback is shown during SSR hydration.
               */}
              <Suspense fallback={<ConfirmSkeleton />}>
                <ConfirmPageInner />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
