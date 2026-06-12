import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard | TunedEssays",
  description: "Global admin statistics and platform status.",
};

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
