import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Details | TunedEssays",
  description:
    "View full details, activity, and delivery status for your order.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
