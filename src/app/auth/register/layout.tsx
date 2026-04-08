import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | TunedEssays",
  description: "Join our community. Create an account to get started with TunedEssays.",
  robots: { index: false, follow: false },
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
