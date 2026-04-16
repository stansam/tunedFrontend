/**
 * verify-email/page.tsx — Server Component
 *
 * Reads `email` and optional `callbackUrl` from searchParams.
 * If `email` is missing or malformed → redirect back to /auth/register.
 *
 * The page is stateless and renders instantly (no network calls here).
 * Client-side interactivity (resend / countdown) is handled in VerifyEmailCard.
 *
 * The parent register/layout.tsx is NOT used here because verify-email
 * has its own visual shell (no RegisterCard / RegistrationBenefits needed).
 * We reuse SnowParticles and TagsBar from the login module for visual
 * consistency with the overall auth flow.
 */
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SnowParticles } from "@/app/auth/login/_components/SnowParticles";
import { TagsBar } from "@/app/auth/login/_components/TagsBar";
import { VerifyEmailCard } from "./_components/VerifyEmailCard";
import type { VerifyEmailPageProps } from "./_types/verify-email.type";

/** Minimal email format check — Zod is overkill here for a Server Component guard. */
function isLooksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function VerifyEmailContent({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const email = params.email?.trim() ?? "";
  const callbackUrl = params.callbackUrl?.trim();

  // Guard: if email is absent or obviously not an email, bounce back to register
  if (!email || !isLooksLikeEmail(email)) {
    redirect("/auth/register");
  }

  return (
    <VerifyEmailCard
      email={email}
      callbackUrl={callbackUrl}
    />
  );
}

export default function VerifyEmailPage(props: VerifyEmailPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <SnowParticles />
      <TagsBar />
      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 md:py-16"
      >
        <Suspense
          fallback={
            /* Instant UI skeleton — same dimensions as the card so there's no
               layout shift when the async searchParams resolve. */
            <div
              className="flex w-full max-w-md min-h-[460px] items-center justify-center rounded-2xl bg-white shadow-xl border border-slate-100"
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-50 animate-pulse" />
                <div className="h-6 w-48 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-4 w-64 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-4 w-56 rounded-full bg-slate-100 animate-pulse" />
                <div className="mt-4 h-12 w-64 rounded-full bg-slate-100 animate-pulse" />
              </div>
            </div>
          }
        >
          <VerifyEmailContent searchParams={props.searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
