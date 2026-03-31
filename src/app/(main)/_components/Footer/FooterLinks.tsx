import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FooterLinksProps } from "../../_props/footer.props";

export function FooterLinks({ links, year }: FooterLinksProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <nav aria-label="Legal links">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          {links.map((link, index) => (
            <li key={link.href + link.label} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-slate-700 select-none" aria-hidden="true">
                  ·
                </span>
              )}
              <a
                href={link.href}
                className={cn(
                  "text-xs text-slate-600",
                  "transition-colors duration-150 hover:text-slate-400",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-emerald-500 focus-visible:ring-offset-1",
                  "focus-visible:ring-offset-[#0f1117] rounded-sm"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-xs text-slate-700">
        © {year}{" "}
        <Link
          href="/"
          className="transition-colors duration-150 hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
        >
          TunedEssays
        </Link>
        . All rights reserved.
      </p>
    </div>
  );
}

