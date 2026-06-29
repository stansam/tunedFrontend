import React from "react";

export const metadata = {
  title: "Notifications | Client Portal",
  description: "View and manage your in-app notifications.",
};

export default function ClientNotificationsLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className="w-full max-w-5xl mx-auto space-y-6">{children}</div>;
}
