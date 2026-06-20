import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Order Details | TunedEssays",
  description: "View order details, delivery files, comments activity, and execute admin actions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminOrderDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
