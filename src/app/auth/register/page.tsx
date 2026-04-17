import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { TagsBar } from "@/app/auth/login/_components/TagsBar";
import { SnowParticles } from "@/app/auth/login/_components/SnowParticles";
import { sanitizeCallbackUrl } from "@/app/auth/login/_utils/login.util";
import { Suspense } from "react";
import { RegisterCard } from "./_components/RegisterCard";
import { RegistrationBenefits } from "./_components/RegistrationBenefits";

export const metadata: Metadata = {
  title: "Create Account | TunedEssays",
  description:
    "Create your free TunedEssays account and get access to expert academic writing services, plagiarism-free samples, and 24/7 support.",
  robots: { index: false, follow: false },
};

interface RegisterPageProps {
  readonly searchParams: Promise<{ callbackUrl?: string }>;
}

async function AuthChecker({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const sanitized = sanitizeCallbackUrl(params.callbackUrl ?? "");

  const authResult = await getServerAuthUser();
  if (authResult.ok) {
    redirect(sanitized as never);
  }

  return (
    <>
      <RegisterCard callbackUrl={sanitized} />
      <RegistrationBenefits />
    </>
  );
}

export default function RegisterPage(props: RegisterPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <SnowParticles />
      <TagsBar />
      <main id="main-content" className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 md:py-16">
        <Suspense fallback={
          <div className="flex w-full max-w-[420px] md:max-w-[880px] min-h-[560px] items-center justify-center rounded-2xl bg-[#fcfcfa] shadow-sm" aria-hidden="true">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        }>
          <AuthChecker searchParams={props.searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
