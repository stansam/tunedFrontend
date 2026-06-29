import React from "react";

export const metadata = {
  title: "System Notifications | Admin Portal",
  description: "View and manage system administrative alerts.",
};

export default function AdminNotificationsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className="w-full max-w-6xl mx-auto space-y-6">{children}</div>;
}
