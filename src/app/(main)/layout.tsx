import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TunedEssays – Your Trusted Writer & Editor",
  description:
    "AI & Plagiarism-free academic writing, proofreading, editing, and technical writing services. Get a custom quote instantly.",
  keywords: [
    "essay writing",
    "proofreading",
    "editing",
    "academic writing",
    "dissertation",
    "research paper",
  ],
  openGraph: {
    title: "TunedEssays – Your Trusted Writer & Editor",
    description: "AI & Plagiarism-free academic writing services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased`}>{children}</body>
    </html>
  );
}
