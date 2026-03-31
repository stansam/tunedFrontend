import { cn } from "@/lib/utils";
import type { FooterProps } from "../../_props/footer.props";
import { FOOTER_DATA, FOOTER_TAGLINE } from "./data";
import { FooterBrand } from "./Brand";
import { ContactRow } from "./ContactRow";
import { SocialLinks } from "./SocialLinks";
import { NewsletterForm } from "./NewsletterForm";
import { FooterLinks } from "./FooterLinks";

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className={cn("relative w-full bg-[#0f1117]", className)}
    >
      <div
        className="h-px w-full bg-linear-to-r from-transparent via-emerald-500/25 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center gap-10">

          <FooterBrand tagline={FOOTER_TAGLINE} />

          <ContactRow items={FOOTER_DATA.contactItems} />

          <SocialLinks links={FOOTER_DATA.socialLinks} />

          <div
            className="w-full border-t border-slate-800/60"
            aria-hidden="true"
          />

          <NewsletterForm />

          <div
            className="w-full border-t border-slate-800/60"
            aria-hidden="true"
          />

          <FooterLinks
            links={FOOTER_DATA.legalLinks}
            year={year}
          />
        </div>
      </div>

      <div
        className="h-px w-full bg-linear-to-r from-transparent via-slate-800 to-transparent"
        aria-hidden="true"
      />
    </footer>
  );
}
