import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/services/auth.server.service";
import { TagsBar } from "./_components/TagsBar";
import { LoginCard } from "./_components/LoginCard";
import { SnowParticles } from "./_components/SnowParticles";
import { sanitizeCallbackUrl } from "./_utils/login.util";
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
  readonly searchParams: Promise<{ callbackUrl?: string }>;
}

async function AuthChecker({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const sanitized = sanitizeCallbackUrl(params.callbackUrl ?? "");

  const authResult = await getServerAuthUser();
  if (authResult.ok) {
    redirect(sanitized as never);
  }

  return <LoginCard callbackUrl={sanitized} />;
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <SnowParticles />
      <TagsBar />
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