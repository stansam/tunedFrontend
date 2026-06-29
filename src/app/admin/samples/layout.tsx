import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Samples | TunedEssays",
  description: "Configure and manage sample essays and documents visible to potential clients.",
};

export default function SamplesLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
