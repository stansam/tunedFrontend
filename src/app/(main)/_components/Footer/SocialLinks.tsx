import { Facebook, Twitter, Instagram, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialLinksProps } from "../../_props/footer.props";
import type { SocialIconName } from "../../_types/footer.types";

type IconComponent = React.ComponentType<LucideProps>;

const SOCIAL_ICONS: Readonly<Record<SocialIconName, IconComponent>> = {
  facebook:  Facebook,
  twitter:   Twitter,
  instagram: Instagram,
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-3" role="list">
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon];
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            role="listitem"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              "border border-slate-700 text-slate-500",
              "transition-all duration-200",
              "hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-400",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-[#0f1117]"
            )}
          >
            <Icon size={15} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
