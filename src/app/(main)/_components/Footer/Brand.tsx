import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterBrandProps } from "../../_props/footer.props";
import Logo from "@/components/shared/logo";

export function FooterBrand({ tagline }: FooterBrandProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-2 select-none",
          "transition-opacity duration-150 hover:opacity-80",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[#0f1117] rounded-sm"
        )}
        aria-label="TunedEssays — go to homepage"
      >
        <Logo />
      </Link>

      <p className="max-w-xs text-center text-sm leading-relaxed text-slate-500">
        {tagline}
      </p>
    </div>
  );
}
