import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuned Blog – Expert Insights on Academic & Professional Writing",
  description: "Stay ahead with the latest writing tips, study hacks, and career advice from TunedEssays. Explore articles on academic excellence, research methodology, and professional communication.",
  keywords: [
    "academic writing blog",
    "study tips for students",
    "professional writing advice",
    "research methods guide",
    "essay writing techniques",
    "TunedEssays blog",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Tuned Blog – Expert Insights on Writing & Research",
    description: "Premium articles and guides to help you master academic and professional writing.",
    type: "website",
    url: "https://tunedessays.com/blogs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Tuned Blog",
      }
    ],
  },
};

export default function BlogsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
