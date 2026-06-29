import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Blogs | TunedEssays",
  description: "Configure and manage blog posts, categories, and moderate customer comments.",
};

export default function BlogsLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
