import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/services/auth.service";
import { ServiceCategoriesBar } from "./_components/ServiceCategoriesBar";
import { LoginCard } from "./_components/LoginCard";
import { SnowParticles } from "./_components/SnowParticles";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | TunedEssays",
  description: "Sign in to your TunedEssays account to access expert academic and professional writing services.",
  robots: {
    index: false,
    follow: false,
  },
};

interface LoginPageProps {
  readonly searchParams: Promise<{ redirectTo?: string }>;
}

async function AuthChecker({ searchParams }: LoginPageProps) {
  const authResult = await getServerAuthUser();
  if (authResult.ok) {
    const params = await searchParams;
    const raw = params.redirectTo ?? "";
    const safe = raw.startsWith("/") && !raw.startsWith("/auth/") ? raw : "/dashboard";
    redirect(safe as never);
  }

  const params = await searchParams;
  const redirectTo = params.redirectTo ?? "/dashboard";

  return <LoginCard callbackUrl={redirectTo} />;
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <SnowParticles />
      <ServiceCategoriesBar />
      <main id="main-content" className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 md:py-16">
        <Suspense fallback={
          <div className="flex w-full max-w-[420px] md:max-w-[880px] min-h-[560px] items-center justify-center rounded-2xl bg-white shadow-sm" aria-hidden="true">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        }>
          <AuthChecker searchParams={props.searchParams} />
        </Suspense>
      </main>
    </div>
  );
}