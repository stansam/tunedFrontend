import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Frequently Asked Questions – TunedEssays",
  description:
    "Find answers to common questions about ordering, pricing, revisions, confidentiality, and our plagiarism-free writing services at TunedEssays.",
  keywords: [
    "essay writing FAQ",
    "plagiarism-free writing",
    "academic writing service questions",
    "paper writing pricing",
    "revision policy",
    "confidential writing service",
  ],
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title:       "Frequently Asked Questions – TunedEssays",
    description: "Find answers about our professional writing, editing, and proofreading services.",
    type:        "website",
  },
};

export default function FaqsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
