import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/auth/Context";
import type { AuthUser } from "@/lib/types/auth.type";
import { getServerAuthUser } from "@/lib/services/auth.server.service";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Authentication | TunedEssays",
  description: "Secure login and authentication for TunedEssays.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authResult = await getServerAuthUser();
  const initialUser: AuthUser | null = authResult.ok ? authResult.user : null;

  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.className} antialiased`}>
         <AuthProvider initialUser={initialUser} skipInitialFetch={initialUser !== null}>
          {children}
         </AuthProvider>
      </body>
    </html>
  );
}
