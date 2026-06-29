"use client";

import { useLegalModal } from "@/lib/contexts/LegalModalContext";

const FOOTER_LINKS = [
  { label: "Privacy Policy", type: "privacy" },
  { label: "Terms of Service", type: "terms" },
  { label: "Security Guarantee", type: "security" },
] as const;

export function CheckoutFooter() {
  const year = new Date().getFullYear();
  const { openModal } = useLegalModal();

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
            {FOOTER_LINKS.map(({ label, type }) => (
              <button
                key={type}
                type="button"
                onClick={() => openModal(type)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
