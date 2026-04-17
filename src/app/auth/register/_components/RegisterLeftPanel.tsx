import Image from "next/image";
import { cn } from "@/lib/utils";
import { BenefitsList } from "@/app/auth/login/_components/BenefitsList";

export function RegisterLeftPanel() {
  return (
    <div
      className={cn(
        "relative hidden overflow-hidden md:flex md:flex-col",
        "rounded-l-2xl",
        "md:w-[45%] lg:w-[42%]",
        "min-h-[560px] z-20"
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-emerald-800" />
      
      <div className="relative z-10 flex flex-col justify-start px-8 py-10 flex-1">
        <h2 className="text-[1.75rem] font-extrabold leading-tight text-white mb-6">
          Success starts here
        </h2>

        <BenefitsList />
      </div>

      <div
        className="w-full h-full select-none pointer-events-none absolute bottom-0 left-0 right-0 z-40"
        aria-hidden="true"
      >
        <Image
          src="/registeractor.png"
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85%] w-auto object-contain drop-shadow-2xl"
          aria-hidden="true"
          width={500}
          height={600}
        />
      </div>
    </div>
  );
}
