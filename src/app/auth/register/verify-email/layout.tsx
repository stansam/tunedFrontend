import type { Metadata } from "next";

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
