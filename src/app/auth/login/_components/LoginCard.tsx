import { cn } from "@/lib/utils";
import { LoginLeftPanel } from "./LoginLeftPanel";
import { LoginForm } from "./LoginForm";
import { PadlockIcon } from "./PadlockIcon";
import { MobileLoginHero } from "./MobileLoginHero";

interface LoginCardProps {
  readonly callbackUrl: string;
}

export function LoginCard({ callbackUrl }: LoginCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        "rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        "flex-col max-w-[420px]",
        "md:flex-row md:max-w-[880px]",
        "bg-white"
      )}
    >
      <MobileLoginHero />

      <LoginLeftPanel />
      <div
        className={cn(
          "flex flex-col justify-center bg-white",
          "w-full px-7 py-8",
          "md:flex-1 md:px-10 md:py-10",
        )}
      >
        <PadlockIcon />

        <div className="mb-6 text-center">
          <h1 className="text-[1.75rem] font-extrabold leading-tight text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 font-medium">
            Sign in to your Account
          </p>
        </div>

        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}