import type { ReactNode } from "react";

export const metadata = {
  title: "Admin Testimonials | TunedEssays",
  description: "Configure and manage client feedback and testimonials approval status.",
};

export default function TestimonialsLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
