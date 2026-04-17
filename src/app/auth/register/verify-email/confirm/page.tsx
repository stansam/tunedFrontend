import { Suspense } from "react";
import { ConfirmDisplay } from "./_components/ConfirmDisplay";
import { ConfirmSkeleton } from "./_components/ConfirmSkeleton";

export const dynamic = "force-dynamic";

export default function VerifyEmailConfirmPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#e8e6e1]">
      <main
        id="main-content"
        className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 md:py-16"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="h-1 w-full bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500" />

            <div className="flex flex-col items-center px-6 py-12 md:px-10">
              <Suspense fallback={<ConfirmSkeleton />}>
                <ConfirmDisplay />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
