import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard | TunedEssays",
  description: "Your personal academic project dashboard.",
};

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
