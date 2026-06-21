import type { ReactNode } from "react";

export const metadata = {
  title: "Live Support Chats | TunedEssays",
  description: "Manage real-time communication and support requests.",
};

export default function ChatsLayout({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
