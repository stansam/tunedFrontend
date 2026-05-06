import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Orders | TunedEssays",
  description: "View and manage all your orders in one place.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrdersLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
