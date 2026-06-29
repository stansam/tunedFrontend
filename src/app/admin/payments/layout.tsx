import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Payments | TunedEssays",
  description: "Manage and verify financial transactions and payments.",
};

export default function PaymentsLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
