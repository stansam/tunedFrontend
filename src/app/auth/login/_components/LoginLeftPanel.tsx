import Image from "next/image";
import { cn } from "@/lib/utils";
import { BenefitsList } from "./BenefitsList";
import { PlayButton } from "./PlayButton";
import { MainIllustration } from "./Illustrations";

export function LoginLeftPanel() {
  return (
    <div
      className={cn(
        "relative hidden overflow-hidden md:flex md:flex-col",
        "rounded-l-2xl",
        "md:w-[45%] lg:w-[44%]",
        "min-h-[560px] z-20"
      )}
      aria-hidden="true"
    >
      {/* <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
        alt="Team collaboration and success"
        fill
        sizes="(max-width: 768px) 0vw, 50vw"
        className="object-cover"
        priority
      /> */}
      <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-emerald-900/50 to-emerald-900/10" />

      <div className="relative z-10 flex flex-col justify-end px-8 py-10 flex-1">
        <h2 className="text-2xl font-extrabold leading-tight text-white mb-6">
          Success starts here
        </h2>

        <BenefitsList />

        <div className="absolute top-8 right-6 z-20">
          <PlayButton />
        </div>
      </div>
      <MainIllustration />
    </div>
  );
}