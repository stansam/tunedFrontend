import type { ReactNode } from "react";

export const metadata = {
  title: "Edit Blog Post | TunedEssays",
  description: "Create or modify blog post content, update categories, and configure media attachments.",
};

export default function BlogDetailsLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
