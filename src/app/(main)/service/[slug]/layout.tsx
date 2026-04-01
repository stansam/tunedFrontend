import React from "react";

/**
 * Dedicated layout for the service detail route.
 * Provides a stable wrapper for service-specific content and potential sidebars.
 */
export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#e8e6e1]">
      {children}
    </div>
  );
}
