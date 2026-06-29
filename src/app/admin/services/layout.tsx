import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Services | TunedEssays",
  description: "Configure and manage active service offerings, categories, and rate tiers.",
};

export default function ServicesLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
