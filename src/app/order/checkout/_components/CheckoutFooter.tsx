import { Route } from "next";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security Guarantee", href: "/security" },
] as const;

export function CheckoutFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/40 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground order-2 sm:order-1">
            © {year}{" "}
            <span className="font-medium text-foreground">TunedEssays</span>
            {". "}Secure SSL Encrypted.
          </p>

          <nav
            className="flex items-center gap-4 order-1 sm:order-2"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href as Route}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
