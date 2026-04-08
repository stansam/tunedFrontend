import Image from "next/image";
import { cn } from "@/lib/utils";
import { RegisterLeftPanel } from "./RegisterLeftPanel";
import { RegisterForm } from "./RegisterForm";

interface RegisterCardProps {
  readonly callbackUrl: string;
}

export function RegisterCard({ callbackUrl }: RegisterCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        "rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        "flex-col max-w-[420px]",
        "md:flex-row md:max-w-[880px]",
        "bg-[#fcfcfa]", // Slightly off-white background based on image reference
        "z-20"
      )}
    >
      <RegisterLeftPanel />
      
      <div
        className={cn(
          "flex flex-col bg-[#fcfcfa] pb-[#fcfcfa]",
          "w-full px-6 py-6",
          "md:flex-1 md:px-10 md:py-8",
        )}
      >
        <div className="mb-4 text-center flex flex-col items-center">
            <div className="h-16 w-32 relative mb-2 flex items-center justify-center shrink-0">
               <Image
                 src="/Adduser.png"
                 alt="Create User"
                 fill
                 className="object-contain"
               />
            </div>
          <h1 className="text-[1.85rem] font-extrabold leading-tight text-slate-950 tracking-tight">
            Create Account
          </h1>
          <p className="mt-1 text-[13px] text-slate-500 font-medium">
            Join our community. No paper is impossible!
          </p>
        </div>

        <RegisterForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
