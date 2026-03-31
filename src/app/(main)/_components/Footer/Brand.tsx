import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterBrandProps } from "../../_props/footer.props";

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
        <svg
          width="28"
          height="28"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5 22C8 15 14 8 22 4C20 12 15 19 5 22Z" fill="#22c55e" />
          <path
            d="M5 22C7 18 10 14 14 11"
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xl font-bold">
          <span className="text-slate-200">Tuned</span>
          <span className="text-emerald-400">Essays</span>
        </span>
      </Link>

      <p className="max-w-xs text-center text-sm leading-relaxed text-slate-500">
        {tagline}
      </p>
    </div>
  );
}
