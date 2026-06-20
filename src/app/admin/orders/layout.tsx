import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Orders | TunedEssays",
  description: "Global orders management for administrators.",
};

export default function AdminOrdersLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
