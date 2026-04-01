import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Writing Samples – TunedEssays Examples",
  description: "Browse high-quality writing samples from TunedEssays across various disciplines. Explore our portfolio of essays, research papers, data reports, and business plans.",
  keywords: [
    "essay writing samples",
    "research paper examples",
    "academic writing portfolio",
    "business plan samples",
    "professional proofreading examples",
    "writing service portfolio",
  ],
  alternates: {
    canonical: "/samples",
  },
  openGraph: {
    title: "Professional Writing Samples – TunedEssays Examples",
    description: "Explore our diverse portfolio of expert writing, research, and analysis samples.",
    type: "website",
    url: "https://tunedessays.com/samples",
  },
};

export default function SamplesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
