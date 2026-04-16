import type { Metadata } from "next";

/**
 * Metadata for the verify-email page.
 *
 * noindex/nofollow: this is a transient, user-specific page that should
 * never appear in search results and can change per session.
 */
export const metadata: Metadata = {
  title: "Verify Your Email | TunedEssays",
  description:
    "Check your inbox and click the verification link to activate your TunedEssays account.",
  robots: { index: false, follow: false },
};

export default function VerifyEmailLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <>{children}</>;
}
