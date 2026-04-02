import React from "react";

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
