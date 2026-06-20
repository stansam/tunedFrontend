import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Insights | TunedEssays Admin",
  description: "Understand who is buying and manage your client base",
};

export default function AdminUsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
